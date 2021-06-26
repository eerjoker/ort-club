<template>
  <div>
    <b-img :src= "this.actividad.imagen" fluid alt="Fluid image"></b-img>
    <h1>{{this.actividad.nombre}}</h1>
    <h3>{{this.actividad.descripcion}}</h3>

    <div>
      <b-button class="m-1" @click="navegarHaciaView(`agregarTurno`)" variant="success">Agregar Turno</b-button>
    </div>

   <div>
            <b-button class="m-1" variant="success">Reservar Turno</b-button>
            <b-button class="m-1" variant="warning">Modificar Turno</b-button>
            <b-button class="m-1" variant="danger">Cancelar Turno</b-button>
   </div> 
  </div>
</template>

<script>
import axios from 'axios';
export default {
name: "Actividad",
data:()=>({
    idActividad: -1,
    actividad: {}
  }),
methods:{
  async getActividad(){
    try {
      const actividadResponse = await axios.get(`${ this.$store.state.url }/actividades/${this.$route.params.id}`)
      this.actividad = actividadResponse.data
    } catch (error) {
      alert(error.message)
    }
  },
  navegarHaciaView(view){
      let miRuta = `/${view}`
      this.$router.push(miRuta)
    }
},
async created() {
    this.idActividad = this.$route.params.id
    await this.getActividad()
    this.$watch(
      () => this.$route.params,
      toParams => {
        // react to route changes...
        this.actividad = {}
        this.idActividad = toParams.id
        this.getActividad()
      }
    )
  }
}
</script>
