// tests/autosave.test.js — планувальник автозбереження форми кейсу
import { test, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createAutosave } from '../src/utils/autosave.js';

const DELAY = 3000;
const MAX_WAIT = 30000;
const MIN_INTERVAL = 20000;
const RETRY = 30000;
const RATE_LIMIT_RETRY = 60000;

// дати відпрацювати промісам після тіку таймерів
const settle = () => new Promise((resolve) => setImmediate(resolve));

const advance = async (ms) => {
    mock.timers.tick(ms);
    await settle();
};

// Імітація форми: version — кількість змін, savedVersion — що вже на сервері
function setup({ slowSave = false } = {}) {
    const state = { version: 0, savedVersion: 0, saves: 0, failWith: null, errors: [], release: null };

    const autosave = createAutosave({
        async save() {
            state.saves++;
            const version = state.version;
            if (slowSave) {
                await new Promise((resolve) => { state.release = resolve; });
            }
            if (state.failWith) {
                const error = state.failWith;
                state.failWith = null;
                throw error;
            }
            state.savedVersion = version;
        },
        isDirty: () => state.version !== state.savedVersion,
        delay: DELAY,
        maxWait: MAX_WAIT,
        minInterval: MIN_INTERVAL,
        retryDelay: (error) => (error.status === 429 ? RATE_LIMIT_RETRY : RETRY),
        onError: (error) => state.errors.push(error),
    });

    const change = () => {
        state.version++;
        autosave.schedule();
    };

    return { state, autosave, change };
}

beforeEach(() => {
    mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 1_000_000 });
});

afterEach(() => {
    mock.timers.reset();
});

test('зберігає після паузи в набиранні', async () => {
    const { state, change } = setup();

    change();
    await advance(DELAY - 1);
    assert.equal(state.saves, 0);

    await advance(1);
    assert.equal(state.saves, 1);
    assert.equal(state.version, state.savedVersion);
});

test('серія змін дає одне збереження після останньої', async () => {
    const { state, change } = setup();

    for (let i = 0; i < 5; i++) {
        change();
        await advance(1000);
    }
    assert.equal(state.saves, 0);

    await advance(DELAY - 1000);
    assert.equal(state.saves, 1);
});

test('якщо друкують без пауз — зберігає не пізніше maxWait', async () => {
    const { state, change } = setup();

    for (let elapsed = 0; elapsed < MAX_WAIT; elapsed += 1000) {
        change();
        await advance(1000);
    }

    assert.equal(state.saves, 1);
});

test('не зберігає частіше за minInterval (ліміт бекенду)', async () => {
    const { state, change } = setup();

    change();
    await advance(DELAY);
    assert.equal(state.saves, 1);

    // нова зміна одразу після збереження
    change();
    await advance(MIN_INTERVAL - 1);
    assert.equal(state.saves, 1);

    await advance(1);
    assert.equal(state.saves, 2);
});

test('за хвилину автозбереження не перевищує 3 разів', async () => {
    const { state, change } = setup();

    for (let elapsed = 0; elapsed < 60000; elapsed += 500) {
        change();
        await advance(500);
    }

    assert.ok(state.saves <= 3, `saves: ${state.saves}`);
});

test('після 429 повторює через хвилину', async () => {
    const { state, change } = setup();
    state.failWith = Object.assign(new Error('Too Many Requests'), { status: 429 });

    change();
    await advance(DELAY);
    assert.equal(state.saves, 1);
    assert.equal(state.errors.length, 1);

    await advance(RATE_LIMIT_RETRY - 1);
    assert.equal(state.saves, 1);

    await advance(1);
    assert.equal(state.saves, 2);
    assert.equal(state.version, state.savedVersion);
});

test('flush зберігає одразу, без очікування паузи та інтервалу', async () => {
    const { state, autosave, change } = setup();

    change();
    await autosave.flush();
    assert.equal(state.saves, 1);

    change();
    await autosave.flush();
    assert.equal(state.saves, 2);

    // таймер від schedule скасовано — зайвого збереження не буде
    await advance(MIN_INTERVAL + DELAY);
    assert.equal(state.saves, 2);
});

test('flush кидає помилку, якщо зберегти не вдалося', async () => {
    const { state, autosave, change } = setup();
    state.failWith = new Error('Network Error');

    change();
    await assert.rejects(autosave.flush(), /Network Error/);
    assert.notEqual(state.version, state.savedVersion);
});

test('flush без змін нічого не надсилає', async () => {
    const { state, autosave } = setup();

    await autosave.flush();
    assert.equal(state.saves, 0);
});

test('зміни під час збереження зберігаються наступним збереженням', async () => {
    const { state, autosave, change } = setup({ slowSave: true });

    change();
    await advance(DELAY);
    assert.equal(state.saves, 1);
    assert.equal(autosave.isSaving(), true);

    change(); // друкують, поки йде запит
    state.release();
    await settle();
    assert.equal(autosave.isSaving(), false);
    assert.notEqual(state.version, state.savedVersion);

    // наступне — не раніше minInterval від початку попереднього
    await advance(MIN_INTERVAL - 1);
    assert.equal(state.saves, 1);
    await advance(1);
    assert.equal(state.saves, 2);
    state.release();
    await settle();
    assert.equal(state.version, state.savedVersion);
});

test('два flush одночасно не запускають паралельних збережень', async () => {
    const { state, autosave, change } = setup({ slowSave: true });

    change();
    const first = autosave.flush();
    const second = autosave.flush();
    await settle();
    assert.equal(state.saves, 1);

    state.release();
    await Promise.all([first, second]);
    assert.equal(state.saves, 1);
});

test('cancel скасовує заплановане збереження', async () => {
    const { state, autosave, change } = setup();

    change();
    autosave.cancel();
    await advance(MAX_WAIT);
    assert.equal(state.saves, 0);
});
