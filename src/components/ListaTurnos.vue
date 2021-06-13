
<template>
<div class="container">
  <ul class="list-unstyled mx-auto w-50">
       <h1>Listado de Turnos</h1>
       <div>
            <b-button class="m-1" variant="success" @click="navegarHaciaView('agregarTurno')">Agregar Turno</b-button>
            <input type="text" v-model="buscador" placeholder="Buscador de turnos">
       </div>
      <li v-for="turno in turnosFiltrados" :key="turno.id" class="border">
        <div class="d-flex justify-content-between m-1 p-1">
          <p class="my-auto">{{turno.tituloTurno}}</p>
          <div>
            <b-button class="m-1" @click="navegarHaciaView(`editarTurno/${turno.id}`)">Modificar</b-button>
            <b-button class="m-1" variant="danger" @click="eliminarTurno(turno.id)">Eliminar</b-button>
          </div>         
        </div>
         
      </li>
  </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data:()=>({
        turnos: [],
        buscador:''
    }),
    methods:{
    navegarHaciaView(view){
      let miRuta = `/${view}`
      this.$router.push(miRuta)
    },
    async eliminarTurno(turnoId){
     if(confirm("¿Esta seguro que desea eliminar este turno?")){
       this.turnos.splice(turnoId-1, 1)
        await axios.delete(`${ this.$store.state.urlTurnos }/turnos/${ turnoId }`)
      }
    }
        },
    computed:{
        turnosFiltrados: function(){
            return this.turnos.filter((turno)=>{
                return turno.tituloTurno.match(this.buscador)
            })
        }
    },
    async created() {
        try {
      const turnosResponse = await axios.get(`${ this.$store.state.urlTurnos }/turnos`)
      if(turnosResponse.status < 200 || turnosResponse.status >= 300) {
        throw new Error('Error al cargar los turnos: ' + turnosResponse.statusText)
      }
      this.turnos = turnosResponse.data
    } catch(err) {
      alert(err.message)
    }
    },
}
</script>

<style>

</style>