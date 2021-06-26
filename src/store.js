import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    url: "https://60bd1820b8ab3700175a020d.mockapi.io/api/",
    urlTurnos: "https://60c5464cec8ef800175e1048.mockapi.io/api",
    usuarioActual: null,
    tiposActividad: [
      {
        id: 1,
        nombre: "Futbol",
      },
      {
        id: 2,
        nombre: "Basquet",
      },
      {
        id: 3,
        nombre: "Yoga",
      },
      {
        id: 4,
        nombre: "Crossfit",
      },
      {
        id: 5,
        nombre: "Natación",
      },
      {
        id: 6,
        nombre: "Tenis",
      },
    ],
  },
  getters: {
    nombreUsuarioActual: (state) => {
      if (state.usuarioActual) {
        return state.usuarioActual.nombre;
      } else {
        return "";
      }
    },
    hayUsuario: (state) => {
      return state.usuarioActual != null;
    },
    usuarioActualId: (state) => {
      if (state.usuarioActual) {
        return state.usuarioActual.id;
      } else {
        return "";
      }
    },
    usuarioActualTipo: (state) => {
      if (state.usuarioActual) {
        return state.usuarioActual.tipoUsuario;
      } else {
        return "";
      }
    },
    getTiposActividad: (state) => {
      return state.tiposActividad;
    },
    nombreTipoActividad: (state) => (id) => {
      return state.tiposActividad.find((t) => t.id == id).nombre;
    },
  },
  mutations: {
    login(state, payload) {
      state.usuarioActual = payload.usuario;
    },
    logout(state) {
      state.usuarioActual = null;
    },
  },
  actions: {
    loguear(context, usuario) {
      context.commit("login", { usuario });
    },
    desloguear(context) {
      context.commit("logout");
    },
  },
});

export default store;
