import axios from 'axios';

const BASE_URL = 'http://assistant.psy-kokh.online:3000';

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
    }
}

export default apiService;