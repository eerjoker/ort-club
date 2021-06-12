<template>
  <ul class="list-unstyled mx-auto w-50">
      <li v-for="usuario in usuarios" :key="usuario.id" class="border">
        <div class="d-flex justify-content-between m-1 p-1">
          <p class="my-auto">{{usuario.nombre}}</p>
          <div>
            <b-button class="m-1">Modificar</b-button>
            <b-button class="m-1" variant="danger" @click="eliminarUsuario(usuario.id)">Eliminar</b-button>
          </div>         
        </div>
         
      </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    usuarios: []
  }),
  methods: {
    async eliminarUsuario(userId){
      if(confirm("¿Esta seguro que desea eliminar este usuario?")){
        this.usuarios.splice(userId-1, 1)
        await axios.delete(`${ this.$store.state.url }/usuarios/${ userId }`)
      }
    }
  },
  async created () {
    try {
      const usuariosResponse = await axios.get(`${ this.$store.state.url }/usuarios`)
      if(usuariosResponse.status < 200 || usuariosResponse.status >= 300) {
        throw new Error('Error al cargar los usuarios: ' + usuariosResponse.statusText)
      }
      this.usuarios = usuariosResponse.data
    } catch(err) {
      alert(err.message)
    }
  }
};
</script>

<style>

</style>