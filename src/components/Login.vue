<template>
 <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        
      >
     
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Ingresar email"
          required
        ></b-form-input>
        
      </b-form-group>
          <br>
      <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
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
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }},
    methods: {
      onSubmit(event) {
        event.preventDefault()
        this.loguear()
      },
      async loguear() {
        const usuarioResponse = await axios.get(`${ this.$store.state.url }/usuarios?email=${ this.form.email }&password=${ this.form.password }`)
        if(usuarioResponse.status >= 200 || usuarioResponse.status < 300) {
          this.$store.dispatch('loguear', usuarioResponse.data[0])
        } else {
          alert('Credenciales incorrectas.')
        }
      }
    }
};
</script>