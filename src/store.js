import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usuarioActual: null,
    usuarios: {
      u1: {
        id: 100,
        nombre: 'Esteban',
        mail: '@mail.com'
      }
    }
  },
  getter: {
    nombreUsuarioActual (state) {
      return state.nombreUsuario
    },
    usuarioLogin: (state) => (email, pass) => {
      return state.usuarios.filter(u => u.email == email && u.pass == pass)[0]
    }
  },
  mutations: {
    login (state, payload) {
      state.nombreUsuario = payload.usuario
    },
    logout (state) {
      state.nombreUsuario = null
    }
  },
  actions: {
    loguear (context, usuario) {
      context.commit('login', usuario)
    },
    desloguear (context) {
      context.commit('logout')
    }
  }
})

export default store