<template>
  <div>
    <div class="container-tittle">
      <p>
        Оцінка експерта
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <div class="expert-assessment">
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
    const telegramID = localStorage.getItem('telegram_user_id');
    const assessments = ref([]);

    const fetchExpertAssessments = async () => {
      try {
        const response = await apiService.getExpertAssessment(telegramID);
        assessments.value = response.data.data;
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

    onMounted(fetchExpertAssessments);

    return {
      assessments,
      formatDate,
    };
  }
}
</script>