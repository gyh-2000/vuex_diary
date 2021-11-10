import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import route from "./router";
import Vuex from "vuex";
import storeObj from "./store";
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
const router = new VueRouter({
  //创建路由实例
  routes: route,
});
// const store = new Vuex.Store({...store})
const store = new Vuex.Store(storeObj);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
