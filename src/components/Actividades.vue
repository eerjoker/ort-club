<template>
  <div id="Actividades">
    <input type="text" v-model="buscador" placeholder="Buscador de reservas"> 
    <h1 v-if="vieneDeTipo">Actividades de {{ nombreTipo }} </h1>
    <b-button v-if="esEmpleado" class="m-1" @click="navegarHaciaView(`agregarEditarActividad/${ -1 }`)" variant="success">Agregar Actividad</b-button>

    <ul class="list-unstyled mx-auto w-50">
      <li v-for="actividad in setActividadesBuscador" :key="actividad.id" class="border">
        <div class="d-flex justify-content-between m-1 p-1">
          <button class="btn btn-link" @click="navegarHaciaView(`actividad/${ actividad.id }`)"> {{actividad.nombre}} </button>
          <div v-if="esEmpleado">
            <b-button class="m-1" @click="navegarHaciaView(`agregarEditarActividad/${actividad.id}`)">Modificar</b-button>
            <b-button class="m-1" variant="danger" @click="eliminarActividad(actividad.id)">Eliminar</b-button>
          </div>         
        </div>
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
    actividades: [],
    buscador:''
  }),
  methods:{
    navegarHaciaView(view){
      let miRuta = `/${view}`
      this.$router.push(miRuta)
    },
    async eliminarActividad(idActividad){
      if(confirm("¿Esta seguro que desea eliminar esta actividad?")){
        await axios.delete(`${ this.$store.state.url }/actividades/${ idActividad }`)
        this.navegarHaciaView('actividades')
      }
    },
    async getActividades() {
      try {
        let url;
        if (this.vieneDeTipo) {
          url = `${ this.$store.state.url }/actividades?idTipo=${ this.idTipo }`
        } else {
          url = `${ this.$store.state.url }/actividades`
        }
        const actividadesResponse = await axios.get(url)
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
    setActividadesBuscador(){
      return this.actividades.filter((actividad)=>{
        return actividad.nombre.match(this.buscador)
      })
    },
    esEmpleado () {
      return this.$store.getters.usuarioActualTipo == "admin" || this.$store.getters.usuarioActualTipo == "empleado"
    }
  },
  async created() {
    this.idTipo = this.$route.params.id ? this.$route.params.id : -1
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