<!--src/components/app/NavBar.vue-->
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
    <div class="error-messages">
      1
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
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
    const errors = ref([]);

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value || defaultUserPhoto;
    });

    const fetchUserData = () => {
      const tg = window.Telegram.WebApp;

      if (!tg) {
        errors.value.push('Telegram WebApp object is not available.');
        return;
      }

      tg.ready(() => {
        errors.value.push('Telegram WebApp is ready');
        errors.value.push('initDataUnsafe:', tg.initDataUnsafe);
        errors.value.push(`initDataUnsafe1: ${JSON.stringify(tg.initDataUnsafe)}`);

        if (!tg.initDataUnsafe) {
          errors.value.push('No initDataUnsafe available.');
          return;
        }

        const user = tg.initDataUnsafe.user;
        if (user) {
          userName.value = user.first_name || 'Імя клієнта';
          userId.value = user.id || '';
          loadUserPhoto(user.photo_url);
          saveUserDataToLocalStorage(user.id, user.first_name, user.photo_url);
        } else {
          errors.value.push('No user data found in initDataUnsafe.');
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
      errors,
    };
  }
}
</script>