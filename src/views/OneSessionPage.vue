<!-- src/views/OneSessionPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Сесія №{{ consultation.number }}
      </p>
      <hr class="hr_title">
    </div>
    <div class="container-one-session">
      <div class="one-section-content">
        <b>
          <img src="@/assets/icons/ai-technology.png" alt="icon"> Думки сесії
        </b>
        <p>
          {{ consultation.title }}
        </p>


      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
//import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'OneSessionPage',
  props: ['sessionId'],
  setup(props) {
    const consultation = ref({});
    const telegramID = localStorage.getItem('telegram_user_id');

    const fetchConsultation = async () => {
      try {
        const response = await apiService.getOneClientConsultation(telegramID, props.sessionId);
        consultation.value = response.data.data;
      } catch (error) {
        console.error('Error fetching consultation:', error);
        M.toast({ html: 'Помилка завантаження консультації' });
      }
    };

    onMounted(fetchConsultation);

    return {
      consultation
    };
  }
};
</script>
