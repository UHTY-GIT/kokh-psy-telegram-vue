import axios from 'axios';

const AUTH_API_URL = 'https://assistant.psy-kokh.online/mini_app_auth/validate_init_data';
const TOKEN_KEY = 'authTelegramToken';
const TOKEN_EXPIRY_KEY = 'authTelegramTokenExpiry';

// Поточний запит авторизації: паралельні виклики чекають на нього, а не шлють свій
let pendingLogin = null;

const authService = {
    // Зберігає токен та час життя
    saveToken(token, expiresInSeconds = 14400) { // 4 hours default
        const expiryTime = Date.now() + expiresInSeconds * 1000;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime);
    },

    // Отримує токен, якщо він валідний
    getToken() {
        const token = localStorage.getItem(TOKEN_KEY);
        const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

        if (!token || !expiry) return null;

        if (Date.now() > parseInt(expiry, 10)) {
            this.clearToken();
            return null;
        }

        return token;
    },

    // Видаляє токен
    clearToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
    },

    // Основна функція валідації та отримання токена (один запит на всіх, хто викликав одночасно)
    validateAndLogin() {
        if (!pendingLogin) {
            pendingLogin = this.requestToken().finally(() => {
                pendingLogin = null;
            });
        }
        return pendingLogin;
    },

    // Дочекатися логіну, якщо він зараз іде, і повернути валідний токен
    async waitForToken() {
        if (pendingLogin) {
            await pendingLogin;
        }
        return this.getToken();
    },

    async requestToken() {
        // --- DATA FOR DEBUGGING ---
        // Uncomment and paste your initData inside the string to debug
        const DEBUG_INIT_DATA = null;
        //const DEBUG_INIT_DATA = ""

        let initData = null;

        if (DEBUG_INIT_DATA) {
            console.log('🐞 DEBUG MODE: Using manual initData');
            initData = DEBUG_INIT_DATA;
        } else {
            const tg = window.Telegram?.WebApp;
            if (!tg) {
                console.error('Telegram WebApp is not available.');
                return null;
            }
            initData = tg.initData;
        }

        if (!initData) {
            console.error('No initData available.');
            return null;
        }

        try {
            const response = await axios.post(AUTH_API_URL, {
                init_data: initData
            });

            // Перевірка формату успішної відповіді
            if (response.data?.data?.valid && response.data?.data?.token) {
                // Зберігаємо токен. Можна брати exp з токена, якщо декодувати, 
                // але простіше використовувати дефолт 4 години або те що прийде, 
                // поки що хардкодимо логіку "якщо прийшов токен - зберігаємо".
                // У прикладі юзера exp є в JWT, але сервер не повертає expiresIn окремим полем явно в JSON (тільки в JWT payload).
                // Для спрощення беремо 4 години як сказав юзер.
                this.saveToken(response.data.data.token, 14400);
                return response.data.data.token;
            } else {
                // Обробка специфічної помилки { "valid": false, "error": "Invalid InitData" }
                if (response.data?.valid === false) {
                    console.error('Validation failed:', response.data.error);
                }
                return null;
            }
        } catch (error) {
            console.error('Auth request failed:', error);
            return null;
        }
    },

    // Перевіряє чи ми залогінені, якщо ні - пробує залогінитись
    async ensureAuth() {
        let token = this.getToken();
        if (token) return token;

        return await this.validateAndLogin();
    }
};

export default authService;
