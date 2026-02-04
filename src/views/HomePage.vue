<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Головна
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <!-- LOADING -->
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
        <p class="state__text">Завантаження...</p>
      </div>

      <!-- DEBUG INFO -->
      <div v-if="isDebugMode" class="debug-info-box">
        <h3>Debug Init Data 🐞</h3>
        <p><strong>initData (Raw):</strong></p>
        <pre style="white-space: pre-wrap; word-break: break-all;">{{ telegramInitData }}</pre>

        <p><strong>initDataUnsafe:</strong></p>
        <pre style="white-space: pre-wrap; word-break: break-all;">{{ telegramInitDataUnsafe }}</pre>
      </div>

      <!-- CONTENT -->
      <template v-else>
        <div v-if="typeClient === 'individual'" class="single-text">
          <p>
            Привіт! 🤗
          </p>
          <p>
            Вітаємо у оновленому інтерфейсі <b>psychological digital workbook.</b>
          </p>
          <p>
            Тут ти  маєш можливість переглядати історію своїх сесій, повертатися до важливих питань саморефлексії, тримати у фокусі свій запит та ознайомитися зі своєю статистикою сесій у вигляді графіку.
          </p>
          <p>
            Крім цього тут ти зможеш отримувати терапевтичний відгук від психолога по руху терапії та своєму запиту 🤍
          </p>
          <p>
            Хай цей психологічний курс буде простором для твоїх  думок, важливих сенсів та цінностей.
          </p>
        </div>
        <div v-else-if="typeClient === 'couple_classic'" class="couple-text">
          <p>
            Привіт! 🤗
          </p>
          <p>
            Вітаємо вас у оновленому інтерфейсі <b>psychological digital workbook для пар.</b>
          </p>
          <p>
            Тут ви  маєте можливість переглядати історію своїх сесій, повертатися до важливих питань саморефлексії, тримати у фокусі свій запит  та цикл. Ознайомитися  зі своєю статистикою сесій у вигляді графіку.
          </p>
          <p>
            Крім цього тут ви зможеш отримувати терапевтичний відгук від парного психолога по руху терапії та своєму запиту 🤍
          </p>
          <p>
            Хай цей психологічний курс буде простором для ваших думок, важливих сенсів та близькості.
          </p>
        </div>
        <div v-else>
        <p>
          Привіт! 🤗
        </p>
        <p>
          Будь ласка, запишіться на свою першу консультацію.
        </p>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    const loading = ref(true);
    const typeClient = ref('');
    const userId = ref('');
    const telegramInitData = ref('');
    const telegramInitDataUnsafe = ref('');

    const isDebugMode = computed(() => store.getters.isDebugMode);

    onMounted(() => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        telegramInitData.value = tg.initData;
        telegramInitDataUnsafe.value = JSON.stringify(tg.initDataUnsafe, null, 2);
      }

      const originType = localStorage.getItem('origin_type');
      if (originType) {
        typeClient.value = originType;
      }
      userId.value = localStorage.getItem('telegram_user_id') || 'N/A';
      loading.value = false;
    });

    return {
      loading,
      typeClient,
      isDebugMode,
      userId,
      telegramInitData,
      telegramInitDataUnsafe
    };
  }
}
</script>

<style scoped lang="scss">
.debug-info-box {
  margin-top: 20px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  color: #333;
  margin-bottom: 20px;

  h3 {
    margin: 0 0 10px;
  }
}
</style>
