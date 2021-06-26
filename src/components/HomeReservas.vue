<template>
  <div>
    <div v-if="hayUsuario">
      <Calendar :reservasFinal="reservasFinal" />
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import axios from "axios";

export default {
  data() {
    return {
      reservas: [],
      actividades: [],
      reservasFinal: [],
    };
  },
  name: "Home",
  components: {
    Calendar,
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario;
    },
    usuarioActualId() {
      return this.$store.getters.usuarioActualId;
    },
    usuarioActualTipo() {
      return this.$store.getters.usuarioActualTipo;
    },
  },
  async created() {
    await this.getReservas();
    await this.getActividades();
    this.setReservaFinal();
  },
  methods: {
    async getReservas() {
      try {
        const reservasResponse = await axios.get(
          `${this.$store.state.url}/reservas`
        );
        if (reservasResponse.status < 200 || reservasResponse.status >= 300) {
          throw new Error(
            "Error al cargar los usuarios: " + reservasResponse.statusText
          );
        }
        this.reservas = this.reservasFiltradas(reservasResponse.data);
      } catch (err) {
        alert(err.message);
      }
    },
    async getActividades() {
      try {
        const actividadesResponse = await axios.get(
          `${this.$store.state.url}/actividades`
        );
        if (
          actividadesResponse.status < 200 ||
          actividadesResponse.status >= 300
        ) {
          throw new Error(
            "Error al cargar los usuarios: " + actividadesResponse.statusText
          );
        }
        this.actividades = actividadesResponse.data;
      } catch (err) {
        alert(err.message);
      }
    },
    reservasFiltradas(reservas) {
      if (this.usuarioActualTipo != "socio" && this.hayUsuario) {
        return reservas;
      } else {
        return reservas.filter((r) => r.idUsuario == this.usuarioActualId);
      }
    },
    getNombreActividad(idActividad) {
      let actividad = this.actividades.find(
        (act) => parseInt(act.id) == idActividad
      );
      if (actividad) {
        return actividad.nombre;
      } else {
        return "Actividad no encontrada";
      }
    },
    async setReservaFinal() {
      for (let reserva of this.reservas) {
        this.reservasFinal.push({
          nombre: this.getNombreActividad(reserva.idActividad),
          fecha: reserva.fechaHora,
        });
      }
    },
  },
};
</script>
