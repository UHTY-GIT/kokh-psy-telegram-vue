// src/utils/textValidation.js
// Бекенд зберігає текст у MySQL з кодуванням utf8 (до 3 байтів на символ) і відхиляє
// 4-байтові символи UTF-8 — майже всі емодзі (😀, 🫪, 🇺🇦), математичні шрифти (𝐀) тощо.
// Так виглядає помилка з сервера: Incorrect string value '\xF0\x9F\xAB\xAA\xF0\x9F...'.
// Емодзі з базової площини (❤ ✅ ☺) займають 3 байти — їх сервер приймає.
//
// У JS-рядку 4-байтовий символ — це сурогатна пара, тож шукаємо сурогати
// (заодно ловимо «биті» одинокі сурогати, які теж не є валідним UTF-8).

const ANY_SURROGATE = /[\uD800-\uDFFF]/;

// Послідовність таких символів разом із «клеєм» емодзі (ZWJ, варіаційний селектор),
// щоб 👨‍👩‍👧 чи 👍🏽 показувати й прибирати цілком, без невидимих залишків
const UNSUPPORTED_SEQUENCE = /(?:‍)?(?:(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDFFF])(?:‍|️)*)+/g;

const JOINERS_AT_EDGES = /^(?:‍|️)+|(?:‍|️)+$/g;

// «😀🙂» → ['😀', '🙂'], але 👨‍👩‍👧 лишається одним символом. Без Intl.Segmenter (старі webview) — цілою послідовністю
const splitGraphemes = (sequence) => {
    if (typeof Intl === 'undefined' || !Intl.Segmenter) return [sequence];
    const segmenter = new Intl.Segmenter('uk', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(sequence), part => part.segment);
};

export function hasUnsupportedChars(text) {
    return typeof text === 'string' && ANY_SURROGATE.test(text);
}

// Унікальні недопустимі символи в тексті — щоб показати людині, що саме прибрати
export function findUnsupportedChars(text) {
    if (!hasUnsupportedChars(text)) return [];

    const found = text.match(UNSUPPORTED_SEQUENCE)
        .flatMap(splitGraphemes)
        .map(char => char.replace(JOINERS_AT_EDGES, ''))
        .filter(Boolean);
    return [...new Set(found)];
}

export function removeUnsupportedChars(text) {
    if (!hasUnsupportedChars(text)) return text;
    return text.replace(UNSUPPORTED_SEQUENCE, '');
}
