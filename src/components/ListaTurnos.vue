
<template>
<div class="container">
  <ul class="list-unstyled mx-auto w-50">
       <h1 v-if="!vieneDeActividad">Listado de Turnos</h1>
       <div v-if="!vieneDeActividad">
            <b-button class="m-1" variant="success" @click="navegarHaciaView('agregarTurno')">Agregar Turno</b-button>
            <input type="text" v-model="buscador" placeholder="Buscador de turnos">
       </div>
      
      <li v-for="turno in turnosFiltrados" :key="turno.id" class="border">
        <div class="d-flex justify-content-between m-1 p-1">
          <div>
            <p class="my-auto">{{turno.fecha}}</p>
            <small>Profesor: {{turno.profesor}}</small>
          </div>
          <div v-if="esEmpleado">
            <b-button class="m-1" @click="navegarHaciaView(`editarTurno/${turno.id}`)">Modificar</b-button>
            <b-button class="m-1" variant="danger" @click="eliminarTurno(turno.id)">Eliminar</b-button>
          </div>
          <OpcionesReservaTurnos :idTurno="turno.id" v-if="esSocio"/>
        </div>
      </li>
  
  </ul>
  </div>
</template>

<script>
import axios from 'axios';
import OpcionesReservaTurnos from './OpcionesReservaTurnos.vue'

export default {
    data:()=>({
        turnos: [],
        buscador:''
    }),
    components: {
      OpcionesReservaTurnos
    },
    props: {
      idActividad: {
        default: -1
      }
    },
    methods:{
      navegarHaciaView(view){
        let miRuta = `/${view}`
        this.$router.push(miRuta)
      },
      async getTurnos() {
        try {
          let url
          if (this.vieneDeActividad) {
            url = `${ this.$store.state.urlTurnos }/turnos?idActividad=${ this.idActividad }`
          } else {
            url = `${ this.$store.state.urlTurnos }/turnos`
          }
          const turnosResponse = await axios.get(url)
          if(turnosResponse.status < 200 || turnosResponse.status >= 300) {
            throw new Error('Error al cargar los turnos: ' + turnosResponse.statusText)
          }
          this.turnos = turnosResponse.data
        } catch(err) {
          alert(err.message)
        }
      },
      async eliminarTurno(turnoId){
      if(confirm("¿Esta seguro que desea eliminar este turno?")){
        this.turnos.splice(turnoId-1, 1)
          await axios.delete(`${ this.$store.state.urlTurnos }/turnos/${ turnoId }`)
        }
      },
      ordenarTurnosPorFecha(){
        this.turnos.sort(function (a, b) {
          var dateA = new Date(a.fecha), dateB = new Date(b.fecha)
          return dateA - dateB
        });
        this.turnos = this.turnos.filter((turno) => new Date(turno.fecha) > new Date())
      }
    },
    computed:{
      esEmpleado () {
        return this.$store.getters.usuarioActualTipo == "admin" || this.$store.getters.usuarioActualTipo == "empleado"
      },
      esSocio () {
        return this.$store.getters.usuarioActualTipo == "socio"
      },
      turnosFiltrados: function(){
          return this.turnos.filter((turno)=>{
              return turno.tituloTurno.match(this.buscador)
          })
      },
      vieneDeActividad () {
        return this.idActividad > -1
      }
    },
    async created() {
      await this.getTurnos()
      this.ordenarTurnosPorFecha()
    },
}
</script>

<style>

</style>