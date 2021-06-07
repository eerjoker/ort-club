<template>
  <div id="Actividades">
    <h1>Actividades de {{tipo}} </h1>

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
   actividades: [],
   tipo: 'Futbol'
  }),
  props: {
    //idTipo: String
  },
  created (){
    this.actividades = this.$store.getters.getActividadesPorTipo(this.tipo)
  }
  
}
</script>

<style>

</style>