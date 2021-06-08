<template>
  <b-sidebar id="sidebar" sidebar-class="p-3" title="OrtClub" shadow>
    <div>
      <div v-if="!hayUsuario">
        <Sesion />
      </div>
      <div v-if="hayUsuario">
        <router-link to="/listaUsuarios" class="nav-link">Usuarios</router-link>
      </div>
      <div v-if="hayUsuario">
        <ListadoActividades />
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import Sesion from '../Sesion.vue';
import ListadoActividades from '../ListadoActividades.vue';

export default {
  name: "Sidebar",
  components: {
    Sesion,
    ListadoActividades
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