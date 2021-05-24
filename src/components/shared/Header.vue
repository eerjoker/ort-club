<template>
  <nav class="navbar navbar-expand-sm navbar-light fixed-top bg-light">
    <b-button class="ms-3 ms-md-5 ms-lg-6" v-b-toggle.sidebar>Toggle</b-button> <!-- Imagen del toggle (las tres lineas) -->
    <div class="ms-3 ms-lg-4">
      <router-link to="/" class="navbar-brand">OrtClub</router-link>
    </div>
    <div class="d-flex ms-auto me-3 me-md-5 me-lg-6">
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="navbar-item" v-if="true">
          <router-link to="/usuario" class="nav-link">Usuario</router-link>
        </li>
        <li class="navbar-item" v-if="true">
          <a class="nav-link" href="#">Salir</a>
        </li>
      </ul>
      <div class="d-flex ms-3 ms-lg-4">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
        <b-button>Buscar</b-button> <!-- Imagen del buscador -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
