<template>
  <div id="Actividades">
    <h1>Actividades de {{tipo}} </h1>
  
    <ul>
      <li v-for="actividad in actividades" :key="actividad.id">
         <button class="btn btn-link" @click="navegarHaciaView(actividad.id)"> {{actividad.nombre}} </button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Actividades",
  data:()=>({
   actividades: [],
   tipo: 'Basquet'
  }),
  created (){
    this.actividades = this.$store.getters.getActividadesPorTipo(this.tipo)
  },
  
  methods:{
        navegarHaciaView(idActividad){
            let miRuta = '/actividad/' + idActividad
            this.$router.push(miRuta)
        }
    }


}
</script>

<style>

</style>