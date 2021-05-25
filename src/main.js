import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import Vuex from 'vuex'
import 'es6-promise/auto'
import SidebarPlugin from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Home from "./components/Home.vue";
import Usuario from "./components/Usuario.vue";
import Actividades from "./components/Actividades.vue";
import Login from "./components/Login.vue"

Vue.use(Router).use(SidebarPlugin);
Vue.use(Vuex)
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home },
  { path: "/usuario", component: Usuario },
  { path: "/actividades", component: Actividades },
  { path: "/login", component: Login}
];

const router = new Router({
  routes,
  mode: "hash"
});

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
