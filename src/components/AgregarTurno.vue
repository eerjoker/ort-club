<template>
  <div class="w-40 mx-auto">
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
      v-model="turno.profesor"
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

      <b-form-select
      id="actividad"
      v-model="turno.idActividad"
      :options="opcionesActividades"
      required
      ></b-form-select>
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
    idActividad: -1,
    turno: {},
    opcionesActividades: []
  }),
  computed: {
    vieneDeActividad () {
      return this.idActividad > -1
    }
  },
  methods: {
    async agregarTurno(){
      console.log(this.turno)
      await axios.post(`${ this.$store.state.urlTurnos }/turnos`, this.turno)
      this.$router.push('/listaTurnos')
    },
    async getActividadOrigen() {
      try {
        const actividadResponse = await axios.get(`${ this.$store.state.url }/actividades/${ this.idActividad }`)
        if (actividadResponse.status < 200 || actividadResponse.status >= 300) {
          throw new Error(
            "Error al cargar la actividad de origen: " + actividadResponse.statusText
          );
        }
        console.log(actividadResponse.data);
        if (actividadResponse.data) {
          this.opcionesActividades.push({
            value: actividadResponse.data.id,
            text: actividadResponse.data.nombre
          })
        }
      } catch (err) {
        alert(err.message);
      }
    },
    async getOpcionesActividades() {
      try {
        const actividadesResponse = await axios.get(`${ this.$store.state.url }/actividades`)
        if (actividadesResponse.status < 200 || actividadesResponse.status >= 300) {
          throw new Error(
            "Error al cargar las actividades: " + actividadesResponse.statusText
          );
        }
        this.opcionesActividades.push({
          value: -1,
          text: 'Elija una actividad'
        })
        for (const actividad of actividadesResponse.data) {
          this.opcionesActividades.push({
            value: actividad.id,
            text: actividad.nombre
          })
        }
      } catch (err) {
        alert(err.message);
      }
    }
  },
  async created() {
    this.idActividad = this.$route.params.id ? this.$route.params.id : -1
    console.log(this.idActividad)
    if (this.vieneDeActividad) {
      await this.getActividadOrigen()
    } else {
      await this.getOpcionesActividades()
    }
    this.$watch(
      () => this.$route.params,
      async (toParams) => {
        // react to route changes...
        this.opcionesActividades = []
        this.idActividad = toParams.id
        if (this.vieneDeActividad) {
          await this.getActividadOrigen()
        } else {
          await this.getOpcionesActividades()
        }
      }
    )
  }
};
</script>

<style>

</style>