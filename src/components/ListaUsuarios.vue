<template>
  <ul class="list-unstyled mx-auto w-50">
      <li v-for="(usuario, id) in usuarios" :key="id" class="border">
        <div class="d-flex justify-content-between m-1 p-1">
          <p class="my-auto">{{usuario.nombre}}</p>
          <div>
            <b-button class="m-1">Modificar</b-button>
            <b-button class="m-1" variant="danger" @click="eliminarUsuario(usuario)">Eliminar</b-button>
          </div>         
        </div>
         
      </li>
  </ul>
</template>

<script>
export default {
  data:()=>({
   usuarios: []
  }),
  created(){
    this.usuarios = this.$store.getters.getUsuarios
  },
  methods: {
    eliminarUsuario(usuario){
      if(confirm("Esta seguro que desea eliminar este usuario")){
        for (let index = 0; index < this.usuarios.length; index++) {
          const element = this.usuarios[index];
          if(element == usuario){
            this.usuarios.splice(index, 1)
          }
        }
      }
    }
  },
};
</script>

<style>

</style>