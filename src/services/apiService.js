import axios from 'axios';

const BASE_URL = 'https://assistant.psy-kokh.online';

const apiService = {
    // Функція для отримання аналітичних даних клієнтів для основної графіки
    getGraphicsClient(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/analytics/main`, config);
    },

    // Функція для виводу всіх сесій клієнта
    getClientConsultations(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/consultations`, config);
    },

    // Функція для виводу конкретної сесії клієнта
    getOneClientConsultation(telegramID, consultationID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/consultations/${consultationID}`, config);
    },

    // Функція для виводу даних користувача
    getAllInformationClient(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/consultations/client_profile`, config);
    }
}

export default apiService;