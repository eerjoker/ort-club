<template>
  <div id="Actividades">
    <h1>Actividades de {{tipo}} </h1>

    <ul>
      <li v-for="(actividad, index) in $store.getters.getActividadesPorTipo(tipo)" :key="index">
         {{actividad.nombre}} 
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Actividades",
  data:()=>({
   actividades: [{nombre:'hola'}],
   tipo: 'Futbol'
  }),
  props: {
    //idTipo: String
  },
  // created (){
    
  //     this.actividades = this.$store.getters.getActividadesPorTipo(this.tipo)
  //     alert(this.actividades[0])    
  //   }
  
}
</script>

<style>

</style>