import Vue from "vue";
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: 'https://60bd1820b8ab3700175a020d.mockapi.io/api/',
    usuarioActual: null,
    usuarios: []
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
      return state.usuarios.find(u => u.email == email && u.password == password)
    },
    hayUsuario: (state) => {
      return state.usuarioActual != null
    }
  },
  mutations: {
    setUsuarios (state, usuarios) {
      state.usuarios = usuarios
    },
    login (state, payload) {
      state.usuarioActual = payload.usuario
    },
    logout (state) {
      state.usuarioActual = null
    }
  },
  actions: {
    async setUsuarios (context) {
      try {
        const usuariosResponse = await axios.get(`${ context.state.url }/usuarios`)
        if(usuariosResponse.status != 200) {
          throw new Error('Usuarios: ' + usuariosResponse.statusText)
        }
        context.commit('setUsuarios', usuariosResponse.data)
      } catch(err) {
        alert(err.message)
      }
    },
    loguear (context, usuario) {
      context.commit('login', { usuario })
    },
    desloguear (context) {
      context.commit('logout')
    }
  }
})

export default store