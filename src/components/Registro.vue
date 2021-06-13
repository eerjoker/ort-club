<template>
 <div>
    <b-form  @submit="onSubmit" v-if="show">
    
      <b-form-group
        id="group-nombre"
        class="d-flex justify-content-between align-middle"
        label="Nombre:"
        label-for="nombre"
      >
     
        <b-form-input
          id="nombre"
          v-model="usuario.nombre"
          type="text"
          placeholder="Ingresar nombre"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>

          <b-form-group
        id="group-apellido"
        class="d-flex justify-content-between align-middle"
        label="Apellido:"
        label-for="apellido"
      >
     
        <b-form-input
          id="apellido"
          v-model="usuario.apellido"
          type="text"
          placeholder="Ingresar apellido"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>
    
    <b-form-group
        id="group-dni"
        class="d-flex justify-content-between align-middle"
        label="DNI:"
        label-for="dni"
      >
     
        <b-form-input
          id="dni"
          v-model="usuario.dni"
          type="text"
          placeholder="Ingresar DNI"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>

      <b-form-group
        id="group-email"
        class="d-flex justify-content-between align-middle"
        label="Email:"
        label-for="email"
      >
     
        <b-form-input
          id="email"
          v-model="usuario.email"
          type="email"
          placeholder="Ingresar email"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>

      <b-form-group id="group-password" class="d-flex justify-content-between align-middle" label="Contraseña:" label-for="password">
        <b-form-input
          id="password"
          v-model="usuario.password"
          type="password"
          placeholder="Ingresar contraseña"
          required
        ></b-form-input>
      </b-form-group>

      <br>

      <b-button type="submit" variant="primary">Enviar</b-button>
    </b-form>
  
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "Registro",
 data() {
      return {
        // form: {
        //   email: '',
        //   nombre: '',
        //   apellido: '',
        //   password:'',
        //   dni:''          
        // },
        usuarioId: -1,
        usuario: {},
        show: true
      }},
    methods: {
     onSubmit(event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
        this.agregarTurno()
      
      },
      async agregarTurno(){
      console.log(this.turno)
      await axios.post(`${ this.$store.state.url }/usuarios`, this.usuario)
     // this.$router.push('/listaActividades')
    }
     
    },
  //   async created(){
  //   this.usuarioId = this.$route.params.id
  //   try {
  //     const usuariosResponse = await axios.get(`${ this.$store.state.url }/usuarios/${this.turnoId}`)
  //     if(usuariosResponse.status < 200 || usuariosResponse.status >= 300) {
  //       throw new Error('Error al cargar los usuarios: ' + usuariosResponse.statusText)
  //     }
  //     this.turno = usuariosResponse.data
  //   } catch(err) {
  //     alert(err.message)
  //   }
  // }
};
</script>

<style>

</style>