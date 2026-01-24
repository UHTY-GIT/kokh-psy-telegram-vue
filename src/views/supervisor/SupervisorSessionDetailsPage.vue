<!-- src/views/supervisor/SupervisorSessionDetailsPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Деталі сесії супервізанта</p>
      <hr class="hr_title" />
    </div>

    <div class="content-main">
      <div v-if="loading" class="state state--loading">
        <div class="spinner" aria-label="Loading"></div>
        <p class="state__text">Завантаження...</p>
      </div>

      <template v-else>
        <p class="state__text">Сторінка в розробці. Тут буде детальна інформація по сесії.</p>
        <p class="state__text" v-if="sessionId">Session ID: {{ sessionId }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'SupervisorSessionDetailsPage',
  props: {
    sessionId: {
      type: [String, Number],
      default: ''
    }
  },
  setup() {
    const loading = ref(true);

    onMounted(() => {
      // TODO: fetch session details by sessionId
      loading.value = false;
    });

    return { loading };
  }
};
</script>