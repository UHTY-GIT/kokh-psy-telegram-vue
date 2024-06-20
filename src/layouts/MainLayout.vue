<!--src/layouts/MainLayout.vue-->
<template>
  <div class="background_main">
    <NavbarLogin />
    <section class="main-section">
      <main class="site-content app-content">
        <router-view />
      </main>
      <SidebarLogin/>
    </section>
  </div>
</template>
<script>
import NavbarLogin from "@/components/app/NavBar.vue";
import SidebarLogin from "@/components/app/SideBar.vue";
export default {
  name: "MainLayout",
  components: {
    NavbarLogin,
    SidebarLogin
  },
  setup() {

  }
}
</script>