<template>
  <div>
    <ul class="list-unstyled ps-0 mt-2" v-for="tipo in tiposActividad" :key="tipo.id">
      <li class="mb-1" >
        <router-link :to="'/actividades/' + tipo.id" class="link-dark">- {{ tipo.nombre }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    tiposActividad () {
      return this.$store.getters.getTiposActividad
    }
  },
  created() {
    this.$store.dispatch('actualizarTiposActividad')
  }
}
</script>