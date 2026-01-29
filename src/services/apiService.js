import axios from 'axios';

export const BASE_URL = 'https://assistant.psy-kokh.online';

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
    },

    // Функція для отримання циклу пари
    getCycleCouple(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/customers/couple_cycle`, config);
    },

    // Функція для отримання оцінки експерта
    getExpertAssessment(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/customers/expert_assessments`, config);
    },

    // Функція для отримання дайджесту психотерапевтичних думок сесії
    getDigestPsyMind(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/customers/digest_opinions`, config);
    },

    // Функція для отримання EFCT протоколу
    getEfctProtocol(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/efct/protocol`, config);
    },

    // Функція для отримання EFCT навичок (Radar Chart)
    getEfctSkills(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/efct/skills`, config);
    },

    // Функція для отримання опису кейсу
    getCaseDescription(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/case_description`, config);
    },

    // Функція для генерації документів (PDF)
    generateDocument(telegramID, data) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        // data: { document_type: 'pdf', origin_type: '...' }
        return axios.post(`${BASE_URL}/api/v1/customer/documents`, data, config);
    },

    // Отримання списку посилань
    getClientAssets(telegramID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.get(`${BASE_URL}/api/v1/customer/client_assets`, config);
    },

    // Створення нового посилання
    createClientAsset(telegramID, data) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.post(`${BASE_URL}/api/v1/customer/client_assets`, data, config);
    },

    // Видалення посилання
    deleteClientAsset(telegramID, assetID) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.delete(`${BASE_URL}/api/v1/customer/client_assets/${assetID}`, config);
    },

    // Збереження відповідей (status: draft)
    saveCaseAnswers(telegramID, data) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.post(`${BASE_URL}/api/v1/customer/answers`, data, config);
    },

    // Оновлення відповідей (status: filled)
    updateCaseAnswers(telegramID, data) {
        const config = {
            headers: {
                'XTelegramId': telegramID
            }
        };
        return axios.post(`${BASE_URL}/api/v1/customer/answers/rewrite`, data, config);
    },
}

export default apiService;