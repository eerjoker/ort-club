<template>
  <div id="Actividades">
    <h1>Actividades de {{tipo.descripcion}} </h1>

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
    tipo: {
      id: 1,
      descripcion: 'Futbol'
    }
  }),
  methods:{
    navegarHaciaView(idActividad){
      let miRuta = '/actividad/' + idActividad
      this.$router.push(miRuta)
    }
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