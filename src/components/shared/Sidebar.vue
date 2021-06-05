<template>
  <b-sidebar id="sidebar">
    <div v-if="false">
      <Login />
    </div>
    <div v-if="true">
      <Registro/>
    </div>
    <div>
      <ul class="list-unstyled ps-0 mt-2">
        <li class="mb-1">
          <div class="d-flex">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#deportes-collapse" aria-expanded="true">
            </button>
            <router-link to="/actividades" class="link-dark rounded">Deportes</router-link>
          </div>
          <div class="collapse show" id="deportes-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><router-link to="/actividades" class="link-dark rounded">Fútbol</router-link></li>
              <li><router-link to="/actividades" class="link-dark rounded">Basquet</router-link></li>
              <li><router-link to="/actividades" class="link-dark rounded">Rugby</router-link></li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <div class="d-flex">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#clases-collapse" aria-expanded="true">
            </button>
            <router-link to="/actividades" class="link-dark rounded">Clases</router-link>
          </div>
          <div class="collapse show" id="clases-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><router-link to="/actividades" class="link-dark rounded">Yoga</router-link></li>
              <li><router-link to="/actividades" class="link-dark rounded">CrossFit</router-link></li>
              <li><router-link to="/actividades" class="link-dark rounded">Pilates</router-link></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div>
      <button class="btn btn-primary" @click="incrementar">Aumentar</button>
    </div> -->
  </b-sidebar>
</template>

<script>
import Login from '../Login';
import Registro from '../Registro';

export default {
  name: "Sidebar",
  components: {
    Login,
    Registro
  },
  methods: {
    incrementar() {
      this.$store.commit('increment')
    }
  }
}
</script>

<style>

</style>