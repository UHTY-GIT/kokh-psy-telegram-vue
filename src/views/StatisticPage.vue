<!-- src/views/StatisticPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Статистика
      </p>
      <hr class="hr_title">
    </div>
    <div class="container-statistic">
      <LineChartComponent />
    </div>
    <div class="container-text-statistic">
      <div v-if="typeClient === 'individual'">
        <div class="text-statistic">
          <ul class="uniq-text-single-statistic">
            <li>
              1-2 - розмова про зміст, розповідання історій, розмови про інших
            </li>
            <li>
              3 - розмова про себе когнітивна, про поведінку, реактивні емоції
            </li>
            <li>
              4 - приєднання до внутрішнього світу (відчуття того що відбувається всередині, описання внутрішніх процесів)
            </li>
            <li>
              5 - дослідження і рефлексування над емоцією, яка зараз присутня, надання тому що відбувається зараз значення
            </li>
            <li>
              6 - підвищена саморефлексія та допитливість. Привласнення відчуженої частини себе. Поява «відчутного зрушення». Відчуття «присутності»
            </li>
            <li>
              7 - нове значення; підвищене усвідомлення раніше неявних почуттів; доступність нових поглядів на вирішення проблем. Розширений, свіжий спосіб пізнання, яскравий, «живий»
            </li>
          </ul>
        </div>
        <div class="text-statistic">
          <p>
            Шкала Klein, Mathieu & Gendlin
          </p>
          <p>
            Памʼятай, твої емоції - несуть важливу інформацію про тебе. Продовжуй відчувати себе!
          </p>
        </div>
      </div>
      <div v-else-if="typeClient === 'couple_сlassic'">
        <div class="text-statistic">
          <ul>
            <li>
              Створення альянсу та розмежування конфліктних питань в основній боротьбі
            </li>
            <li>
              Визначення циклу негативної взаємодії
            </li>
            <li>
              Доступ до невизнаних (первинних  емоцій), що насправді лежать в основні взаємодії пари
            </li>
            <li>
              Переосмислення проблеми з точки зору глибинних емоцій та потреб прихильності
            </li>
            <li>
              Сприяння ідентифікації з відкинутими потребами та аспектами себе: інтегрування їх до взаємодії у стосунках
            </li>
            <li>
              Сприяння прийняттю досвіду партнера та створення нової моделі взаємодії
            </li>
            <li>
              Сприяння вираженню партнерами потреб і бажань: створення емоційного залучення
            </li>
            <li>
              Сприяння появі нових рішень для старих моделей відносин
            </li>
            <li>
              Консолідація нових позицій/циклів поведінки прихильності (здорової привʼязаності)
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>
          Привіт! 🤗
        </p>
        <p>
          Будь ласка, запишіться на свою першу консультацію, щоб переглянути актуальну статистику.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LineChartComponent from '@/components/graphic/LineChart.vue';
import { ref, onMounted } from "vue";

export default {
  name: 'StatisticPage',
  components: {
    LineChartComponent
  },
  setup() {
    const typeClient = ref('');

    onMounted(() => {
      //const originType = 'couple_сlassic';
      //const telegramID = 6112401748;
      const originType = localStorage.getItem('origin_type');
      if (originType) {
        typeClient.value = originType;
      }
    });

    return {
      typeClient
    };
  }
};
</script>

