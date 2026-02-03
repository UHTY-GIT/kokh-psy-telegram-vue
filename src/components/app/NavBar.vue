<template>
  <div :class="['background-navbar', { 'background-navbar--desktop': isDesktop }]">
    <div class="container-user-photo">
      <div class="user-photo">
        <img :src="fullUserPhotoUrl" alt="user photo">
      </div>
      <span class="container-user-name" @click="handleUserClick">
        {{ firstName }}
<!--        {{ userName }} (ID: {{ userId }})-->
      </span>
    </div>
    <div class="logotype-psychology">
      <img src="@/assets/photo/favicon-5.png" alt="logotype">
    </div>
  </div>
  <div class="error-messages" v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import apiService from '@/services/apiService';
import defaultUserPhoto from '@/assets/icons/emoji.iamrohit.png';
import { useTelegramPlatform } from '@/composables/useTelegramPlatform';
import { useStore } from 'vuex';
import M from 'materialize-css';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const clickCount = ref(0);
    const userPhoto = ref('');
    const firstName = ref('');
    const userName = ref('');
    const userId = ref('');
    const errors = ref([]);

    const { isDesktop } = useTelegramPlatform();

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value || defaultUserPhoto;
    });

    const fetchUserData = () => {
      const tg = window.Telegram?.WebApp;

      if (!tg) {
        errors.value.push('Telegram WebApp недоступний');
        return;
      }

      const initData = tg.initDataUnsafe;

      if (!initData) {
        errors.value.push('Немає доступних даних');
        return;
      }

      const user = initData.user;
      if (user) {
        userName.value = user.first_name;
        userId.value = user.id || '';
        loadUserPhoto(user.photo_url);
        saveUserDataToLocalStorage(user.id);
        fetchUserProfile(user.id); // Fetch user profile data from API
      } else {
        errors.value.push('Не знайдено дані користувача');
      }
    };

    const loadUserPhoto = (photoUrl) => {
      if (photoUrl) {
        userPhoto.value = photoUrl;
      } else {
        userPhoto.value = defaultUserPhoto;
      }
    };

    const saveUserDataToLocalStorage = (id) => {
      localStorage.setItem('telegram_user_id', id);
    };

    const fetchUserProfile = async (telegramID) => {
      try {
        const response = await apiService.getAllInformationClient(telegramID);
        const userProfile = response.data.data;
        firstName.value = userProfile.name;
        // errors.value.push('firstName.value' + userProfile.name);
        // errors.value.push('origin_type' + userProfile.origin_type);

        localStorage.setItem('origin_type', userProfile.origin_type);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        errors.value.push('Помилка завантаження профілю користувача');
      }
    };

    const handleUserClick = () => {
      clickCount.value++;
      if (clickCount.value === 10) {
        store.commit('SET_DEBUG_MODE', true);
        M.toast({html: 'Debug Mode Enabled 🐞'});
        clickCount.value = 0; // Reset or keep it? Requirement says "if user presses ... 10 times". Resetting allows re-trigger if needed, or prevents spam.
      }
    };


    onMounted(() => {
      fetchUserData();
      fetchUserProfile(userId.value);
    });

    return {
      fullUserPhotoUrl,
      firstName,
      userName,
      userId,
      errors,
      isDesktop,
      handleUserClick,
    };
  }
}
</script>
