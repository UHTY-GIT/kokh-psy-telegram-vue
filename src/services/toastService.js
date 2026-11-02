// src/services/toastService.js
// Тостові сповіщення без сторонніх бібліотек (замість M.toast з materialize-css).
// Розмітка та сама — #toast-container > .toast, тому працюють стилі з assets/style.css.

const DISPLAY_MS = 4000;
const IN_MS = 300;
const OUT_MS = 375;

const getContainer = () => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
};

export function showToast(message) {
    const container = getContainer();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.opacity = '0';
    toast.style.transition = `opacity ${IN_MS}ms ease-out, margin-top ${OUT_MS}ms ease-out`;
    container.appendChild(toast);

    // наступний кадр, щоб спрацював transition появи
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.marginTop = '-40px';

        setTimeout(() => {
            toast.remove();
            if (!container.children.length) container.remove();
        }, OUT_MS);
    }, DISPLAY_MS);
}
