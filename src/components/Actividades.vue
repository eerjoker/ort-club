<template>
  <div id="Actividades">
    <h1>Actividades de {{tipo.descripcion}} </h1>

    <ul>
      <li v-for="actividad in actividades" :key="actividad.id">
         {{actividad.nombre}} 
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Actividades",
  data:()=>({
    tipo: {
      id: 1,
      descripcion: 'Futbol'
    }
  }),
  props: {
    //idTipo: String
  },
  computed: {
    actividades() {
      return this.$store.getters.getActividadesPorTipo(this.tipo.id)
    }
  }
}
</script>

<style>

</style>