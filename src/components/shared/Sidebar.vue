<template>
  <div>
    <Login />
    <ul>
      <li>
        <!-- ver como pasar parametros por el router -->
        <router-link to="/actividades">Deportes</router-link>
      </li>
      <li>
        <router-link to="/actividades">Clases</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Login from '../Login';

export default {
  name: "Sidebar",
  components: {
    Login
  }
}
</script>

<style>

</style>