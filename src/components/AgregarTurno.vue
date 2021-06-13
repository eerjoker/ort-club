<template>
  <div>
    <b-form-input style="width: 50%"
      id="input-1"
      v-model="turno.tituloTurno"
      type="text"
      placeholder="titulo del turno"
    ></b-form-input>
    <br>
    <b-form-input style="width: 50%"
      id="input-2"
      v-model="turno.idProfesor"
      type="text"
      placeholder="nombre del profesor"
    ></b-form-input>
    <br>
    <b-form-input style="width: 50%"
      id="input-3"
      v-model="turno.fecha"
      type="date"
      placeholder="fecha del turno"
    ></b-form-input>
    <b-form-input style="width: 50%"
      id="input-4"
      v-model="turno.idActividad"
      type="number"
      placeholder="ID de la actividad"
    ></b-form-input>
    <button class="m-1" @click="agregarTurno()"> Agregar Turno </button>
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
      alert(err.message)
    }
  }
};
</script>

<style>

</style>