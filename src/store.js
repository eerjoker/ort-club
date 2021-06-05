import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usuarioActual: null,
    usuarios: [
      {
        id: 100,
        nombre: 'Esteban',
        mail: '1@mail.com',
        password: '123'
      }
    ]
  },
  getters: {
    nombreUsuarioActual: (state) => {
      if(state.usuarioActual) {
        return state.usuarioActual.nombre
      } else {
        return ""
      }
    },
    usuarioLogin: (state) => (email, password) => {
      return state.usuarios.find(u => u.mail == email && u.password == password)
    },
    hayUsuario: (state) => {
      return state.usuarioActual != null
    }
  },
  mutations: {
    login (state, payload) {
      state.usuarioActual = payload.usuario
    },
    logout (state) {
      state.usuarioActual = null
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