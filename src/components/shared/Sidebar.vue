<template>
  <b-sidebar id="sidebar" sidebar-class="p-3" title="OrtClub" :visible="true" shadow>
    <div>
      <div v-if="!hayUsuario">
        <Login />
      </div>
        <div v-if="hayUsuario">
        <router-link to="/" class="nav-link">Home</router-link>
      </div>
      <div  v-if="hayUsuario && !esSocio">
        <router-link to="/listaUsuarios" class="nav-link">Usuarios</router-link>
      </div>
      <div v-if="hayUsuario && !esSocio">
        <router-link to="/listaTurnos" class="nav-link">Turnos</router-link>
      </div>
      <div v-if="hayUsuario">
        <router-link to="/actividades" class="nav-link">Actividades:</router-link>
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
    },
    esSocio(){
      return this.$store.getters.usuarioActualTipo == "socio"
    }
  }
}
</script>

<style>

</style>