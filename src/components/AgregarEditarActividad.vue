<template>
  <div class="w-40 mx-auto">
    <b-form>
      <b-container fluid>
        <b-form-group
          id="group-nombre"
          class="justify-content-between align-middle"
          label="Nombre:"
          label-for="nombre"
        >
          <b-form-input
            id="nombre"
            v-model="actividad.nombre"
            type="text"
            placeholder="Nombre de la actividad"
            required
          >
          </b-form-input>
        </b-form-group>

        <br />

        <b-form-group
          id="group-descripcion"
          class="justify-content-between align-middle"
          label="Descripción:"
          label-for="descripcion"
        >
          <b-form-textarea
            id="descripcion"
            v-model="actividad.descripcion"
            type="text"
            placeholder="descripcion"
            required
          ></b-form-textarea>
        </b-form-group>

        <br />

        <b-form-group
          id="group-tipo"
          class="justify-content-between align-middle"
          label="Tipo de actividad:"
          label-for="tipo"
        >
          <b-form-select
            id="tipo"
            v-model="actividad.idTipo"
            :options="opcionesTipos"
            required
          ></b-form-select>
        </b-form-group>

        <b-button variant="success" v-if="!esEditar" @click="agregarActividad()">Agregar</b-button>
        <b-button class="m-1" v-if="esEditar" @click="modificarActividad()">Modificar</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AgregarEditarActividad",
  data: () => ({
    actividadId: -1,
    actividad: {},
    opcionesTipos: [{
      value: null,
      text: 'Elija un tipo'
    }]
  }),
  computed: {
    esEditar () {
      return this.actividadId > -1
    }
  },
  methods: {
    navegarHaciaActividad(idActividad){
      let miRuta = `/actividad/${idActividad}`
      this.$router.push(miRuta)
    },
    async agregarActividad(){
      console.log(this.actividad)
      const nuevaActividad = await axios.post(`${ this.$store.state.url }/actividades`, this.actividad)
      this.navegarHaciaView(nuevaActividad.id)
    },
    async modificarActividad() {
      console.log(this.actividad);
      await axios.put(`${ this.$store.state.url }/actividades/${this.actividadId}`, this.actividad);
      this.navegarHaciaView(this.actividadId)
    },
    async obtenerActividad() {
      try {
        const actividadesResponse = await axios.get(
          `${ this.$store.state.url }/actividades/${ this.actividadId }`
        );
        if (actividadesResponse.status < 200 || actividadesResponse.status >= 300) {
          throw new Error(
            "Error al cargar las actividades: " + actividadesResponse.statusText
          );
        }
        this.actividad = actividadesResponse.data;
      } catch (err) {
        alert(err.message);
      }
    },
    obtenerOpcionesTipos() {
      const tipos = this.$store.getters.getTiposActividad
      for (const tipo of tipos) {
        this.opcionesTipos.push({
          value: tipo.id,
          text: tipo.nombre
        })
      }
    }
  },
  async created() {
    this.actividadId = this.$route.params.id ? this.$route.params.id : -1
    if (this.esEditar) {
      await this.obtenerActividad()
    }
    this.obtenerOpcionesTipos()
  },
};
</script>

<style></style>
