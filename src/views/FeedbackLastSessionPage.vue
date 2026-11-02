<template>
  <div>
    <div class="container-tittle">
      <p>
        Дайджест психотерапевтичних думок сесії
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <!-- LOADING -->
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
      </div>

      <!-- NO ACCESS -->
      <div v-else-if="!typeClient" class="expert-assessment">
        <p> Привіт! 🤗 </p>
        <p>
          Будь ласка, запишіться на свою першу сесію, щоб отримати доступ до дайджесту.
        </p>
      </div>

      <div v-else class="expert-assessment">
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
//import { showToast } from '@/services/toastService';
import { ref, onMounted } from "vue";

export default {
  name: 'FeedbackSession',
  setup() {
    //const telegramID = 6112401748;
    //const originType = 'couple_classic';

    const digests = ref([]);
    const typeClient = ref('');
    const loading = ref(true);

    const fetchDigestPsyMind = async () => {
      try {
        const response = await apiService.getDigestPsyMind();
        digests.value = response.data.data;
      } catch (error) {
        console.error('Error fetching expert assessments:', error);
        //showToast('Помилка при завантаженні даних оцінки експерта');
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("uk-UA", options);
    };

    // onMounted(fetchDigestPsyMind);
    onMounted(async () => {
      const originType = localStorage.getItem('origin_type');

      // якщо origin_type нема — НЕ робимо запит
      if (originType) {
        typeClient.value = originType;
        await fetchDigestPsyMind();
      }

      loading.value = false;
    });


    return {
      digests,
      formatDate,
      typeClient,
      loading,
    };
  }
}
</script>