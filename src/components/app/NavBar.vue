<template>
  <div class="background-navbar">
    <div class="container-user-photo">
      <div class="user-photo">
        <img :src="fullUserPhotoUrl" alt="user photo">
      </div>
      <span class="container-user-name">
        {{ userName }} (ID: {{ userId }})
      </span>
    </div>
    <div class="logotype-psychology">
      <img src="@/assets/photo/favicon-5.png" alt="logotype">
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import defaultUserPhoto from '@/assets/photo/Potted Plant.svg';

export default {
  name: 'NavBar',
  setup() {
    const userPhoto = ref('');
    const userName = ref('');
    const userId = ref('');

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value || defaultUserPhoto;
    });

    const fetchUserData = () => {
      const tg = window.Telegram.WebApp;

      tg.ready(() => {
        console.log('Telegram WebApp is ready');
        console.log('initDataUnsafe:', tg.initDataUnsafe);

        const user = tg.initDataUnsafe.user;
        userName.value = user.first_name || 'Імя клієнта';
        userId.value = user.id || '1';
        loadUserPhoto(user.photo_url);
        saveUserDataToLocalStorage(user.id, user.first_name, user.photo_url);

      });
    };

    const loadUserPhoto = (photoUrl) => {
      if (photoUrl) {
        userPhoto.value = photoUrl;
      } else {
        userPhoto.value = defaultUserPhoto;
      }
    };

    const saveUserDataToLocalStorage = (id, name, photoUrl) => {
      localStorage.setItem('telegram_user_id', id);
      localStorage.setItem('telegram_user_name', name);
      localStorage.setItem('telegram_user_photo_url', photoUrl);
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      fullUserPhotoUrl,
      userName,
      userId,
    };
  }
}
</script>