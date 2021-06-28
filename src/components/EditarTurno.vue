<template>
  <div class="w-40 mx-auto">
    <b-form>
      <b-container fluid>
        <b-form-group
          id="group-tituloTurno"
          class="justify-content-between align-middle"
          label="Titulo del turno:"
          label-for="titulo"
        >
          <b-form-input
            id="titulo"
            v-model="turno.tituloTurno"
            type="text"
            placeholder="titulo del turno"
            required
          >
          </b-form-input>
        </b-form-group>

        <br />

        <b-form-group
          id="group-profesor"
          class="justify-content-between align-middle"
          label="Nombre del profesor:"
          label-for="profesor"
        >
          <b-form-input
            id="profesor"
            v-model="turno.profesor"
            type="text"
            placeholder="nombre del profesor"
            required
          ></b-form-input>
        </b-form-group>

        <br />

        <b-form-group
          id="group-fecha"
          class="justify-content-between align-middle"
          label="Fecha del turno:"
          label-for="fecha"
        >
          <b-form-input
            id="fecha"
            v-model="turno.fecha"
            type="date"
            placeholder="fecha del turno"
            required
          ></b-form-input>
        </b-form-group>

        <br />

        <b-form-group
          id="group-actividad"
          class="justify-content-between align-middle"
          label="ID de la actividad:"
          label-for="actividad"
        >
          <b-form-select
            id="actividad"
            v-model="turno.idActividad"
            :options="opcionesActividades"
            required
          ></b-form-select>
        </b-form-group>

        <b-button class="m-1" @click="modificarTurno()">Modificar Turno</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    turnoId: -1,
    turno: {},
    opcionesActividades: [{
      value: -1,
      text: 'Elija una actividad'
    }]
  }),
  methods: {
    async modificarTurno() {
      console.log(this.turno);
      await axios.put(
        `${this.$store.state.urlTurnos}/turnos/${this.turnoId}`,
        this.turno
      );
      this.$router.push("/listaTurnos");
    },
    async getTurnos() {
      try {
        const turnosResponse = await axios.get(
          `${this.$store.state.urlTurnos}/turnos/${this.turnoId}`
        );
        if (turnosResponse.status < 200 || turnosResponse.status >= 300) {
          throw new Error(
            "Error al cargar los turnos: " + turnosResponse.statusText
          );
        }
        this.turno = turnosResponse.data;
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
    this.turnoId = this.$route.params.id ? this.$route.params.id : -1
    await this.getTurnos()
    await this.getOpcionesActividades()
  },
};
</script>

<style></style>
