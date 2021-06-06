<template>
  <div>
    <Login />
    <router-link to="/registro" class="link-dark">Registrarse</router-link>
  </div>
</template>

<script>
import Login from "./Login.vue";

export default {
  name: "Sesion",
  components: {
    Login
  }
};
</script>
