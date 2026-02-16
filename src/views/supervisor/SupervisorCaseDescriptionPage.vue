<!-- src/views/supervisor/SupervisorCaseDescriptionPage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>Опис кейсу</p>
      <hr class="hr_title" />
    </div>

    <div class="content-main" style="overflow-x: hidden;">
      <div class="sv-case">
        <div v-if="loading" class="state state--loading">
          <div class="spinner" aria-label="Loading"></div>
          <p class="state__text">Завантаження...</p>
        </div>

        <template v-else>
          <p class="sv-case__intro">
            Це «живий» документ вашого кейсу. Описуйте ситуацію відверто —
            ви можете редагувати цей текст після кожної сесії з клієнтами,
            історія змін збережеться.
          </p>

          <div class="sv-case__header-row" v-if="lastUpdated">
            <div class="sv-case__version">
                Останнє оновлення —
            </div>

            <div v-if="caseStatus === 'filled'" class="case-actions">
                <span class="sv-case__version-badge">{{ lastUpdated }}</span>
                <button class="case-clear-btn" @click="clearForm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9995 13L10.9995 6.00004M20.9995 21H7.99955M10.9368 20.0628L19.6054 11.3941C20.7935 10.2061 21.3875 9.61207 21.6101 8.92709C21.8058 8.32456 21.8058 7.67551 21.6101 7.07298C21.3875 6.388 20.7935 5.79397 19.6054 4.60592L19.3937 4.39415C18.2056 3.2061 17.6116 2.61207 16.9266 2.38951C16.3241 2.19373 15.675 2.19373 15.0725 2.38951C14.3875 2.61207 13.7935 3.2061 12.6054 4.39415L4.39366 12.6059C3.20561 13.794 2.61158 14.388 2.38902 15.073C2.19324 15.6755 2.19324 16.3246 2.38902 16.9271C2.61158 17.6121 3.20561 18.2061 4.39366 19.3941L5.06229 20.0628C5.40819 20.4087 5.58114 20.5816 5.78298 20.7053C5.96192 20.815 6.15701 20.8958 6.36108 20.9448C6.59126 21 6.83585 21 7.32503 21H8.67406C9.16324 21 9.40784 21 9.63801 20.9448C9.84208 20.8958 10.0372 20.815 10.2161 20.7053C10.418 20.5816 10.5909 20.4087 10.9368 20.0628Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
            </div>
          </div>

          <div v-for="(mainBlock, mIdx) in blocks" :key="mIdx" class="case-category">
             <h2 class="case-category__title">{{ mainBlock.mainTitle }}</h2>
             
             <div v-for="(subBlock, sIdx) in mainBlock.subcategories" :key="sIdx" class="case-subcategory">
                
                <!-- Spoiler Header -->
                <div 
                    v-if="subBlock.subTitle" 
                    class="case-subcategory__header"
                    @click="toggleSubcategory(subBlock)"
                >
                    <h3 class="case-subcategory__title">{{ subBlock.subTitle }}</h3>
                    <svg 
                        class="case-subcategory__arrow" 
                        :class="{ 'is-open': subBlock.isOpen }"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 9L12 15L18 9" stroke="#494B55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <!-- Content with Grid Transition -->
                <div 
                    class="case-subcategory__content-wrapper" 
                    :class="{ 
                        'is-open': subBlock.isOpen || !subBlock.subTitle,
                        'overflow-visible': subBlock.isFullyOpen 
                    }"
                >
                    <div class="case-subcategory__content-inner">
                        <div
                            v-for="block in subBlock.items"
                            :key="block.id"
                            class="case-block"
                        >
                            <div class="case-block__header">
                                <h4 class="case-block__title">{{ block.title }}</h4>
                                <div v-if="block.helpText" class="case-block__help">
                                    <!-- Helper Icon -->
                                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7.62207 7.56135C7.7644 7.12277 8.02513 6.73247 8.37565 6.4329C8.72618 6.13334 9.15316 5.93648 9.60856 5.86423C10.064 5.79198 10.5302 5.847 10.9562 6.02336C11.3823 6.19971 11.7512 6.49062 12.0223 6.86361C12.2934 7.23659 12.4557 7.67713 12.492 8.1368C12.5282 8.59647 12.4365 9.05732 12.2272 9.46818C12.0179 9.87904 11.6995 10.2237 11.3063 10.4647C10.9132 10.7056 10.4611 10.8331 10 10.8331V11.6669M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5ZM10.0415 14.1667V14.25L9.9585 14.2502V14.1667H10.0415Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                                    <!-- Tooltip -->
                                    <div class="case-block__tooltip">
                                        {{ block.helpText }}
                                    </div>
                                </div>
                            </div>

                            <!-- TYPE: TEXT (Input) -->
                            <input 
                                v-if="block.type === 'text'"
                                v-model="block.value"
                                type="text"
                                class="case-block__input"
                                :placeholder="'Введіть ' + block.title"
                            />

                            <!-- TYPE: STRING (Textarea) -->
                            <textarea
                                v-if="block.type === 'string'"
                                v-model="block.value"
                                class="case-block__textarea"
                                :placeholder="'Введіть ' + block.title"
                            />

                            <!-- TYPE: SELECT_V2 (Custom Dropdown) -->
                            <div v-if="block.type === 'select_v2'" class="case-block__select-wrapper">
                                <button 
                                    class="case-block__select-btn" 
                                    @click.stop="toggleDropdown(block)"
                                    :class="{ 'is-active': activeDropdownId === block.id }"
                                >
                                    <span :class="{'placeholder-color': !block.value}">
                                        {{ block.value || 'Оберіть варіант' }}
                                    </span>
                                    <svg 
                                        class="case-block__select-arrow" 
                                        :class="{ 'is-open': activeDropdownId === block.id }"
                                        width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polyline points="6 9 12 15 18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                <transition name="dropdown-fade">
                                    <ul v-if="activeDropdownId === block.id" class="case-block__select-list">
                                        <li 
                                            class="case-block__select-item disabled" 
                                            v-if="!block.value"
                                        >
                                            Оберіть варіант
                                        </li>
                                        <li 
                                            v-for="item in block.options" 
                                            :key="item" 
                                            class="case-block__select-item"
                                            :class="{ 'is-selected': item === block.value }"
                                            @click.stop="selectOption(block, item)"
                                        >
                                            {{ item }}
                                        </li>
                                    </ul>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             <!-- Separate main blocks visually if needed -->
             <hr class="sv-feedback__divider" v-if="mIdx < blocks.length - 1"/>
          </div>

          <div class="case-category">
             <h2 class="case-category__title">Відео матеріали</h2>
            <!-- VIDEO (Static Block/Logic separate from dynamic form) -->
            <div class="case-video">
              <div
                  v-for="video in videos"
                  :key="video.id"
                  class="case-video__item"
                  :class="{'item--drive': video.resource_type === 'google_drive', 'item--youtube': video.resource_type === 'you_tube'}"
              >
                 <div class="case-video__content">
                    <!-- Icon placeholder -->
                   <div class="case-video__icon">
                      <span v-if="video.resource_type === 'google_drive'"><img src="@/assets/icons/google-drive-icon.png" alt="icon-drive"></span>
                      <span v-else-if="video.resource_type === 'you_tube'"><img src="@/assets/icons/youtube-icon.png" alt="icon-youtube"></span>
                      <span v-else>Video</span>
                   </div>
                   <span class="case-video__title">{{ video.title }}</span>
                 </div>
                <button class="case-video__delete" @click="removeVideo(video.id)">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8327 9.16667V15.5833M9.16602 9.16667V15.5833M5.49935 5.5V16.3167C5.49935 17.3434 5.49935 17.8565 5.69917 18.2486C5.87494 18.5936 6.1552 18.8746 6.50016 19.0504C6.89195 19.25 7.40509 19.25 8.42985 19.25H13.5688C14.5936 19.25 15.106 19.25 15.4978 19.0504C15.8428 18.8746 16.124 18.5936 16.2997 18.2486C16.4993 17.8568 16.4993 17.3443 16.4993 16.3195V5.5M5.49935 5.5H7.33268M5.49935 5.5H3.66602M7.33268 5.5H14.666M7.33268 5.5C7.33268 4.64577 7.33268 4.21887 7.47224 3.88196C7.65831 3.43274 8.01497 3.07563 8.46419 2.88955C8.80111 2.75 9.22846 2.75 10.0827 2.75H11.916C12.7702 2.75 13.1974 2.75 13.5343 2.88955C13.9835 3.07563 14.3403 3.43274 14.5264 3.88196C14.6659 4.21887 14.666 4.64578 14.666 5.5M14.666 5.5H16.4993M16.4993 5.5H18.3327" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
              </div>

              <button
                  v-if="!addingVideo"
                  class="case-video__add"
                  @click="addingVideo = true"
              >
                + Додати лінк
              </button>

              <div v-else class="case-video__input-group">
                <input
                    v-model="newVideo"
                    class="case-video__input"
                    placeholder="https://"
                />
                 <button class="case-video__confirm" @click="confirmVideo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.0005L8.94975 16.9502L19.5572 6.34375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                 </button>
              </div>
               
               <p class="case-video__help">
                 Додавайте посилання на відеозаписи сесій (Google Drive/YouTube). 
                 Доступ до них матимете лише ви та ваш супервізор.
               </p>
            </div>
          </div>

          <!-- FLOATING SAVE -->
          <button class="case-save" @click="saveCase">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.5 23.5002L6 23.5M18.5 23.5002L19.5039 23.5C20.9013 23.5 21.6 23.5 22.1342 23.2278C22.6047 22.9881 22.9881 22.6054 23.2278 22.135C23.5 21.6008 23.5 20.9013 23.5 19.5039V8.77443C23.5 8.21341 23.5 7.93151 23.4402 7.66382C23.3868 7.425 23.2991 7.19565 23.179 6.98244C23.0458 6.74592 22.8588 6.53819 22.4911 6.12973L19.0471 2.30301C18.6211 1.82967 18.4052 1.58976 18.146 1.41748C17.9128 1.2625 17.6553 1.14823 17.3841 1.07858C17.0781 1 16.7498 1 16.0938 1H5.00024C3.60011 1 2.89953 1 2.36475 1.27248C1.89434 1.51217 1.51217 1.89434 1.27248 2.36475C1 2.89953 1 3.60011 1 5.00024V19.5002C1 20.9004 1 21.5995 1.27248 22.1342C1.51217 22.6047 1.89434 22.9881 2.36475 23.2278C2.899 23.5 3.59874 23.5 4.99614 23.5H6M18.5 23.5002V18.7461C18.5 17.3487 18.5 16.649 18.2278 16.1147C17.9881 15.6443 17.6046 15.2622 17.1342 15.0225C16.5995 14.75 15.9004 14.75 14.5002 14.75H10.0002C8.60011 14.75 7.89953 14.75 7.36475 15.0225C6.89434 15.2622 6.51217 15.6443 6.27248 16.1147C6 16.6495 6 17.3501 6 18.7502V23.5M16 6H8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import apiService from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'SupervisorCaseDescriptionPage',
  setup() {
    const loading = ref(true);
    const lastUpdated = ref(null);
    const caseId = ref(null); // ID справи
    const clientId = ref(null); // ID клієнта з data.client.id
    const caseStatus = ref(null);
    const blocks = ref([]);
    const videos = ref([]);

    const addingVideo = ref(false);
    const newVideo = ref('');

    const activeDropdownId = ref(null);

    const formatDate = (isoStr) => {
        if (!isoStr) return null;
        try {
            const d = new Date(isoStr);
            if (isNaN(d.getTime())) return null; // Invalid date
            const pad = (n) => n.toString().padStart(2, '0');
            // Формат: "HH:mm - DD.MM.YYYY"
            return `${pad(d.getHours())}:${pad(d.getMinutes())} - ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
        } catch (e) {
            console.error("Date formatting error", e);
            return null;
        }
    };

    const toggleSubcategory = (subBlock) => {
         if (subBlock.isOpen) {
             subBlock.isFullyOpen = false;
             subBlock.isOpen = false;
         } else {
             subBlock.isOpen = true;
             setTimeout(() => {
                 if (subBlock.isOpen) {
                     subBlock.isFullyOpen = true;
                 }
             }, 300);
         }
    };

    const toggleDropdown = (block) => {
        if (activeDropdownId.value === block.id) {
            activeDropdownId.value = null;
        } else {
            activeDropdownId.value = block.id;
        }
    };

    const selectOption = (block, option) => {
        block.value = option;
        activeDropdownId.value = null;
    };

    const closeAllDropdowns = () => {
        activeDropdownId.value = null;
    };

    const saveCase = async () => {
        // Збираємо всі елементи
        const allItems = [];
        blocks.value.forEach(mainBlock => {
            mainBlock.subcategories.forEach(subBlock => {
                subBlock.items.forEach(item => {
                    allItems.push(item);
                });
            });
        });

        try {
            if (caseStatus.value === 'draft') {
                const answersData = allItems.map(item => ({
                    form_item_id: item.id,
                    text_answer: item.value || ''
                }));

                const payload = {
                    client_id: clientId.value,
                    answerable_id: caseId.value,
                    answerable_type: 'CaseDescription',
                    answers_data: answersData
                };

                await apiService.saveCaseAnswers(payload);
                M.toast({ html: 'Чернетка збережена' });
                 // завантаження свіжих даних
                await fetchCaseDescription(); 

            } else if (caseStatus.value === 'filled') {
                // 1. Визначити нові відповіді (наявне значення, але немає answerId)
                const newItems = allItems.filter(item => 
                    item.answerId === null && item.value && item.value.trim() !== ''
                );

                // 2. Визначити існуючі відповіді (наявний answerId)
                // надсилаємо їх, навіть якщо вони порожні, щоб дозволити очищення значень
                const existingItems = allItems.filter(item => item.answerId !== null);

                let savedNew = false;
                let updatedOld = false;

                // --- А. Зберегти нові елементи, якщо є ---
                if (newItems.length > 0) {
                     const newAnswersData = newItems.map(item => ({
                        form_item_id: item.id,
                        text_answer: item.value
                    }));

                    const savePayload = {
                        client_id: clientId.value,
                        answerable_id: caseId.value,
                        answerable_type: 'CaseDescription',
                        answers_data: newAnswersData
                    };

                    await apiService.saveCaseAnswers(savePayload);
                    savedNew = true;
                }

                // --- Б. Оновити існуючі елементи, якщо є ---
                if (existingItems.length > 0) {
                     const updateAnswersData = existingItems.map(item => ({
                        id: item.answerId,
                        text_answer: item.value || ''
                    }));
                
                    const updatePayload = {
                        client_id: clientId.value,
                        answers_data: updateAnswersData
                    };

                    await apiService.updateCaseAnswers(updatePayload);
                    updatedOld = true;
                }

                if (savedNew || updatedOld) {
                    M.toast({ html: 'Зміни збережено' });
                    await fetchCaseDescription();
                } else {
                     M.toast({ html: 'Немає змін для збереження' });
                }
            }
        } catch (error) {
            console.error('Error saving case:', error);
            M.toast({ html: 'Помилка збереження' });
        }
    };

    const fetchVideos = async () => {
       try {
        //const telegramID = 831595963;
        const response = await apiService.getClientAssets();
        // перевірка на масив або об'єкт, якщо бекенд змінюється
        videos.value = Array.isArray(response.data) ? response.data : (response.data.data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const confirmVideo = async () => {
      if (!newVideo.value) return;
      
      const link = newVideo.value;
      const type = detectSourceType(link);
      const title = type === 'you_tube' 
        ? 'Відео сесії (YouTube)' 
        : type === 'google_drive' 
          ? 'Відео сесії (Google Drive)' 
          : 'Відео сесії';

      const payload = {
        title: title,
        resource_type: type,
        link: link
      };

      try {
        //const telegramID = 831595963;
        await apiService.createClientAsset(payload);
        await fetchVideos(); // оновлення списку
        newVideo.value = '';
        addingVideo.value = false;
      } catch (error) {
        console.error('Error creating video asset:', error);
        M.toast({ html: 'Помилка збереження посилання' });
      }
    };

    const removeVideo = async (id) => {
        try {
            //const telegramID = 831595963;
            await apiService.deleteClientAsset(id);
            videos.value = videos.value.filter(v => v.id !== id);
        } catch (error) {
             console.error('Error deleting video asset:', error);
             M.toast({ html: 'Помилка видалення' });
        }
    };

    const detectSourceType = (url) => {
      if (typeof url !== 'string') return 'other';
      if (url.includes('youtube') || url.includes('youtu.be')) return 'you_tube';
      if (url.includes('drive.google')) return 'google_drive';
      return 'other';
    };

    const clearForm = () => {
        const confirmAction = (confirmed) => {
            if (confirmed) {
                blocks.value.forEach(mainBlock => {
                    mainBlock.subcategories.forEach(subBlock => {
                         subBlock.items.forEach(item => {
                             if(item.type === 'text' || item.type === 'string' || item.type === 'select_v2') {
                                 item.value = '';
                                 // Ми залишаємо answerId, щоб при збереженні оновити існуючу відповідь на порожню?
                                 // насправді, "очищення форми для нових даних" зазвичай означає, що ми хочемо розглядати це як новий запис?
                                 // але в описі сказано "форма (введення, текстове поле, вибір) може бути очищена для введення нових даних". 
                                 // Там не сказано "видалити старі дані". 
                                 // Однак, `caseStatus === 'filled'` означає, що ми редагуємо існуючий набір відповідей.
                                 // Якщо користувач очищає і зберігає, бекенд `updateCaseAnswers` ймовірно отримає порожні рядки.
                                 // Якщо мета - "ввести нові дані" в *ту ж* структуру справи, це правильно.
                             }
                         });
                    });
                });
                M.toast({ html: 'Форма очищена' });
            }
        };

        // перевірка наявності Telegram WebApp
        // Пріоритет: showPopup (v6.2+) -> showConfirm (v6.0+) -> window.confirm (Browser/Legacy)
        
        let handled = false;

        // спроба використати showPopup (v6.2+)
        // перевірка наявності методу
        if (window.Telegram?.WebApp?.showPopup) {
            try {
                window.Telegram.WebApp.showPopup({
                    title: 'Очищення форми',
                    message: 'Ви впевнені, що хочете очистити форму? Всі введені дані буде стерто.',
                    buttons: [
                        {id: 'delete', type: 'destructive', text: 'Очистити'},
                        {id: 'cancel', type: 'cancel'}
                    ]
                }, (buttonId) => {
                    if (buttonId === 'delete') {
                        confirmAction(true);
                    } else {
                        confirmAction(false); // Скасовано
                    }
                });
                handled = true;
            } catch (e) {
                console.warn('Telegram WebApp showPopup failed:', e);
                // перехід до наступного методу
                handled = false;
            }
        }

        // спроба використати showConfirm (v6.0), якщо showPopup не вдалося або недоступний
        if (!handled && window.Telegram?.WebApp?.showConfirm) {
             try {
                 window.Telegram.WebApp.showConfirm("Ви впевнені, що хочете очистити форму? Всі введені дані буде стерто.", confirmAction);
                 handled = true;
            } catch (e) {
                console.warn('Telegram WebApp showConfirm failed:', e);
                handled = false;
            }
        }

        // використання стандартного confirm браузера, якщо Telegram WebApp не вдалося або недоступний
        if (!handled) {
            const result = confirm("Ви впевнені, що хочете очистити форму? Всі введені дані буде стерто.");
            confirmAction(result);
        }
    };

    const fetchCaseDescription = async () => {
      loading.value = true;
      try {
        await Promise.all([
             (async () => {
                 const response = await apiService.getCaseDescription();
                 const data = response.data.data;
                 if (data) {
                    lastUpdated.value = formatDate(data.updated_at);
                    caseId.value = data.id;
                    caseStatus.value = data.status; // 'draft' or 'filled'
                    
                    if (data.client && data.client.id) {
                        clientId.value = data.client.id;
                    }

                     if (data.custom_form && data.custom_form.form_items) {
                        
                        // Grouping Logic
                        const grouped = {};
                        
                        // Sort or just iterate - order in array usually matters
                        data.custom_form.form_items.forEach(item => {
                            const mainCat = item.form_item_main_category_title || 'General';
                            const childCat = item.form_item_child_category_title || '';

                            if (!grouped[mainCat]) {
                                grouped[mainCat] = {};
                            }
                            if (!grouped[mainCat][childCat]) {
                                grouped[mainCat][childCat] = [];
                            }

                            // Find answer
                            const answer = (data.answers || []).find(a => a.form_item_id === item.id);
                            
                            // Map item
                            grouped[mainCat][childCat].push({
                                id: item.id, // form_item_id
                                answerId: answer ? answer.id : null, // answer_id (for updates)
                                title: item.field_name,
                                type: item.field_type, // 'text', 'string', 'select_v2'
                                helpText: item.help_text,
                                value: answer ? answer.text_answer : '',
                                options: item.variants || []
                            });
                        });

                        // Convert to array structure for easier iteration in template
                        const resultingBlocks = Object.keys(grouped).map(mainTitle => {
                            const subCats = grouped[mainTitle];
                            const subcategories = Object.keys(subCats).map(subTitle => {
                                return {
                                    subTitle: subTitle,
                                    isOpen: false,
                                    isFullyOpen: false,
                                    items: subCats[subTitle]
                                };
                            });
                            return {
                                mainTitle,
                                subcategories
                            };
                        });
                        
                        blocks.value = resultingBlocks;
                     }
                 }
             })(),
             fetchVideos()
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
        M.toast({ html: 'Помилка завантаження даних' });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCaseDescription();
      document.addEventListener('click', closeAllDropdowns);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', closeAllDropdowns);
    });

    return {
      loading,
      lastUpdated,
      blocks,
      videos,
      addingVideo,
      newVideo,
      confirmVideo,
      removeVideo,
      detectSourceType,
      toggleSubcategory,
      toggleDropdown,
      selectOption,
      activeDropdownId,
      saveCase,
      clearForm,
      caseStatus,
      caseId,
      clientId
    };
  }
};
</script>

<style lang="scss" scoped>
.sv-case {
  padding: 20px 0 100px;

  &__intro {
    margin: 0 0 25px;
    color: #494B55;
    font: 500 18px / 1.2 "Nunito", system-ui, sans-serif;
  }

  &__header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 25px;
    flex-direction: column;
  }

  &__version {
    font: 600 15px "Nunito", system-ui, sans-serif;
    color: #494b55;

    &-badge {
      background: #72A8BA;
      color: #fff;
      padding: 3px 9px;
      border-radius: 50px;
    }
  }
}

.case-category {
    margin-bottom: 40px;
    
    &__title {
        font: 700 18px / 1.2 "Nunito", system-ui, sans-serif;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 15px;
        background: #E09F56;
        padding: 11px 10px;
        border-radius: 10px;
        text-align: center;
    }
}

.case-subcategory {
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1); /* Optional divider */
    
    &:last-child {
        border-bottom: none;
    }

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
        font: 600 18px / 1.2 "Nunito", system-ui, sans-serif;
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
        overflow: hidden; /* Hide content during transition */
        
        &.is-open {
            grid-template-rows: 1fr;
        }

        &.overflow-visible {
            overflow: visible; /* Show content (tooltips) when fully open */
        }
    }

    &__content-inner {
        min-height: 0; /* Allow grid to collapse */
        padding-bottom: 1px; /* Avoid clipping */
    }
}

.case-block {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    // gap: 10px;

  &__header {
      display: flex;
      align-items: center;
      background: #72A8BA;
      justify-content: center;
      border-radius: 12px 12px 0 0;
      padding: 14px 10px;
      gap: 10px;
      position: relative;
  }

  &__title {
    font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;
    color: #fff;
    margin: 0;
  }

  &__help {
      position: relative;
      
      @media (max-width: 650px) {
        position: static;
      }

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: help;
      opacity: 0.7;
      transition: opacity 0.2s;

      &:hover {
          opacity: 1;
          .case-block__tooltip {
              visibility: visible;
              opacity: 1;
              transform: translateX(-50%) translateY(-5px);
          }
      }
  }

  &__tooltip {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      bottom: 150%; /* Position above the icon */
      left: 50%;
      transform: translateX(-50%);
      
      background: #385E6C; /* Dark Slate / Teal as in screenshot */
      color: #fff;
      padding: 11px 11px;
      border-radius: 10px;
      font: 400 14px/1.4 "Nunito", sans-serif;
      width: max-content;
      max-width: 250px;
      text-align: center;
      z-index: 20;
      pointer-events: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);

      @media (max-width: 650px) {
          position: absolute;
          top: auto;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 10px;
          max-width: 90%;
          width: max-content;
          z-index: 20;

          &::after {
              display: none;
          }
      }

      /* Triangle arrow */
      &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -6px;
          border-width: 6px;
          border-style: solid;
          border-color: #385E6C transparent transparent transparent;
      }
  }

  &__textarea, &__input, &__select-btn {
    width: -webkit-fill-available;
    max-width: 100%;
    border-radius: 0 0 12px 12px;
    padding: 14px 20px;
    background: #4a4d55;
    color: #fff;
    border: 1px solid transparent; 
    text-transform: lowercase;
    font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;

    &::placeholder {
        color: #bbb;
    }

    &:focus {
        border-color: #72A8BA;
        outline: none;
    }
    
  }

  &__textarea {
      min-height: 120px;
      resize: vertical;
  }

  /* Custom Select Styles */
  &__select-wrapper {
      position: relative;
      width: 100%;
  }

  &__select-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      text-align: left;
      
      .placeholder-color {
          color: #9ca3af; /* Gray placeholder */
          font-weight: 400;
      }
      
      span {
           /* Ensure text doesn't overflow button either, though usually short enough or wraps */
           padding-right: 10px;
      }
  }

  &__select-arrow {
      transition: transform 0.2s;
      flex-shrink: 0;
      &.is-open {
          transform: rotate(180deg);
      }
  }

  &__select-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #565963; 
      
      border-radius: 12px;
      margin-top: 8px;
      padding: 8px 0;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      z-index: 50;
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.1);
  }

  &__select-item {
      padding: 12px 20px;
      color: #fff;
      font: 500 15px/1.4 "Nunito", sans-serif;
      cursor: pointer;
      white-space: normal; /* ALLOW WRAPPING */
      border-bottom: 1px solid rgba(255,255,255,0.05);
      transition: background 0.2s;

      &:last-child {
          border-bottom: none;
      }

      &:hover {
          background: rgba(255,255,255,0.1);
      }

      &.is-selected {
          background: #72A8BA;
          color: #fff;
      }
      
      &.disabled {
          color: #9ca3af;
          cursor: default;
          pointer-events: none;
          font-style: italic;
      }
  }

  /* Transition for dropdown */
  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  @media (min-width: 860px) {
      &__textarea, &__input, &__select-btn {
          border-radius: 0 12px 12px 12px;
      }
      &__header {
          max-width: 60%;
      }
  }



}

.sv-feedback__divider {
    border: 1px dashed #72a8ba;
}

.case-video {
  &__item {
    background: #72A8BA; /* Fallback/Default */
    &.item--drive { background: #72A8BA; } /* Adjust color if needed matching 'google drive' theme from screenshot (blueish) */
    &.item--youtube { background: #E62117; } /* YouTube red - tentative, or keep consistent theme */
    /* Screenshot showed Teal/Blueish for Drive. Let's stick to theme or similar. 
       Screenshot had: #7fa9bb looks like the drive one. Let's map strict colors if we knew them.
       Let's use a nice slate for generic and blue for drive.
    */
    background: #7fa9bb; 
    
    color: #fff;
    padding: 14px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__content {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  &__icon {
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      
      img {
        width: 18px;
        height: 18px;
        object-fit: contain;
      }
    }
  }

  &__delete {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
  }

  &__add {
    margin-top: 10px;
    font: 700 20px "Nunito";
    color: #494B55; /* Dark text for add button as per potential design, or keep inherited */
    color: #385E6C; /* Darker teal */
    background: none;
    border: none;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  &__input-group {
    display: flex;
    align-items: center;
    background: #4a4d55;
    border-radius: 12px;
    padding: 14px 20px;
    margin-top: 10px;
  }

  &__input {
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    outline: none;
    text-transform: lowercase;
    font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;
    padding: 0;

    &::placeholder {
        color: #bbb;
    }
  }

  &__confirm {
      background: none;
      border: none;
      color: #fff;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
  }

  &__help {
      margin-top: 15px;
      font-size: 14px;
      color: #494B55;
      text-align: center;
      line-height: 1.4;
  }
}

.case-save {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #d8b48c;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #72A8BA;
  }
}

.case-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.case-clear-btn {
    background: #d7b48c;
    border: 1px solid #d7b48c;
    color: #fff;
    padding: 10px 10px;
    border-radius: 12px;
    font: 600 16px / 1.2 "Nunito", system-ui, sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
        background: #72A8BA;
        color: #fff;
        border-color: #72A8BA;
    }

    svg {
        width: 20px;
        height: 20px;
    }
}
</style>