import Vue from "vue";
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: 'https://60bd1820b8ab3700175a020d.mockapi.io/api/',
    usuarioActual: null,
    usuarios: [],
    actividades:[{
      id:1,
      nombre:'Clase de futbol turno mañana',
      descripcion: 'Clases para chicos de 8 a 12 años de 10 a 11 hs',
      idTipo: 'Futbol',
      esDeporte: true
    },
    {
      id:2,
      nombre:'Clase de futbol turno tarde',
      descripcion: 'Clasespara chicos de 8 a 12 años de 16 a 17 hs',
      idTipo: 'Futbol',
      esDeporte: true
    },
    {
      id:3,
      nombre:'Clase de basquet turno mañana',
      descripcion: 'Clases chicos de 8 a 12 años de 11 a 12 hs',
      idTipo: 'Basquet',
      esDeporte: true
    },
    {
      id:4,
      nombre:'Cancha de futbol 5',
      descripcion: 'Alquier de canchas en pasto sintetico',
      idTipo: 'Futbol',
      esDeporte: true
    },
    {
      id:5,
      nombre:'Clase de basquet turno mañana',
      descripcion: 'Clases para chicos de 8 a 12 años de 17 a 18 hs',
      idTipo: 'Basquet',
      esDeporte: true
    }]
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
    getActividadesPorTipo: (state) => (tipo) => {
      debugger
      return state.actividades.filter(act => act.idTipo == tipo)
    },
    getActividades: (state) => {
      return state.actividades
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