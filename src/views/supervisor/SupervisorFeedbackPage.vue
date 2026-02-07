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

        <!-- SPOILER SECTION -->
        <div class="sv-feedback__spoiler-section">
            <div 
                class="case-subcategory__header"
                @click="toggleEfctSkills"
            >
                <h3 class="case-subcategory__title">Навички EFCT: посилання</h3>
                <svg 
                    class="case-subcategory__arrow" 
                    :class="{ 'is-open': isEfctSkillsOpen }"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 9L12 15L18 9" stroke="#494B55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <div 
                class="case-subcategory__content-wrapper" 
                :class="{ 'is-open': isEfctSkillsOpen }"
            >
                <div class="case-subcategory__content-inner">
                    <div class="spoiler-content">
                        <b class="spoiler-content__subtitle">Джерела, звідки взяті навички EFCT (ICEEFT)</b>
                        <ul class="spoiler-content__list">
                            <li><a href="#" @click.prevent="openExternalLink('https://iceeft.com/eft-certification/')">ICEEFT — EFT Certification</a></li>
                            <li><a href="#" @click.prevent="openExternalLink('https://iceeft.com/wp-content/uploads/2025/07/EFT-Therapist-Certification-Checklist-ALL-MODALITIES-2024.pdf')">ICEEFT Therapist Certification Checklist (PDF)</a></li>
                            <li><a href="#" @click.prevent="openExternalLink('https://members.iceeft.com/')">ICEEFT Members Website</a></li>
                            <li><a href="#" @click.prevent="openExternalLink('https://drive.google.com/file/d/1ZE5udJR_rS9Ag1diB2CqZ6mrJc-q3Y_E/view?usp=drivesdk')">General Overview of Skills Required for EFT Certification</a></li>
                        </ul>

                        <b class="spoiler-content__subtitle">Оновлений мануал для супервізорів і терапевтів (EFCT)</b>
                        <ul class="spoiler-content__list">
                             <li><a href="#" @click.prevent="openExternalLink('https://drive.google.com/file/d/1FUC9HKMkxBS4UsyiyNXLRVvn05-_OEB4/view?usp=drivesdk')">EFCT Supervision Manual (Google Drive)</a></li>
                        </ul>
                    </div>
                </div>
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
    const isEfctSkillsOpen = ref(false);

    const RADAR_ORDER = [
      'Stage 1 ДЕЕСКАЛАЦІЯ',
      'Альянс',
      'Мікронавички',
      'Stage 2 РЕСТРУКТУРИЗАЦІЯ',
      'Tango skills',
      'Я-терапевта'
    ];




    const toggleEfctSkills = () => {
        isEfctSkillsOpen.value = !isEfctSkillsOpen.value;
    };

    const openExternalLink = (url) => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.openLink(url, { try_instant_view: false });
        } else {
            window.open(url, '_blank');
        }
    };

    const fetchSkills = async () => {
        loading.value = true;
        errors.value = [];
        try {
            //const telegramID = 7155108378;
            const response = await apiService.getEfctSkills();
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
      chartValues,
      isEfctSkillsOpen,
      toggleEfctSkills,
      openExternalLink
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
    margin-bottom: 50px;
  }

  &__spoiler-section {
    margin: 0 20px 80px;
  }
}

/* Spoiler Styles */
.case-subcategory {
    &__header {
        display: grid;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        gap: 10px;
        grid-template-columns: 1fr auto;
        
        &:hover .case-subcategory__title, &:hover .case-subcategory__arrow path {
            color: #E09F56;
            stroke: #E09F56;
        }
    }

    &__title {
        font: 700 18px / 1.2 "Nunito", system-ui, sans-serif;
        color: #494B55;
        margin: 0;
        transition: color 0.3s;
    }

    &__arrow {
        transition: transform 0.3s ease;
        &.is-open {
            transform: rotate(180deg);
        }
    }

    /* Accordion Transition */
    &__content-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease-out;
        overflow: hidden; 
        
        &.is-open {
            grid-template-rows: 1fr;
        }
    }

    &__content-inner {
        min-height: 0;
        padding-bottom: 1px;
    }
}

.spoiler-content {
    margin-top: 15px;
    color: #494B55;
    font: 400 15px/1.4 "Nunito", system-ui, sans-serif;

    &__subtitle {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #494B55;
    }

    &__list {
        margin: 0 0 15px;
        padding-left: 20px;
        list-style-type: disc;

        li {
            margin-bottom: 8px;
        }

        a {
            color: #494B55;
            text-decoration: underline;
            cursor: pointer;
            font-weight: 500;
            
            &:hover {
                color: #72a8ba;
            }
        }
    }
}

</style>