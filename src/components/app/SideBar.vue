<template>
  <div class="side-bar">
    <div class="block_menu_button glass-card">
      <nav>
        <ul class="menu ul">
          <router-link
              v-for="link in menuLinks"
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
import mymaterials from '@/assets/icons/my-materials.png';
import casedescription from '@/assets/icons/case-description.svg';

export default {
  name: 'SideBar',
  data: () => ({
    // Меню по ролям
    linksIndividual: [
      { title: 'Головна', url: '/', icon: home },
      { title: 'Всі сесії', url: '/all-session', exact: true, icon: allsession },
      { title: 'Статистика клієнта', url: '/statistic-client', exact: true, icon: statistics },
      { title: 'Дайджест психотерапевтичних думок сесії', url: '/feedback-last-session', icon: feedback },
      { title: 'Інформована згода клієнта', url: '/informed-consent', exact: true, icon: informed },
      { title: 'Оцінка експерта', url: '/expert-assessment', exact: true, icon: expert }
    ],

    linksCouple: [
      { title: 'Головна', url: '/', icon: home },
      { title: 'Всі сесії', url: '/all-session', exact: true, icon: allsession },
      { title: 'Статистика клієнта', url: '/statistic-client', exact: true, icon: statistics },
      { title: 'Цикл пари', url: '/cycle-couple', exact: true, icon: couplecycle },
      { title: 'Інформована згода клієнта', url: '/informed-consent', exact: true, icon: informed },
      { title: 'Оцінка експерта', url: '/expert-assessment', exact: true, icon: expert }
    ],

    linksSupervisor: [
      { title: 'Кабінет супервізанта', url: '/supervisor', exact: true, icon: home },
      { title: 'Сесії супервізанта', url: '/supervisor/sessions', exact: true, icon: allsession },
      { title: 'Фідбек супервізора', url: '/supervisor/feedback', exact: true, icon: expert },
      { title: 'Мої матеріали', url: '/supervisor/materials', exact: true, icon: mymaterials },
      { title: 'Опис кейсу', url: '/supervisor/case-description', exact: true, icon: casedescription }
    ],

    typeClient: '',
  }),
  computed: {
    role() {
      // Normalize origin_type into app roles
      if (this.typeClient === 'individual_supervision') return 'supervisor';


      const isCouple = this.typeClient === 'couple_classic' || this.typeClient === 'couple_сlassic' || this.typeClient === 'couple_diagnostic';
      if (isCouple) return 'couple';

      return 'individual';
    },

    menuLinks() {
      if (this.role === 'supervisor') return this.linksSupervisor;
      if (this.role === 'couple') return this.linksCouple;
      return this.linksIndividual;
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