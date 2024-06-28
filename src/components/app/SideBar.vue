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
import informed from '@/assets/icons/document.png';
import home from '@/assets/icons/home.png'
import statistics from '@/assets/icons/performance.png'

export default {
  name: 'SideBar',
  data: () => ({
    links: [
      {title: 'Статистика клієнта', url: '/statistic-client', exact: true, icon: statistics},
      {title: 'Головна', url: '/', icon: home},
      {title: 'Інформована згода клієнта', url: '/informed-consent', exact: true, icon: informed},
    ],
  })
}
</script>