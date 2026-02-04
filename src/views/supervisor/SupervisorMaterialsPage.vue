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
                :disabled="!item.available || downloadingItemKey === item.key"
                @click="onItemClick(item)"
            >
              <span class="sv-materials__item-text">{{ item.title }}</span>

              <span class="sv-materials__item-icon" aria-hidden="true">
                <div v-if="downloadingItemKey === item.key" class="item-spinner"></div>
                <img
                    v-else
                    class="sv-materials__icon"
                    :src="downloadIcon"
                    alt="Завантажити"
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
import downloadIcon from '@/assets/icons/download-files-icon.svg';
import apiService, { BASE_URL } from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'SupervisorMaterialsPage',
  setup() {
    const loading = ref(true);
    const errors = ref([]);
    const downloadingItemKey = ref(null);

    const items = ref([
      {
        key: 'case_description',
        origin_type: 'case_description_type',
        title: 'Опис кейсу',
        available: true,
      },
      {
        key: 'couple_cycle',
        origin_type: 'couple_cycle_type',
        title: 'Цикл пари',
        available: true,
      },
      {
        key: 'bonus_cycle',
        origin_type: 'couple_cycle_bonus_type',
        title: 'Бонус для пари',
        available: true,
      },
    ]);

    const hasLocked = computed(() => items.value.some((i) => !i.available));

    const onItemClick = async (item) => {
      if (downloadingItemKey.value) return; // Prevent multiple clicks
      
      downloadingItemKey.value = item.key;
      //const telegramID = 7155108378;
      try {
        const payload = {
            document_type: 'pdf',
            origin_type: item.origin_type
        };
        
        const response = await apiService.generateDocument(payload);

        const relativePath = response.data.data;
        
        if (relativePath) {
            const fileUrl = `${BASE_URL}${relativePath}`; // Construct full URL
            
            // Check if running in Telegram Mini App
            if (window.Telegram?.WebApp) {
                // Use Telegram's native method to open links (works best for downloads on mobile)
                window.Telegram.WebApp.openLink(fileUrl, { try_instant_view: false });
            } else {
                // Fallback for standard web browser
                window.open(fileUrl, '_blank');
            }
        } else {
             throw new Error('File path not found in response');
        }

      } catch (error) {
        console.error('Error downloading document:', error);
        
        if (error.response && error.response.status === 429) {
             M.toast({ html: 'Ліміт запитів перевищено. Будь ласка, спробуйте пізніше.' });
        } else {
             M.toast({ html: 'Помилка завантаження файлу' });
        }
      } finally {
        downloadingItemKey.value = null;
      }
    };


    onMounted(() => {
      // TODO: fetch materials availability/status if needed
      loading.value = false;
    });

    return {
      loading,
      errors,
      items,
      hasLocked,
      onItemClick,
      downloadIcon,
      downloadingItemKey,
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
      width: 20px;
      height: 20px;
    }
  }

  &__icon {
    display: block;
    width: 20px;
    height: 20px;
  }

  &__hint {
    margin: 20px 0;
    color: #494b55d9;
    font: 600 14px / 1.25 "Nunito", system-ui, sans-serif;
  }

  .item-spinner {
    width: 100%;
    height: 70%;
    border-radius: 100%;
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-top-color: #ffffff;
    animation: spin 0.9s linear infinite;
  }
}
</style>