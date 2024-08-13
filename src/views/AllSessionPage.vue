<!-- src/views/AllSessionPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Всі сесії
      </p>
      <hr class="hr_title">
    </div>
    <div class="container-all-session">
      <p class="under-title-text">
        Тут ви можете переглянути свої сесії, та інформацію про них 🤍
      </p>
      <div v-for="session in sessions" :key="session.id" class="block-session" @click="goToSession(session.id)">
        <p>Сесія №{{ session.number }}</p>
        <p>{{ formatDate(session.consultation_date) }}</p>
      </div>
    </div>
  </div>
  <div class="error-messages" v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'AllSessionClient',
  setup() {
    const sessions = ref([]);
    const router = useRouter();
    const userId = ref('');
    const errors = ref([]);



    const fetchSessions = async () => {
      try {
        const telegramID = localStorage.getItem('telegram_user_id');
        //const telegramID = 6112401748;
        //const telegramID = 200208719;
        // errors.value.push('telegramID1 '+ telegramID);

        const response = await apiService.getClientConsultations(telegramID);
        sessions.value = response.data.data;
      } catch (error) {
        console.error('Error fetching sessions:', error);
        M.toast({ html: 'Помилка завантаження сесій' });
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('uk-UA', options);
    };

    const goToSession = (sessionId) => {
      router.push({ name: 'oneSessionClient', params: { sessionId } });
    };

    onMounted(fetchSessions);

    return {
      sessions,
      formatDate,
      goToSession,
      userId,
      errors
    };
  }
};
</script>
