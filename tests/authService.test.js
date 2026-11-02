// tests/authService.test.js — логін через Telegram initData
/* eslint-env node, es2020 */
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';

// Мінімальне браузерне оточення для authService
const storage = new Map();
globalThis.localStorage = {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
};
globalThis.window = { Telegram: { WebApp: { initData: 'query_id=test&hash=test' } } };

const { default: authService } = await import('../src/services/authService.js');

const originalPost = axios.post;
let posts;

// Відповідь сервера, яку тест віддає вручну
const mockAuthServer = () => {
    posts = [];
    axios.post = (url, body) => new Promise((resolve) => {
        posts.push({ url, body, respond: (token) => resolve({ data: { data: { valid: true, token } } }) });
    });
};

const tick = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(() => {
    storage.clear();
    mockAuthServer();
});

afterEach(() => {
    axios.post = originalPost;
});

test('одночасні виклики validateAndLogin шлють один запит', async () => {
    const first = authService.validateAndLogin();
    const second = authService.validateAndLogin();
    await tick();
    assert.equal(posts.length, 1);
    assert.deepEqual(posts[0].body, { init_data: 'query_id=test&hash=test' });

    posts[0].respond('jwt-1');
    assert.equal(await first, 'jwt-1');
    assert.equal(await second, 'jwt-1');
    assert.equal(authService.getToken(), 'jwt-1');
});

test('після завершення логіну наступний виклик робить новий запит', async () => {
    const first = authService.validateAndLogin();
    await tick();
    posts[0].respond('jwt-1');
    await first;

    const second = authService.validateAndLogin();
    await tick();
    assert.equal(posts.length, 2);
    posts[1].respond('jwt-2');
    assert.equal(await second, 'jwt-2');
});

test('waitForToken чекає на логін, що триває', async () => {
    storage.clear();
    const login = authService.validateAndLogin();
    const waiting = authService.waitForToken();

    let resolved = false;
    waiting.then(() => { resolved = true; });
    await tick();
    assert.equal(resolved, false);

    posts[0].respond('jwt-fresh');
    assert.equal(await waiting, 'jwt-fresh');
    await login;
});

test('waitForToken без логіну повертає збережений токен', async () => {
    authService.saveToken('jwt-cached', 60);
    assert.equal(await authService.waitForToken(), 'jwt-cached');
    assert.equal(posts.length, 0);
});

test('прострочений токен не повертається', async () => {
    authService.saveToken('jwt-old', -1);
    assert.equal(await authService.waitForToken(), null);
    assert.equal(localStorage.getItem('authTelegramToken'), null);
});
