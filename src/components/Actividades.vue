<template>
  <div id="Actividades">
    <h1 v-if="vieneDeTipo">Actividades de {{ nombreTipo }} </h1>
    <b-button class="m-1" @click="navegarHaciaView(`agregarEditarActividad/${ -1 }`)" variant="success">Agregar Actividad</b-button>
    
    <ul>
      <li v-for="actividad in actividades" :key="actividad.id">
         <button class="btn btn-link" @click="navegarHaciaView(`actividad/${ actividad.id }`)"> {{actividad.nombre}} </button>
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
    navegarHaciaView(view){
      let miRuta = `/${view}`
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
    vieneDeTipo () {
      return this.idTipo > -1
    },
    nombreTipo() {
      if (this.vieneDeTipo) {
        return this.$store.getters.nombreTipoActividad(this.idTipo)
      } else {
        return ""
      }
    },
  },
  async created() {
    this.idTipo = this.$route.params.id
    await this.getNombreTipo()
    await this.getActividades()
    this.$watch(
      () => this.$route.params,
      toParams => {
        // react to route changes...
        this.nombreTipo = ""
        this.actividades = []
        this.idTipo = toParams.id
        this.getNombreTipo()
        this.getActividades()
      }
    )
  }
}
</script>

<style>

</style>