<template>
  <div>
    <b-img :src= "this.actividad.imagen" v-bind="imgProps" fluid alt="Imagen actividad"></b-img>
    <h1>{{this.actividad.nombre}}</h1>
    <h3>{{this.actividad.descripcion}}</h3>

    <div>
      <b-button class="m-1" @click="navegarHaciaView(`agregarTurno/${ idActividad }`)" variant="success">Agregar Turno</b-button>
    </div>

    <ListaTurnos :idActividad="idActividad"/>

  </div>
</template>

<script>
import axios from 'axios';
import ListaTurnos from './ListaTurnos.vue'

export default {
  name: "Actividad",
  data:()=>({
    idActividad: -1,
    actividad: {},
    imgProps: { width: 320, height: 240 }
  }),
  components: {
    ListaTurnos
  },
  methods:{
    async getActividad(){
      try {
        const actividadResponse = await axios.get(`${ this.$store.state.url }/actividades/${this.idActividad}`)
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
    this.idActividad = this.$route.params.id ? this.$route.params.id : -1
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
