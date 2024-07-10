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
    }
}

export default apiService;