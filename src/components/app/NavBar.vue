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
        alert('Telegram WebApp is ready');
        alert('initDataUnsafe:', tg.initDataUnsafe);

        const user = tg.initDataUnsafe.user;
        if (user) {
          userName.value = user.first_name || 'Імя клієнта';
          userId.value = user.id || '';
          loadUserPhoto(user.photo_url);
          saveUserDataToLocalStorage(user.id, user.first_name, user.photo_url);
        } else {
          alert('No user data found in initDataUnsafe');
        }
      });
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