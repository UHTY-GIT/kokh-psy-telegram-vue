import axios from 'axios';
import authService from './authService';

export const BASE_URL = 'https://assistant.psy-kokh.online';

// Створення екземпляра axios з базовим URL
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor: Додавання токена до кожного запиту
apiClient.interceptors.request.use(
    async (config) => {
        // Пропускаємо додавання токена для запитів авторизації, щоб уникнути циклів, 
        // хоча authService використовує окремий axios виклик.
        const token = authService.getToken();
        if (token) {
            config.headers['authTelegramToken'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Обробка 401 та автоматичне оновлення токена
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Спробуємо отримати новий токен
                const newToken = await authService.validateAndLogin();
                if (newToken) {
                    // Оновлюємо заголовок і повторюємо запит
                    originalRequest.headers['authTelegramToken'] = newToken;
                    return apiClient(originalRequest);
                }
            } catch (err) {
                console.error('Session expired, login failed:', err);
                // Тут можна додати редірект або повідомлення користувачу
            }
        }
        return Promise.reject(error);
    }
);

const apiService = {
    // Функція для отримання аналітичних даних клієнтів для основної графіки
    getGraphicsClient() {
        return apiClient.get(`/api/v1/customer/analytics/main`);
    },

    // Функція для виводу всіх сесій клієнта
    getClientConsultations() {
        return apiClient.get(`/api/v1/customer/consultations`);
    },

    // Функція для виводу конкретної сесії клієнта
    getOneClientConsultation(consultationID) {
        return apiClient.get(`/api/v1/customer/consultations/${consultationID}`);
    },

    // Функція для виводу даних користувача
    getAllInformationClient() {
        return apiClient.get(`/api/v1/customer/consultations/client_profile`);
    },

    // Функція для отримання циклу пари
    getCycleCouple() {
        return apiClient.get(`/api/v1/customer/customers/couple_cycle`);
    },

    // Функція для отримання оцінки експерта
    getExpertAssessment() {
        return apiClient.get(`/api/v1/customer/customers/expert_assessments`);
    },

    // Функція для отримання дайджесту психотерапевтичних думок сесії
    getDigestPsyMind() {
        return apiClient.get(`/api/v1/customer/customers/digest_opinions`);
    },

    // Функція для отримання EFCT протоколу
    getEfctProtocol() {
        return apiClient.get(`/api/v1/customer/efct/protocol`);
    },

    // Функція для отримання EFCT навичок (Radar Chart)
    getEfctSkills() {
        return apiClient.get(`/api/v1/customer/efct/skills`);
    },

    // Функція для отримання опису кейсу
    getCaseDescription() {
        return apiClient.get(`/api/v1/customer/case_description`);
    },

    // Функція для генерації документів (PDF)
    generateDocument(data) {
        // data: { document_type: 'pdf', origin_type: '...' }
        return apiClient.post(`/api/v1/customer/documents`, data);
    },

    // Отримання списку посилань
    getClientAssets() {
        return apiClient.get(`/api/v1/customer/client_assets`);
    },

    // Створення нового посилання
    createClientAsset(data) {
        return apiClient.post(`/api/v1/customer/client_assets`, data);
    },

    // Видалення посилання
    deleteClientAsset(assetID) {
        return apiClient.delete(`/api/v1/customer/client_assets/${assetID}`);
    },

    // Збереження відповідей (status: draft)
    saveCaseAnswers(data) {
        return apiClient.post(`/api/v1/customer/answers`, data);
    },

    // Оновлення відповідей (status: filled)
    updateCaseAnswers(data) {
        return apiClient.post(`/api/v1/customer/answers/rewrite`, data);
    },
}

export default apiService;