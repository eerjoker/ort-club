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

        <b-button variant="success" v-if="actividadId == -1" @click="agregarActividad()">Agregar</b-button>
        <b-button class="m-1" v-if="actividadId != -1" @click="modificarActividad()">Modificar</b-button>
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
    opcionesTipos: []
  }),
  methods: {
    async agregarActividad(){
      console.log(this.actividad)
      await axios.post(`${ this.$store.state.url }/actividades`, this.actividad)
    },
    async modificarActividad() {
      console.log(this.actividad);
      await axios.put(`${ this.$store.state.url }/actividades/${this.actividadId}`, this.actividad);
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
    async obtenerOpcionesTipos() {
      try {
        const tiposResponse = await axios.get(
          `${ this.$store.state.url }/tiposActividad`
        );
        if (tiposResponse.status < 200 || tiposResponse.status >= 300) {
          throw new Error(
            "Error al cargar los tipos de actividad: " + tiposResponse.statusText
          );
        }
        for (const tipo of tiposResponse.data) {
          this.opcionesTipos.push({
            value: tipo.id,
            text: tipo.nombre,
          })
        }
      } catch (err) {
        alert(err.message);
      }

    }
  },
  async created() {
    this.actividadId = this.$route.params.id;
    if (this.actividadId > -1) {
      await this.obtenerActividad()
    }
    await this.obtenerOpcionesTipos()
  },
};
</script>

<style></style>
