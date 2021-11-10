<template>
  <div class="main">
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderBar from "../components/HeaderBar.vue";
export default {
  name: "Commen",
  components: {
    HeaderBar,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.main {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border-radius: 30px;
}
</style>
