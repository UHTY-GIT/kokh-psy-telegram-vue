<!-- src/views/supervisor/SupervisorFeedbackDetailsPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Фідбек супервізора</p>
      <hr class="hr_title" />
    </div>

    <div class="content-main">
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
        <p class="state__text">Завантаження...</p>
      </div>

      <template v-else>
        
        <div v-if="assessments.length === 0" class="expert-assessment">
           <p>
             Feedback супервізора ще не доданий, зачекайте 🤍
           </p>
        </div>

        
        <div v-else class="expert-assessment">
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
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import apiService from "@/services/apiService";
//import M from 'materialize-css';

export default {
  name: 'SupervisorFeedbackDetailsPage',
  setup() {
    const loading = ref(true);
    const assessments = ref([]);

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("uk-UA", options);
    };

    const fetchAssessments = async () => {
       try {
         const response = await apiService.getExpertAssessment();
         assessments.value = response?.data?.data ?? [];
       } catch (error) {
         console.error('Error fetching supervisor feedback:', error);
         //M.toast({ html: 'Помилка завантаження фідбеку' });
       } finally {
         loading.value = false;
       }
    };

    onMounted(() => {
      fetchAssessments();
    });

    return { 
        loading,
        assessments,
        formatDate
    };
  }
};
</script>