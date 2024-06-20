<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";
export default {
  computed: {
    layout() {
      console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout';
    }
  },
  components: {
    MainLayout
  }
}
</script>
<style>
@import "@/assets/style.css";
</style>