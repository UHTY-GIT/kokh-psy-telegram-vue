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
import queryTherapyIcon from '@/assets/icons/lotus.png';

export default {
  name: 'OneSessionPage',
  setup() {
    const route = useRoute();
    const consultation = ref({});
    const typeClient = ref('');

    const fetchConsultation = async () => {
      try {

        // const originType = 'couple_classic';
        // const telegramID = 6112401748;

        const telegramID = localStorage.getItem('telegram_user_id');
        const consultationID = route.params.sessionId;
        const response = await apiService.getOneClientConsultation(telegramID, consultationID);
        consultation.value = response.data.data;

        // Retrieve the client type from localStorage
        const originType = localStorage.getItem('origin_type');
        typeClient.value = originType;
      } catch (error) {
        console.error('Error fetching consultation:', error);
        M.toast({ html: 'Помилка завантаження консультації' });
      }
    };

    const filteredConsultData = computed(() => {
      return consultation.value.main_consult_data?.filter(item => item.text_answer) || [];
    });

    const getTitleForField = (fieldName) => {
      if (fieldName === 'Основні думки сесії') {
        return typeClient.value === 'individual' ? 'Думки сесії' : 'Діалоги близькості';
      }
      return fieldName;
    };

    const getIconForField = (fieldName) => {
      const icons = {
        'Основні думки сесії': typeClient.value === 'individual' ? aiTechnologyIcon : heartCoupleIcon,
        'Запитання до самоаналізу': aboutIcon,
        'Висновки консультації': receiptIcon,
        'Домашнє завдання': documentSessionIcon,
        'Матеріали для саморозвитку': hyperlinkIcon,
        'Запит на терапію': queryTherapyIcon,
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