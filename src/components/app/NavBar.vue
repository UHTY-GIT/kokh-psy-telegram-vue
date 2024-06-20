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

    const fullUserPhotoUrl = computed(() => {
      return userPhoto.value || defaultUserPhoto;
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
        userPhoto.value = photoUrl;
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