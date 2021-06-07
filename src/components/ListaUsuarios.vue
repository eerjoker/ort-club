<template>
  <ul>
      <li v-for="(actividad, index) in $store.getters.getActividadesPorTipo(tipo)" :key="index">
         {{actividad.nombre}} 
      </li>
  </ul>
</template>

<script>
export default {
  data() {
    
  },
  computed: {
    
  },
};
</script>

<style>

</style>