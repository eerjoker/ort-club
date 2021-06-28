<template>
  <div>
    <b-form-input style="width: 70%"
      id="input-1"
      v-model="usuario.nombre"
      type="text"
    ></b-form-input>
    <br>
    <b-form-input
      id="input-2"
      v-model="usuario.email"
      type="text"
    ></b-form-input>
    <br>
    <b-form-input
      id="input-3"
      v-model="usuario.password"
      type="text"
    ></b-form-input>
    <br>
    <b-form-input
      id="input-4"
      v-model="usuario.tipoUsuario"
      type="text"
    ></b-form-input>
    <button class="m-1" @click="modificarUsuario()"> Aplicar cambios </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    userId: -1,
    usuario: {}
  }),
  methods: {
    async modificarUsuario(){
      console.log(this.usuario)
      await axios.put(`${ this.$store.state.url }/usuarios/${this.userId}`, this.usuario)
      this.$router.push('/listaUsuarios')
    }
  },
  async created(){
    this.userId = this.$route.params.id ? this.$route.params.id : -1
    try {
      const usuariosResponse = await axios.get(`${ this.$store.state.url }/usuarios/${this.userId}`)
      if(usuariosResponse.status < 200 || usuariosResponse.status >= 300) {
        throw new Error('Error al cargar los usuarios: ' + usuariosResponse.statusText)
      }
      this.usuario = usuariosResponse.data
    } catch(err) {
      alert(err.message)
    }
  }
};
</script>

<style>

</style>