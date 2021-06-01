<template>
 <div>
    <b-form @submit="onSubmit" v-if="show">
    
      <b-form-group
        id="input-group-1"
        label="Nombre:"
        label-for="input-1"
      >
     
        <b-form-input
          id="input-1"
          v-model="form.nombre"
          type="text"
          placeholder="Ingresar nombre"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>

          <b-form-group
        id="input-group-2"
        label="Apellido:"
        label-for="input-2"
      >
     
        <b-form-input
          id="input-2"
          v-model="form.apellido"
          type="text"
          placeholder="Ingresar apellido"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>
    
    <b-form-group
        id="input-group-3"
        label="DNI:"
        label-for="input-3"
      >
     
        <b-form-input
          id="input-3"
          v-model="form.dni"
          type="number"
          placeholder="Ingresar DNI"
          required
        ></b-form-input>
        
      </b-form-group>

          <br>

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
          v-model="form.name"
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
export default {
  name: "Registro",
 data() {
      return {
        form: {
          email: '',
          nombre: '',
          apellido: '',
          password:'',
          dni:''          
        },
        show: true
      }},
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
     
    }
};
</script>

<style>

</style>