<template>
  <div>
    <div v-if="hayUsuario">
      <Calendar />
    </div>
    <div class="w-30 p-3 mx-auto" v-if="!hayUsuario">
      <Registro />
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import Registro from "./Registro.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Registro
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario
    }
  }
}
</script>