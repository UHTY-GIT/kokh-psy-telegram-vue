<template>
  <div class="background-navbar">
    <div class="container-user-photo">
      <div class="user-photo">
        <img :src="fullUserPhotoUrl" alt="user photo">
      </div>
      <span class="container-user-name">
        {{ userName }}
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
    const baseImageUrl = 'https://api.telegram.org/file/bot6995596109:AAGNHDoHuSdzkgbbearnVRCjROEhBPCCivI/'; // Замініть <your_bot_token> на ваш бот-токен

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value ? baseImageUrl + userPhoto.value : defaultUserPhoto;
    });

    const fetchUserData = () => {
      const tg = window.Telegram.WebApp;

      tg.ready(() => {
        userName.value = tg.initDataUnsafe.user?.first_name || 'Імя клієнта';
        loadUserPhoto(tg.initDataUnsafe.user?.photo_url);
      });
    };

    const loadUserPhoto = (photoUrl) => {
      if (photoUrl) {
        // Імітуємо завантаження фото користувача
        fetch(photoUrl)
            .then(response => {
              if (response.ok) {
                userPhoto.value = photoUrl;
              } else {
                throw new Error('Failed to load user photo');
              }
            })
            .catch(() => {
              userPhoto.value = defaultUserPhoto;
            });
      } else {
        userPhoto.value = defaultUserPhoto;
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      fullUserPhotoUrl,
      userName,
    };
  }
}
</script>