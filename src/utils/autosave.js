// src/utils/autosave.js
// Планувальник автозбереження форми.
// Бекенд приймає обмежену кількість збережень на хвилину, тому:
//  - зберігаємо після паузи в набиранні (delay), але не пізніше maxWait від першої зміни;
//  - між початками збережень проходить щонайменше minInterval;
//  - після помилки пробуємо ще раз через retryDelay(error).
// Модуль не залежить від Vue — його легко тестувати (див. tests/autosave.test.js).

const noop = () => {};

export function createAutosave({
    save,                       // async () => void — власне збереження
    isDirty,                    // () => boolean — чи є незбережені зміни
    delay = 3000,
    maxWait = 30000,
    minInterval = 20000,
    retryDelay = () => 30000,   // (error) => мс до повтору
    onError = noop,             // (error) => void — для статусу в UI
    now = () => Date.now(),
}) {
    let timer = null;
    let firstChangeAt = null;
    let lastSaveAt = -Infinity;
    let running = null;

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };

    const planIn = (wait) => {
        clearTimer();
        timer = setTimeout(() => {
            timer = null;
            // помилку вже передано в onError і заплановано повтор
            run().catch(noop);
        }, Math.max(0, wait));
    };

    // Викликати на кожну зміну форми
    const schedule = () => {
        const t = now();
        if (firstChangeAt === null) firstChangeAt = t;

        const afterPause = Math.min(t + delay, firstChangeAt + maxWait);
        const allowedAt = lastSaveAt + minInterval;
        planIn(Math.max(afterPause, allowedAt) - t);
    };

    const run = async () => {
        // Зміни, зроблені під час збереження, зберігаємо після нього
        while (running) {
            await running.catch(noop);
        }

        if (!isDirty()) {
            firstChangeAt = null;
            return;
        }

        lastSaveAt = now();
        firstChangeAt = null;
        running = Promise.resolve().then(save);

        try {
            await running;
        } catch (error) {
            if (firstChangeAt === null) firstChangeAt = now();
            onError(error);
            planIn(retryDelay(error));
            throw error;
        } finally {
            running = null;
        }

        if (isDirty()) schedule();
    };

    return {
        schedule,
        // Зберегти зараз, без очікування паузи та інтервалу (кнопка, вихід зі сторінки).
        // Кидає помилку, якщо збереження не вдалося.
        flush() {
            clearTimer();
            return run();
        },
        cancel: clearTimer,
        isSaving: () => running !== null,
    };
}
