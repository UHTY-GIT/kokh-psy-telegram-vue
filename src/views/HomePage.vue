<template>
  <div>
    <div class="container-tittle">
      <p>
        Головна
      </p>
      <hr class="hr_title">
    </div>
    <div class="content-main">
      <p>
        Привіт! 🤗
      </p>
      <p>
        Вітаємо у новому інтерфейсі нашого онлайн-бота психолога.
      </p>
      <p>
        Тут ви можете не лише скористатися всіма звичними функціями, такими як оплата та перегляд відповідей на часті запитання, але й ознайомитися зі своєю статистикою сесій у вигляді графіку.
      </p>
      <p>
        Крім того, ви маєте можливість переглядати історію своїх сесій та дізнаватися про дату і час наступних консультацій з психологом Катериною Кох ❤
      </p>
    </div>
    <div class="container-links">
      <router-link to="/statistic-client">
        <div class="block-links-main">
          <p>
            Переглянути статистику <img src="@/assets/icons/share.svg" alt="link">
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  setup() {

  }
}
</script>
