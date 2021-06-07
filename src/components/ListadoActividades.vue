<template>
  <div>
    <ul class="list-unstyled ps-0 mt-2">
      <li class="mb-1">
        <div class="d-flex">
          <router-link to="/actividades" class="link-dark">Deportes</router-link>
        </div>
        <div id="deportes">
          <ul class="list-unstyled pb-1 small">
            <li><router-link to="/actividades" idTipo="Futbol" class="link-dark">Fútbol</router-link></li>
            <li><router-link to="/actividades" class="link-dark">Basquet</router-link></li>
            <li><router-link to="/actividades" class="link-dark">Rugby</router-link></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <div class="d-flex">
          <router-link to="/actividades" class="link-dark">Clases</router-link>
        </div>
        <div id="clases">
          <ul class="list-unstyled pb-1 small">
            <li><router-link to="/actividades" class="link-dark">Yoga</router-link></li>
            <li><router-link to="/actividades" class="link-dark">CrossFit</router-link></li>
            <li><router-link to="/actividades" class="link-dark">Pilates</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
 methods:{
        navegarHaciaView(idTipo){
            let miRuta = '/actividades/' + idTipo
            this.$router.push(miRuta)
        }
    }
}
</script>