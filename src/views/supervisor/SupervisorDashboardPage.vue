<!-- src/views/supervisor/SupervisorDashboardPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Кабінет супервізанта
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <!-- LOADING -->
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
        <p class="state__text">Завантаження...</p>
      </div>

      <!-- CONTENT -->
      <template v-else>
        <section class="sv-dash">
          <h2 class="sv-dash__subtitle">Ваш простір професійного зростання</h2>

          <!-- Status card -->
          <div class="sv-card sv-card--status">
            <h3 class="sv-card__title">Поточний статус</h3>
            <div class="sv-card__text">
              <p>
                <template v-if="lastConsultationDate">
                  Остання супервізія відбулася:
                  <span class="sv-card__value">{{ formatDate(lastConsultationDate) }}</span>
                </template>
                <template v-else>
                   Супервізійна сесія ще не проведена
                </template>
              </p>
            </div>
          </div>

          <!-- Primary action -->
          <router-link
            class="sv-cta"
            to="/supervisor/case-description"
            aria-label="Додати матеріали для супервізії"
          >
            <span class="sv-cta__text">Додати матеріали для супервізії</span>
            <span class="sv-cta__arrow" aria-hidden="true">
              <img class="sv-cta__arrow-icon" :src="arrowButt" alt="arrow right" />
            </span>
          </router-link>

          <!-- Progress card -->
          <div class="sv-card sv-card--progress">
            <h3 class="sv-card__title">EFCT Growth Index</h3>

            <div class="sv-progress" role="group" aria-label="EFCT Growth Index">
              <div class="sv-progress__track" aria-hidden="true">
                <div class="sv-progress__fill" :style="{ width: animatedGrowthIndex + '%' }"></div>
              </div>
              <div class="sv-progress__value" aria-label="Значення">{{ growthIndex }}%</div>
            </div>
            <div class="sv-card__text" v-if="growthIndex > 0">
              <p>{{ efctText }}</p>
            </div>
          </div>
        </section>



        <!-- DEBUG INFO -->
        <div v-if="isDebugMode" class="debug-info" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 8px;">
          <h3>Debug Init Data 🐞</h3>
          <p><strong>initData (Raw):</strong></p>
          <pre style="white-space: pre-wrap; word-break: break-all;">{{ telegramInitData }}</pre>

          <p><strong>initDataUnsafe:</strong></p>
          <pre style="white-space: pre-wrap; word-break: break-all;">{{ telegramInitDataUnsafe }}</pre>
        </div>

        <section class="sv-card__footer">
          <p>
            <b>© Катерина Кох, 2026. Усі права захищено.</b> <br>
            Будь-які матеріали цього сервісу, включно з текстами, структурою, формою подачі, методичною логікою та дизайном, є об’єктами авторського права.
          </p>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
import arrowButt from '@/assets/icons/arrow-rigth-butt.svg'
import apiService from '@/services/apiService';
import M from 'materialize-css';
import { useStore } from 'vuex';

export default {
  name: 'SupervisorDashboardPage',
  setup() {
    const store = useStore();
    const loading = ref(true);
    const growthIndex = ref(0);
    const animatedGrowthIndex = ref(0);
    const efctText = ref('');
    const lastConsultationDate = ref(null);
    const telegramInitData = ref('');
    const telegramInitDataUnsafe = ref('');
    let animateTimer = null;

    const isDebugMode = computed(() => store.getters.isDebugMode);

    const runProgressAnimation = () => {
      // reset to 0 so animation can replay
      animatedGrowthIndex.value = 0;

      // small delay so layout is painted before animating
      animateTimer = window.setTimeout(() => {
        animatedGrowthIndex.value = growthIndex.value;
      }, 250);
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('uk-UA', options);
    };

    const fetchData = async () => {
      loading.value = true;
      try {
        //const telegramID = 7155108378;
        const telegramID = localStorage.getItem('telegram_user_id');

        // Fetch EFCT Protocol
        const [efctResponse, consultationsResponse] = await Promise.all([
            apiService.getEfctProtocol(telegramID).catch(err => {
                console.error("Error fetching EFCT protocol:", err);
                return { data: { data: { efct_index: 0, efct_text: 'Невизначено' } } }; // Fallback
            }),
            apiService.getClientConsultations(telegramID).catch(err => {
                 console.error("Error fetching consultations:", err);
                 return { data: { data: [] } }; // Fallback
            })
        ]);

        // Process EFCT Data
        if (efctResponse && efctResponse.data) {
             const rawData = efctResponse.data;
             // Check if it's directly an array or inside .data
             const dataList = Array.isArray(rawData) ? rawData : (Array.isArray(rawData.data) ? rawData.data : []);
             
             if (dataList.length > 0) {
                 const item = dataList[0];
                 growthIndex.value = item.efct_index || 0;
                 efctText.value = item.efct_text || '';
             }
        }

        // Process Consultations
        if (consultationsResponse && consultationsResponse.data && consultationsResponse.data.data) {
            const sessions = consultationsResponse.data.data;
            if (sessions.length > 0) {
                 sessions.sort((a, b) => new Date(b.consultation_date) - new Date(a.consultation_date));
                 lastConsultationDate.value = sessions[0].consultation_date;
            } else {
                lastConsultationDate.value = null;
            }
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        M.toast({ html: 'Помилка завантаження даних' });
      } finally {
        loading.value = false;
        if (growthIndex.value > 0) {
            runProgressAnimation();
        }
      }
    };

    onMounted(() => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        telegramInitData.value = tg.initData;
        telegramInitDataUnsafe.value = JSON.stringify(tg.initDataUnsafe, null, 2);
      }
      fetchData();
    });

    onBeforeUnmount(() => {
      if (animateTimer) window.clearTimeout(animateTimer);
    });


    return {
      loading,
      growthIndex,
      animatedGrowthIndex,
      efctText,
      lastConsultationDate,
      arrowButt,
      formatDate,
      telegramInitData,
      telegramInitDataUnsafe,
      isDebugMode
    };
  }
}
</script>
