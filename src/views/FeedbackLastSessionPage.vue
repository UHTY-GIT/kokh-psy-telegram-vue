<template>
  <div>
    <div class="container-tittle">
      <p>
        Дайджест психотерапевтичних думок сесії
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <div class="expert-assessment">
        <div v-if="digests.length === 0">
          <p>
            Дайджест сесій ще не додано психологом, зачекайте 🤍
          </p>
        </div>
        <div v-else>
          <div v-for="digest in digests" :key="digest.id" class="container-view-client-info">
            <div class="date-calendar-block">
              <p>
                <img src="@/assets/icons/calendar.png" alt="date"> {{ formatDate(digest.created_at) }}
              </p>
            </div>
            <div class="content-view">
              <p>
                {{ digest.content }}
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
  name: 'FeedbackSession',
  setup() {
    //const telegramID = 6112401748;
    const telegramID = localStorage.getItem('telegram_user_id');
    const digests = ref([]);

    const fetchDigestPsyMind = async () => {
      try {
        const response = await apiService.getDigestPsyMind(telegramID);
        digests.value = response.data.data;
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

    onMounted(fetchDigestPsyMind);

    return {
      digests,
      formatDate,
    };
  }
}
</script>