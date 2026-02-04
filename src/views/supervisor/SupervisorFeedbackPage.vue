<!-- src/views/supervisor/SupervisorFeedbackPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Фідбек супервізора</p>
      <hr class="hr_title" />
    </div>

    <div class="content-main radar-container-margin">
      <div class="sv-feedback">
        <p class="sv-feedback__subtitle">
          Переглядайте детальні коментарі та рекомендації за підсумками останньої зустрічі
        </p>

        <!-- BUTTON -->
        <router-link class="sv-feedback__btn" to="/supervisor/feedback/details">
          <span>Фідбек супервізора</span>
          <img class="sv-feedback__btn-icon" :src="arrowRightIcon" alt="" aria-hidden="true" />
        </router-link>

        <hr class="sv-feedback__divider" />

        <!-- SKILLS MAP -->
        <div class="sv-feedback__section">
          <h2 class="sv-feedback__title">Карта навичок</h2>
          <p class="sv-feedback__text">
            Візуалізація вашого росту в моделі EFT. Графік оновлюється супервізором по мірі
            опанування вами нових компетенцій
          </p>

          <!-- LOADING -->
          <div v-if="loading" class="state state--loading">
            <div class="spinner" aria-label="Loading"></div>
            <p class="state__text">Завантажуємо графік...</p>
          </div>

          <!-- CHART -->
          <div class="sv-feedback__chart">
            <RadarChartSupervisor 
                v-if="!loading && chartLabels.length > 0"
                :chartLabels="chartLabels" 
                :chartValues="chartValues" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import RadarChartSupervisor from '@/components/graphic/RadarChartSupervisor.vue';
import arrowRightIcon from '@/assets/icons/arrow-rigth-butt.svg';
import apiService from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'SupervisorFeedbackPage',
  components: {
    RadarChartSupervisor
  },
  setup() {
    const loading = ref(true);
    const errors = ref([]);
    const chartLabels = ref([]);
    const chartValues = ref([]);

    const RADAR_ORDER = [
      'Stage 1 ДЕЕСКАЛАЦІЯ',
      'Альянс',
      'Мікронавички',
      'Stage 2 РЕСТРУКТУРИЗАЦІЯ',
      'Tango skills',
      'Я-терапевта'
    ];



    const fetchSkills = async () => {
        loading.value = true;
        errors.value = [];
        try {
            //const telegramID = 7155108378;
            const telegramID = localStorage.getItem('telegram_user_id');
            const response = await apiService.getEfctSkills(telegramID);
            const data = response.data;


            const skills = Array.isArray(data) ? response.data : (response.data.data || []);

            // швидкий доступ по title
            const skillsMap = new Map(
                skills.map(skill => [skill.title, skill])
            );

            const labels = [];
            const values = [];

            RADAR_ORDER.forEach(title => {
              const skill = skillsMap.get(title);

              labels.push(title);

              if (skill && skill.max_score > 0) {
                const percent = Math.round((skill.score / skill.max_score) * 100);
                values.push(percent);
              } else {
                values.push(0);
              }
            });

            chartLabels.value = labels;
            chartValues.value = values;

        } catch (error) {
            console.error('Error fetching skills:', error);
            M.toast({ html: 'Помилка завантаження даних графіка' });
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
      fetchSkills();
    });

    return {
      loading,
      errors,
      arrowRightIcon,
      chartLabels,
      chartValues
    };
  }
};
</script>


<style lang="scss" scoped>
.content-main.radar-container-margin {
  margin: 10px 0;
}
.radar-container-margin .sv-feedback .sv-feedback__subtitle,
.radar-container-margin .sv-feedback .sv-feedback__btn,
.radar-container-margin .sv-feedback .sv-feedback__divider,
.radar-container-margin .sv-feedback .sv-feedback__section .sv-feedback__title,
.radar-container-margin .sv-feedback .sv-feedback__section .sv-feedback__text {
  margin-left: 20px;
  margin-right: 20px;
}
.radar-container-margin .sv-feedback .sv-feedback__section .sv-feedback__chart .sv-radar {
  margin: 0 10px;
}
.sv-feedback {
  padding: 20px 0;

  &__subtitle {
    margin: 0 0 25px;
    color: #494B55;
    font: 500 18px/1.2 "Nunito", system-ui, sans-serif;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    width: auto;
    padding: 17px 20px;
    border-radius: 12px;
    text-decoration: none;

    background: #385e6c;
    color: #ffffff;
    font: 700 18px / 1.2 "Nunito", system-ui, sans-serif;

    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.1);

  }

  &__btn-icon {
    width: 22px;
    height: 22px;
    flex: 0 0 auto;
  }

  &__divider {
    margin: 35px 0;
    border: none;
    height: 2px;
    background: #494B55;
  }

  &__title {
    margin: 0 0 15px;
    color: #494B55;
    font: 700 18px / 1.2 "Nunito", system-ui, sans-serif;
  }

  &__text {
    margin: 0 0 40px;
    color: #494B55;
    font: 500 15px/1.2 "Nunito", system-ui, sans-serif;
  }

  &__chart {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    margin-bottom: 80px;
  }
}
</style>