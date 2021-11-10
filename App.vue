<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view />
  </div>
</template>
<script>
import HeaderBar from './components/HeaderBar.vue';
// import getSubjectList from "@/api/index.js";
export default {
  components: { HeaderBar },
  data() {
    return {
      tabledata: [],
    };
  },
  mounted(){
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
