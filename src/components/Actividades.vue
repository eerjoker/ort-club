<template>
  <div id="Actividades">
    <h1>Actividades de {{ descripcionTipo }} </h1>

    <ul>
      <li v-for="actividad in actividades" :key="actividad.id">
         <button class="btn btn-link" @click="navegarHaciaView(actividad.id)"> {{actividad.nombre}} </button>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Actividades",
  data:()=>({
    idTipo: -1,
    actividades: []
  }),
  methods:{
    navegarHaciaView(idActividad){
      let miRuta = '/actividad/' + idActividad
      this.$router.push(miRuta)
    },
    async getActividades() {
      try {
        const actividadesResponse = await axios.get(`${ this.$store.state.url }/actividades?idTipo=${ this.idTipo }`)
        if(actividadesResponse.status < 200 || actividadesResponse.status >= 300) {
          throw new Error('Error al cargar las actividades: ' + actividadesResponse.statusText)
        }
        console.log(actividadesResponse.data);
        this.actividades = actividadesResponse.data
      } catch(err) {
        alert(err.message)
      }
    }
  },
  computed: {
    descripcionTipo () {
      if(this.idTipo) {
        return this.$store.getters.nombreTipoActividad(this.idTipo)
      } else {
        return ""
      }
    }
  },
  async created() {
    this.idTipo = this.$route.params.id
    await this.getActividades()
    this.$watch(
      () => this.$route.params,
      toParams => {
        // react to route changes...
        this.actividades = []
        this.idTipo = toParams.id
        this.getActividades()
      }
    )
  }
}
</script>

<style>

</style>