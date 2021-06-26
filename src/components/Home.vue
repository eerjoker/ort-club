<template>
  <div>
    <div v-if="hayUsuario">
      <HomeReservas />
    </div>

    <div class="w-30 p-3 mx-auto" v-if="!hayUsuario">
      <Registro />
    </div>
  </div>
</template>

<script>
import HomeReservas from "./HomeReservas.vue";
import Registro from "./Registro.vue";

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
    HomeReservas,
    Registro,
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario;
    },
  },
};
</script>
