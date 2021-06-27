import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    url: "https://60bd1820b8ab3700175a020d.mockapi.io/api",
    urlTurnos: "https://60c5464cec8ef800175e1048.mockapi.io/api",
    usuarioActual: null,
    tiposActividad: []
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
    nombreTipoActividad: (state) => (idTipo) => {
      const nombre = state.tiposActividad.find(a => a.id == idTipo)
      if (nombre) {
        return nombre
      } else {
        return ""
      }
    }
  },
  mutations: {
    login(state, payload) {
      state.usuarioActual = payload.usuario;
    },
    logout(state) {
      state.usuarioActual = null;
    },
    setTiposActividad(state, payload) {
      state.tiposActividad = payload.tipos
    }
  },
  actions: {
    loguear(context, usuario) {
      context.commit("login", { usuario });
    },
    desloguear(context) {
      context.commit("logout");
    },
    async actualizarTiposActividad(context) {
      try {
        const tiposResponse = await axios.get(`${ context.state.url }/tiposActividad`)
        if(tiposResponse.status < 200 || tiposResponse.status >= 300) {
          throw new Error('Error al actualizar los tipos de actividades: ' + tiposResponse.statusText)
        }
        context.commit("setTiposActividad", { tipos: tiposResponse.data })
      } catch (err) {
        err.message
      }
    }
  },
});

export default store;
