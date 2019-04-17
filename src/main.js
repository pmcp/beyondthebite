import Vue from "vue";
import App from "./App.vue";
import VueWaypoint from 'vue-waypoint'
import VueAnime from 'vue-animejs';

Vue.use(VueAnime)
Vue.use(VueWaypoint)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
