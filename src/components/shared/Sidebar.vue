<template>
  <b-sidebar id="sidebar" sidebar-class="p-3" title="OrtClub" shadow>
    <div>
      <div v-if="!hayUsuario">
        <Sesion />
      </div>
      <div v-if="hayUsuario">
        <ListadoTiposActividad />
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import Sesion from '../Sesion.vue';
import ListadoTiposActividad from '../ListadoTiposActividad.vue';

export default {
  name: "Sidebar",
  components: {
    Sesion,
    ListadoTiposActividad
  },
  computed: {
    hayUsuario () {
      return this.$store.getters.hayUsuario
    }
  }
}
</script>

<style>

</style>