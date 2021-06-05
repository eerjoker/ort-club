import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import Usuario from "./components/Usuario.vue";
import Actividades from "./components/Actividades.vue";

import VCalendar from "v-calendar";

Vue.use(Router)

Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

Vue.config.productionTip = false;

const routes = [
  { path: "/usuario", component: Usuario },
  { path: "/actividades", component: Actividades }
];

const router = new Router({
  routes,
  mode: "hash"
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
