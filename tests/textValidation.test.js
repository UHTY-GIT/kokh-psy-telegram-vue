// tests/textValidation.test.js — символи, які бекенд (MySQL utf8) не приймає
/* eslint-env node, es2020 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasUnsupportedChars, findUnsupportedChars, removeUnsupportedChars } from '../src/utils/textValidation.js';

// Символ із помилки сервера: Incorrect string value '\xF0\x9F\xAB\xAA\xF0\x9F...'
const FROM_SERVER_ERROR = Buffer.from([0xF0, 0x9F, 0xAB, 0xAA]).toString('utf8');

test('символ із помилки сервера (🫪) не приймається', () => {
    assert.equal(FROM_SERVER_ERROR, '🫪');
    const text = `Клієнтка сказала ${FROM_SERVER_ERROR}${FROM_SERVER_ERROR} і замовкла`;
    assert.equal(hasUnsupportedChars(text), true);
    assert.deepEqual(findUnsupportedChars(text), ['🫪']);
});

test('звичайні емодзі не приймаються', () => {
    for (const emoji of ['😀', '🙂', '🤍', '🔥', '👍', '🥲', '🫶']) {
        assert.equal(hasUnsupportedChars(`текст ${emoji}`), true, emoji);
    }
});

test('український текст і типографіка приймаються', () => {
    const text = 'Запит: «стосунки з мамою» — 3-я сесія, №12. Пʼятниця, 15:00; ціна 7300 ₴ / 140 € (≈162 $). Ґ ґ Є є Ї ї І і’';
    assert.equal(hasUnsupportedChars(text), false);
    assert.deepEqual(findUnsupportedChars(text), []);
    assert.equal(removeUnsupportedChars(text), text);
});

test('3-байтові символи (❤ ✅ ☺ ★) сервер зберігає — їх не чіпаємо', () => {
    const text = 'Дякую ❤️ ✅ ☺ ★ ✨ ☀';
    assert.equal(hasUnsupportedChars(text), false);
});

test('відхиляється рівно те, що займає 4 байти в UTF-8', () => {
    const samples = [0x41, 0x456, 0x2764, 0x20AC, 0xFFFD, 0xFFFF, 0x10000, 0x1D400, 0x1F600, 0x1FAEA, 0x20000, 0x10FFFF];
    for (const codePoint of samples) {
        const char = String.fromCodePoint(codePoint);
        const fourBytes = Buffer.byteLength(char, 'utf8') === 4;
        assert.equal(hasUnsupportedChars(char), fourBytes, `U+${codePoint.toString(16).toUpperCase()}`);
    }
});

test('складені емодзі показуються цілком', () => {
    const text = 'Сім’я 👨‍👩‍👧, лайк 👍🏽, прапор 🇺🇦';
    assert.deepEqual(findUnsupportedChars(text), ['👨‍👩‍👧', '👍🏽', '🇺🇦']);
});

test('повтори показуються один раз, сусідні — окремо', () => {
    assert.deepEqual(findUnsupportedChars('😀 текст 😀 ще 🙂 😀'), ['😀', '🙂']);
    assert.deepEqual(findUnsupportedChars('😀🙂😀'), ['😀', '🙂']);
});

test('биті (одинокі) сурогати теж не приймаються', () => {
    const broken = 'обрізаний символ \uD83D';
    assert.equal(hasUnsupportedChars(broken), true);
    assert.equal(removeUnsupportedChars(broken), 'обрізаний символ ');
});

test('прибирання лишає текст без невидимих залишків', () => {
    assert.equal(removeUnsupportedChars('Привіт 😀 світ'), 'Привіт  світ');
    assert.equal(removeUnsupportedChars('Сім’я 👨‍👩‍👧!'), 'Сім’я !');
    assert.equal(removeUnsupportedChars('Серце ❤️‍🔥 палає'), 'Серце ❤️ палає');
    assert.equal(removeUnsupportedChars(`${FROM_SERVER_ERROR}текст${FROM_SERVER_ERROR}`), 'текст');

    const cleaned = removeUnsupportedChars('👍🏽 ок 🏳️‍🌈');
    assert.equal(hasUnsupportedChars(cleaned), false);
    assert.equal(/‍|️/.test(cleaned), false);
});

test('порожні та нерядкові значення не ламають перевірку', () => {
    assert.equal(hasUnsupportedChars(''), false);
    assert.equal(hasUnsupportedChars(null), false);
    assert.equal(hasUnsupportedChars(undefined), false);
    assert.deepEqual(findUnsupportedChars(null), []);
    assert.equal(removeUnsupportedChars(''), '');
});
