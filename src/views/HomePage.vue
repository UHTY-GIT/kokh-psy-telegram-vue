<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div class="container-tittle">
      <p>
        Головна
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <div v-if="typeClient === 'individual'" class="single-text">
        <p>
          Привіт! 🤗
        </p>
        <p>
          Вітаємо у оновленому інтерфейсі <b>psychological digital workbook.</b>
        </p>
        <p>
          Тут ти  маєш можливість переглядати історію своїх сесій, повертатися до важливих питань саморефлексії, тримати у фокусі свій запит та ознайомитися зі своєю статистикою сесій у вигляді графіку.
        </p>
        <p>
          Крім цього тут ти зможеш отримувати терапевтичний відгук від психолога по руху терапії та своєму запиту ❤
        </p>
        <p>
          Хай цей психологічний курс буде простором для твоїх  думок, важливих сенсів та цінностей.
        </p>
      </div>
      <div v-else-if="typeClient === 'couple_сlassic'" class="couple-text">
        <p>
          Привіт! 🤗
        </p>
        <p>
          Вітаємо вас у оновленому інтерфейсі <b>psychological digital workbook для пар.</b>
        </p>
        <p>
          Тут ви  маєте можливість переглядати історію своїх сесій, повертатися до важливих питань саморефлексії, тримати у фокусі свій запит  та цикл. Ознайомитися  зі своєю статистикою сесій у вигляді графіку.
        </p>
        <p>
          Крім цього тут ви зможеш отримувати терапевтичний відгук від парного психолога по руху терапії та своєму запиту 🤍
        </p>
        <p>
          Хай цей психологічний курс буде простором для ваших думок, важливих сенсів та близькості.
        </p>
      </div>
      <div v-else>
        <p>
          Привіт! 🤗
        </p>
        <p>
          Будь ласка, запишіться на свою першу консультацію.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';

export default {
  name: "HomePage",
  setup() {
    const typeClient = ref('');

    onMounted(() => {
      const originType = localStorage.getItem('origin_type');
      if (originType) {
        typeClient.value = originType;
      }
    });

    return {
      typeClient
    };
  }
}
</script>
