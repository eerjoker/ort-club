<template>
  <div>
    <b-img :src= "this.actividad.imagen" v-bind="imgProps" fluid alt="Imagen actividad"></b-img>
    <h1>{{this.actividad.nombre}}</h1>
    <h3>{{this.actividad.descripcion}}</h3>

    <div>
      <b-button class="m-1" @click="navegarHaciaView(`agregarTurno`)" variant="success">Agregar Turno</b-button>
    </div>

    <div>
      <b-button class="m-1" @click="navegarHaciaView(`agregarEditarActividad/${actividad.id}`)">Modificar</b-button>
      <b-button class="m-1" variant="danger" @click="eliminarActividad(actividad.id)">Eliminar</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Actividad",
  data:()=>({
    idActividad: -1,
    actividad: {},
    imgProps: { width: 320, height: 240 }
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
    },
    async eliminarActividad(){
      if(confirm("¿Esta seguro que desea eliminar esta actividad?")){
        await axios.delete(`${ this.$store.state.url }/actividades/${ this.idActividad }`)
        this.navegarHaciaView('actividades')
      }
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
