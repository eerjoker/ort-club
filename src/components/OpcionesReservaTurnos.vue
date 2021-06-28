<template>
  <div class="d-flex w-40 mx-auto">
    <b-button variant="success" v-if="!reserva" @click="agregarReserva()">Reservar</b-button>
    <b-button class="m-1" v-if="reserva" @click="cancelarReserva()">Cancelar Reserva</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OpcionesReservaTurnos",
  data: () => ({
    reserva: null,
    turnoActual: {}
  }),
  props: ["idTurno"],
  computed: {
    idUsuario () {
      return this.$store.getters.usuarioActualId
    },
    hayReserva () {
      return this.reserva != null && typeof(this.reserva) != 'undefined'
    }
  },
  methods: {
    async agregarReserva(){
      this.reserva = {
        idUsuario: this.idUsuario,
        idActividad: this.turno.idActividad,
        idTurno: this.idTurno,
        fechaHora: this.turno.fecha
      }
      await axios.post(`${ this.$store.state.url }/reservas`, this.reserva)
    },
    async cancelarReserva() {
      await axios.delete(`${ this.$store.state.url }/reservas/${this.reserva.id}`);
      this.reserva = null
      alert('Reserva cancelada')
    },
    async obtenerTurnoActual() {
      try {
        const turnosResponse = await axios.get(
          `${ this.$store.state.urlTurnos }/turnos/${ this.idTurno }`
        );
        if (turnosResponse.status < 200 || turnosResponse.status >= 400) {
          throw new Error(
            "Error al cargar el turno: " + turnosResponse.statusText
          );
        }
        this.turnoActual = turnosResponse.data;
      } catch (err) {
        alert(err.message);
      }
    },
    async obtenerReservaSiExiste() {
      try {
        const reservasResponse = await axios.get(
          `${ this.$store.state.url }/reservas?idTurno=${ this.idTurno }&idUsuario=${ this.idUsuario }`
        );
        if (reservasResponse.status < 200 || reservasResponse.status >= 500) {
          throw new Error(
            "Error al cargar la reserva: " + reservasResponse.statusText
          );
        }
        if(reservasResponse.status < 300 && reservasResponse.data[0]) {
          this.reserva = reservasResponse.data[0];
        }
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
    await this.obtenerTurnoActual()
    await this.obtenerReservaSiExiste()
  },
};
</script>

<style></style>
