<template>
  <div>
    <div class="block_menu_button">
      <nav>
        <ul class="menu ul">
          <router-link
              v-for="link in filteredLinks"
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
import informed from '@/assets/icons/document.png';
import home from '@/assets/icons/home.png';
import statistics from '@/assets/icons/performance.png';
import couplecycle from '@/assets/icons/heart.png';
import allsession from '@/assets/icons/all-session.png';
import expert from '@/assets/icons/favorite.png';
import feedback from '@/assets/icons/love-message.png';

export default {
  name: 'SideBar',
  data: () => ({
    links: [
      {title: 'Головна', url: '/', icon: home},
      {title: 'Всі сесії', url: '/all-session', exact: true, icon: allsession},
      {title: 'Статистика клієнта', url: '/statistic-client', exact: true, icon: statistics},
      {title: 'Цикл пари', url: '/cycle-couple', exact: true, icon: couplecycle},
      {title: 'Дайджест психотерапевтичних думок сесії', url: '/feedback-last-session', icon: feedback},
      {title: 'Інформована згода клієнта', url: '/informed-consent', exact: true, icon: informed},
      {title: 'Оцінка експерта', url: '/expert-assessment', exact: true, icon: expert},
    ],
    typeClient: '',
  }),
  computed: {
    filteredLinks() {
      if (this.typeClient === 'couple_сlassic' || this.typeClient === 'couple_diagnostic') {
        return this.links.filter(link => link.url !== '/feedback-last-session');
      } else {
        return this.links.filter(link => link.url !== '/cycle-couple');
      }
    }
  },
  created() {
    //const originType = 'couple_сlassic';
    const originType = localStorage.getItem('origin_type');

    if (originType) {
      this.typeClient = originType;
    }
  }
}
</script>
