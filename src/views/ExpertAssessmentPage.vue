<!-- src/views/ExpertAssessmentPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Оцінка експерта
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <!-- LOADING -->
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
        <p class="state__text">Завантажуємо оцінку...</p>
      </div>

      <!-- NO ACCESS (no origin_type) -->
      <div v-else-if="!typeClient" class="expert-assessment">
        <p> Привіт! 🤗 </p>
        <p>
          Будь ласка, запишіться на свою першу сесію, щоб отримати доступ до оцінки експерта.
        </p>
      </div>

      <!-- CONTENT -->
      <div v-else class="expert-assessment">
        <div v-if="assessments.length === 0">
          <p>
            Оцінка експерта ще не додана психологом, зачекайте 🤍
          </p>
        </div>
        <div v-else>
          <div v-for="assessment in assessments" :key="assessment.id" class="container-view-client-info">
            <div class="date-calendar-block">
              <p>
                <img src="@/assets/icons/calendar.png" alt="date"> {{ formatDate(assessment.created_at) }}
              </p>
            </div>
            <div class="content-view">
              <p>
                {{ assessment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
//import M from "materialize-css";
import { ref, onMounted } from "vue";

export default {
  name: 'ExpertAssessment',
  setup() {
    //const telegramID = 6112401748;


    const assessments = ref([]);
    const typeClient = ref('');
    const loading = ref(true);

    const fetchExpertAssessments = async () => {
      try {
        const response = await apiService.getExpertAssessment();
        assessments.value = response?.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching expert assessments:', error);
        //M.toast({ html: 'Помилка при завантаженні даних оцінки експерта' });
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("uk-UA", options);
    };

    //onMounted(fetchExpertAssessments);

    onMounted(async () => {
      const originType = localStorage.getItem('origin_type');

      // якщо origin_type нема — НЕ робимо запит
      if (originType) {
        typeClient.value = originType;
        await fetchExpertAssessments();
      }

      loading.value = false;
    });

    return {
      assessments,
      formatDate,
      typeClient,
      loading,
    };
  }
}
</script>