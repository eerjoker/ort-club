<template>
  <ul>
    <li>
      <!-- ver como pasar parametros por el router -->
      <router-link to="/actividades">Deportes</router-link>
    </li>
    <li>
      <router-link to="/actividades">Clases</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style>

</style>