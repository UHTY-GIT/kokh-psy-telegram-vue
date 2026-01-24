<!-- src/views/supervisor/SupervisorMaterialsPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Мої матеріали</p>
      <hr class="hr_title" />
    </div>

    <div class="content-main">
      <div class="sv-materials">
        <p class="sv-materials__subtitle">
          Це архів вашої роботи. Тут ви можете згенерувати та завантажити PDF звіти по кейсу
        </p>

        <!-- 1) LOADING -->
        <div v-if="loading" class="state state--loading">
          <div class="spinner" aria-label="Loading"></div>
          <p class="state__text">Завантажуємо матеріали...</p>
        </div>

        <template v-else>
          <div class="sv-materials__list">
            <button
                v-for="item in items"
                :key="item.key"
                class="sv-materials__item"
                type="button"
                :disabled="!item.available"
                @click="onItemClick(item)"
            >
              <span class="sv-materials__item-text">{{ item.title }}</span>

              <span class="sv-materials__item-icon" aria-hidden="true">
              <img
                  class="sv-materials__lock"
                  :src="item.available ? lockOpenIcon : lockClosedIcon"
                  :alt="item.available ? 'Доступно' : 'Недоступно'"
              />
            </span>
            </button>
          </div>

          <!-- Optional hint when something is locked -->
          <p v-if="hasLocked" class="sv-materials__hint">
            Деякі матеріали ще не доступні. Вони відкриються після того, як супервізор додасть/підтвердить дані.
          </p>
        </template>
      </div>

      <div class="error-messages" v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import lockOpenIcon from '@/assets/icons/lock-open.svg';
import lockClosedIcon from '@/assets/icons/lock-closed.svg';

export default {
  name: 'SupervisorMaterialsPage',
  setup() {
    const loading = ref(true);
    const errors = ref([]);

    const items = ref([
      {
        key: 'case_description',
        title: 'Опис кейсу',
        available: true,
      },
      {
        key: 'couple_cycle',
        title: 'Цикл пари',
        available: false,
      },
    ]);

    const hasLocked = computed(() => items.value.some((i) => !i.available));

    const onItemClick = (item) => {
      // When locked, we do nothing (button is disabled anyway)
      // When available, later you can call API to generate/download PDF.
      // Example future behavior:
      // - apiService.downloadSupervisorPdf(item.key)
      // - or router.push(...) if it is a page
      console.log('Clicked material item:', item.key);
    };


    onMounted(() => {
      // TODO: fetch materials
      loading.value = false;
    });

    return {
      loading,
      errors,
      items,
      hasLocked,
      onItemClick,
      lockOpenIcon,
      lockClosedIcon,
    };
  }
};
</script>

<style lang="scss" scoped>
.sv-materials {
  padding: 20px 0;

  &__subtitle {
    margin: 0 0 25px;
    color: #494B55;
    font: 500 18px/1.2 "Nunito", system-ui, sans-serif;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 15px 20px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: #385E6C;
    color: #ffffff;
    font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;
    box-shadow: 0 4px 9px rgb(0 0 0 / 10%);

    //&:active {
    //  transform: translateY(1px);
    //}

    &:disabled {
      cursor: not-allowed;
      background: #385E6C;
    }

    &:nth-child(even) {
      background: #72A8BA;
    }

    &-text {
      flex: 1 1 auto;
      text-align: left;
    }

    &-icon {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
  }

  &__lock {
    display: block;
    width: 24px;
    height: 24px;
  }

  &__hint {
    margin: 20px 0;
    color: #494b55d9;
    font: 600 14px / 1.25 "Nunito", system-ui, sans-serif;
  }
}
</style>