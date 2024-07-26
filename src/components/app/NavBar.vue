<template>
  <div class="background-navbar">
    <div class="container-user-photo">
      <div class="user-photo">
        <img :src="fullUserPhotoUrl" alt="user photo">
      </div>
      <span class="container-user-name">
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

export default {
  name: 'NavBar',
  setup() {
    const userPhoto = ref('');
    const firstName = ref('');
    const userName = ref('');
    const userId = ref('');
    const errors = ref([]);

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value || defaultUserPhoto;
    });

    const fetchUserData = () => {
      const tg = window.Telegram.WebApp;

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
        const userProfile = response.data;
        firstName.value = userProfile.name;
        localStorage.setItem('origin_type', userProfile.origin_type);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        errors.value.push('Помилка завантаження профілю користувача');
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      fullUserPhotoUrl,
      firstName,
      userName,
      userId,
      errors,
    };
  }
}
</script>
