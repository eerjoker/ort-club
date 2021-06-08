<template>
  <b-sidebar id="sidebar" sidebar-class="p-3" title="OrtClub" shadow>
    <div>
      <div v-if="!hayUsuario">
        <Login />
      </div>
      <div v-if="hayUsuario">
        <ListadoTiposActividad />
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import Login from "../Login.vue";
import ListadoTiposActividad from '../ListadoTiposActividad.vue';

export default {
  name: "Sidebar",
  components: {
    Login,
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