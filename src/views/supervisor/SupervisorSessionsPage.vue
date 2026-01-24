<!-- src/views/supervisor/SupervisorSessionsPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Сесії супервізанта</p>
      <hr class="hr_title" />
    </div>
    <div class="content-main">
      <div class="sv-sessions">
        <p class="sv-sessions__subtitle">
          Історія вашої роботи. Тут ви можете переглянути свої сесії 🤍
        </p>

        <!-- 1) LOADING -->
        <div v-if="loading" class="state state--loading">
          <div class="spinner" aria-label="Loading"></div>
          <p class="state__text">Завантажуємо сесії...</p>
        </div>

        <!-- 2) EMPTY -->
        <div v-else-if="sessions.length === 0" class="state state--empty">
          <p class="state__text">Поки що немає жодної сесії</p>
        </div>

        <!-- 3) LIST -->
        <div v-else class="sv-session-list">
          <router-link
              v-for="session in sessions"
              :key="session.id"
              class="sv-session-item"
              :to="{ name: 'SupervisorSessionDetails', params: { sessionId: session.id } }"
              :aria-label="`Відкрити сесію №${session.number}`"
          >
            <span class="sv-session-item__left">Сесія №{{ session.number }}</span>
            <span class="sv-session-item__right">{{ formatDate(session.consultation_date) }}</span>
          </router-link>
        </div>
      </div>

      <div class="error-messages" v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import apiService from "@/services/apiService";
import M from 'materialize-css';

export default {
  name: "SupervisorSessionsPage",
  setup() {
    const loading = ref(false);
    const sessions = ref([]);
    const errors = ref([]);

    const fetchSessions = async () => {
      loading.value = true;
      errors.value = [];

      try {
        const telegramID = localStorage.getItem("telegram_user_id");
        const res = await apiService.getClientConsultations(telegramID);
        sessions.value = res?.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching sessions:', error);
        M.toast({ html: 'Помилка завантаження сесій' });
        sessions.value = [];
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('uk-UA', options);
    };

    onMounted(fetchSessions);

    return {
      loading,
      sessions,
      errors,
      fetchSessions,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.sv-sessions {
  padding: 20px 0;

  &__subtitle {
    margin: 0 0 25px;
    color: #494B55;
    font: 500 18px/1.2 "Nunito", system-ui, sans-serif;
  }
}

.sv-session-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sv-session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 17px 20px;
  border-radius: 12px;
  text-decoration: none;
  font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;
  color: #ffffff;

  &__left,
  &__right {
    display: inline-block;
    white-space: nowrap;
  }

  &__left {
    flex: 1 1 auto;
  }

  &__right {
    flex: 0 0 auto;
  }

  &:nth-child(odd) {
    background: #385E6C;
  }

  &:nth-child(even) {
    background: #72A8BA;
  }
}
</style>