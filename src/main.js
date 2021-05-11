import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import Usuario from "./components/Usuario.vue";
import Actividades from "./components/Actividades.vue";
import Login from "./components/Login.vue"

Vue.use(Router)
Vue.config.productionTip = false;

const routes = [
  { path: "/usuario", component: Usuario },
  { path: "/actividades", component: Actividades },
  { path: "/login", component: Login}
];

const router = new Router({
  routes,
  mode: "hash"
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
