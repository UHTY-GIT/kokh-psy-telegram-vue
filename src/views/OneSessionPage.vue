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
      <div v-for="item in filteredConsultData" :key="item.field_name" class="one-section-content">
        <b>
          <img :src="getIconForField(item.field_name)" alt="icon">
          {{ getTitleForField(item.field_name) }}
        </b>
        <p>
          {{ item.text_answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';
import M from 'materialize-css';

import aiTechnologyIcon from '@/assets/icons/ai-technology.png';
import heartCoupleIcon from '@/assets/icons/heart-couple.png';
import aboutIcon from '@/assets/icons/about.png';
import receiptIcon from '@/assets/icons/receipt.png';
import documentSessionIcon from '@/assets/icons/document-session.png';
import hyperlinkIcon from '@/assets/icons/hyperlink.png';

export default {
  name: 'OneSessionPage',
  setup() {
    const route = useRoute();
    const consultation = ref({});
    const typeClient = ref('single');

    const fetchConsultation = async () => {
      try {
        const telegramID = localStorage.getItem('telegram_user_id');
        const consultationID = route.params.sessionId;
        const response = await apiService.getOneClientConsultation(telegramID, consultationID);
        consultation.value = response.data.data;

        // Determine the client type (single/couple)
        typeClient.value = consultation.value.origin_type === 'couple' ? 'couple' : 'single';
      } catch (error) {
        console.error('Error fetching consultation:', error);
        M.toast({ html: 'Помилка завантаження консультації' });
      }
    };

    const filteredConsultData = computed(() => {
      return consultation.value.main_consult_data_for_client?.filter(item => item.text_answer) || [];
    });

    const getTitleForField = (fieldName) => {
      if (fieldName === 'Основні думки сесії') {
        return typeClient.value === 'single' ? 'Думки сесії' : 'Діалоги близькості';
      }
      return fieldName;
    };

    const getIconForField = (fieldName) => {
      const icons = {
        'Основні думки сесії': typeClient.value === 'single' ? aiTechnologyIcon : heartCoupleIcon,
        'Запитання до самоаналізу': aboutIcon,
        'Висновки консультації': receiptIcon,
        'Домашнє завдання': documentSessionIcon,
        'Матеріали для саморозвитку': hyperlinkIcon
      };
      return icons[fieldName];
    };

    onMounted(fetchConsultation);

    return {
      consultation,
      typeClient,
      filteredConsultData,
      getTitleForField,
      getIconForField
    };
  }
};
</script>

