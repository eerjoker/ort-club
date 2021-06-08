import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import store from './store.js'
import 'es6-promise/auto'
import SidebarPlugin from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Home from "./components/Home.vue";
import Usuario from "./components/Usuario.vue";
import Actividades from "./components/Actividades.vue";
import Actividad from "./components/Actividad.vue"
import Registro from "./components/Registro.vue"
import VCalendar from "v-calendar";
import ListaUsuarios from './components/ListaUsuarios.vue'

Vue.use(Router)
   .use(SidebarPlugin)
   .use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home },
  { path: "/usuario", component: Usuario },
  { path: "/actividades", component: Actividades },
  { path: "/registro", component: Registro },
  { path: "/listaUsuarios", component: ListaUsuarios },
  { path: "/actividades", component: Actividades },
  { path: "/actividad/:id", component: Actividad },
];

const router = new Router({
  routes,
  mode: "hash"
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
