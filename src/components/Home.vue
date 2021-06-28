<template>
  <div class="container">
    <div v-if="hayUsuario && esSocio">
      <HomeReservas />
    </div>
    <div v-if="hayUsuario && !esSocio">
      <Estadisticas/>
    </div>
    <div class="w-30 p-3 mx-auto" v-if="!hayUsuario">
      <Registro />
    </div>
  </div>
</template>

<script>
import HomeReservas from "./HomeReservas.vue";
import Registro from "./Registro.vue";
import Estadisticas from "./Estadisticas.vue"

export default {
  name: "Home",
  components: {
    HomeReservas,
    Registro,
    Estadisticas
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario;
    },
    esSocio(){
      return this.$store.getters.usuarioActualTipo == "socio"

    }
  },
};
</script>
