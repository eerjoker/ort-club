<template>
  <div>
    <b-form>
       <b-container fluid>
      <b-form-group  
      id="group-tituloTurno"
      class="justify-content-between align-middle"
      label="Titulo del turno:"
      label-for="titulo" >
     
      <b-form-input
      id="titulo"
      v-model="turno.tituloTurno"
      type="text"
      placeholder="titulo del turno"
      required
      > </b-form-input>
      </b-form-group>
   
    <br>

      <b-form-group  
      id="group-profesor"
      class="justify-content-between align-middle"
      label="Nombre del profesor:"
      label-for="profesor" >

      <b-form-input
      id="profesor"
      v-model="turno.idProfesor"
      type="text"
      placeholder="nombre del profesor"
      required
      ></b-form-input>
      </b-form-group>

    <br>

      <b-form-group  
      id="group-fecha"
      class="justify-content-between align-middle"
      label="Fecha del turno:"
      label-for="fecha" >

      <b-form-input
      id="fecha"
      v-model="turno.fecha"
      type="date"
      placeholder="fecha del turno"
      required
      ></b-form-input>
      </b-form-group>

    <br>

      <b-form-group  
      id="group-actividad"
      class="justify-content-between align-middle"
      label="ID de la actividad:"
      label-for="actividad" >

      <b-form-input
      id="actividad"
      v-model="turno.idActividad"
      type="number"
      placeholder="id de la actividad"
      required
      ></b-form-input>
      </b-form-group>

    <br>
    
    <b-button variant="success" @click="agregarTurno()"> Agregar Turno </b-button>
    </b-container>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    turnoId: -1,
    turno: {}
  }),
  methods: {
    async agregarTurno(){
      console.log(this.turno)
      await axios.post(`${ this.$store.state.urlTurnos }/turnos`, this.turno)
      this.$router.push('/listaTurnos')
    }
  },
  async created(){
    this.turnoId = this.$route.params.id
    try {
      const turnosResponse = await axios.get(`${ this.$store.state.urlTurnos }/turnos/${this.turnoId}`)
      if(turnosResponse.status < 200 || turnosResponse.status >= 300) {
        throw new Error('Error al cargar los turnos: ' + turnosResponse.statusText)
      }
      this.turno = turnosResponse.data
    } catch(err) {
     // alert(err.message)
    }
  }
};
</script>

<style>

</style>