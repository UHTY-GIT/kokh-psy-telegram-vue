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
  </div>
  <div class="error-messages" v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import defaultUserPhoto from '@/assets/icons/emoji.iamrohit.png';

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
        errors.value.push('Telegram WebApp недоступний');
        return;
      }

      //errors.value.push('запустилося');
      //errors.value.push(`initDataUnsafe: ${JSON.stringify(tg.initDataUnsafe)}`);

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