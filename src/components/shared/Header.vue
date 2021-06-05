<template>
  <nav class="navbar navbar-expand-sm navbar-light fixed-top bg-light">
    <b-button variant="outline-secondary" class="ms-3 ms-md-5 ms-lg-6" v-b-toggle.sidebar>
      <img src="../../../public/img/toggle.svg" alt="Menu">
    </b-button>
    <div class="ms-3 ms-lg-4">
      <router-link to="/" class="navbar-brand">OrtClub</router-link>
    </div>
    <div class="d-flex ms-auto me-3 me-md-5 me-lg-6">
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="navbar-item" v-if="hayUsuario">
          <router-link to="/usuario" class="nav-link">{{ nombreUsuarioActual }}</router-link>
        </li>
        <li class="navbar-item" v-if="hayUsuario">
          <router-link to="/" class="nav-link" v-on:click="desloguear">Salir</router-link>
        </li>
      </ul>
      <div class="d-flex ms-3 ms-lg-4">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
        <b-button variant="outline-secondary"><img src="../../../public/img/search.svg" alt="Lupa"></b-button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    desloguear() {
      this.$store.dispatch('desloguear')
    }
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario
    },
    nombreUsuarioActual() {
      return this.$store.getters.nombreUsuarioActual
    }
  }
};
</script>
