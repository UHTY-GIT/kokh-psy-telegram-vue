<template>
  <div>
    <div class="block_menu_button">
      <nav>
        <ul class="menu ul">
          <router-link
              v-for="link in links"
              :key="link.url"
              :to="link.url"

              active-class="active"
              custom
              v-slot="{ navigate, isActive }"
          >
            <li
                class="menu-item"
                :class="{ 'active': isActive }"
                @click="navigate"
            >
              <img :src="link.icon" :alt="`${link.title} icon`">
            </li>
          </router-link>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
//import faq from '@/assets/icons/telegram-faq.svg';
import home from '@/assets/icons/home.png'
//import payment from '@/assets/icons/telegram-payment.svg'
//import sessionClient from '@/assets/icons/telegram-session-client.svg'
import statistics from '@/assets/icons/performance.png'

export default {
  name: 'SideBar',
  data: () => ({
    links: [
      // {title: 'Сесії клієнта', url: '/session-client', exact: true, icon: sessionClient},
      {title: 'Статистика клієнта', url: '/statistic-client', exact: true, icon: statistics},
      {title: 'Головна', url: '/', icon: home},
      // {title: 'Оплата', url: '/payment', exact: true, icon: payment},
      // {title: 'Часті питання', url: '/faq', exact: true, icon: faq},
    ],
  })
}
</script>