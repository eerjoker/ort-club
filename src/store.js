import Vue from "vue";
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: 'https://60bd1820b8ab3700175a020d.mockapi.io/api/',
    usuarioActual: null,
    usuarios: [],
    actividades:[],
    tiposActividad: [
      {
        id: 1,
        descripcion: 'Futbol'
      },
      {
        id: 2,
        descripcion: 'Basquet'
      },
      {
        id: 3,
        descripcion: 'Yoga'
      },
      {
        id: 4,
        descripcion: 'Crossfit'
      },
      {
        id: 5,
        descripcion: 'Natación'
      },
      {
        id: 6,
        descripcion: 'Tenis'
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
      return state.usuarios.find(u => u.email == email && u.password == password)
    },
    hayUsuario: (state) => {
      return state.usuarioActual != null
    },
    getUsuarios: (state) => {
      return state.usuarios
    },
    getActividades: (state) => {
      return state.actividades
    },
    getActividadesPorTipo: (state) => (idTipo) => {
      return state.actividades.filter(act => act.idTipo == idTipo)
    },
    getTiposActividad: (state) => {
      return state.tiposActividad
    }
  },
  mutations: {
    setUsuarios (state, usuarios) {
      state.usuarios = usuarios
    },
    setActividades (state, actividades) {
      state.actividades = actividades
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
    async setActividades (context) {
      try {
        const actividadesResponse = await axios.get(`${ context.state.actividades }/actividades`)
        if(actividadesResponse.status != 200) {
          throw new Error('Actividades: ' + actividadesResponse.statusText)
        }
        context.commit('setActividades', actividadesResponse.data)
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