<template>
  <div>
    <div class="behind-footer"></div>
    <footer class="my-footer bg-light mt-2 mb-0 p-1">
      <div class="container d-flex justify-content-between h-100">
        <h5 class="my-auto">OrtClub</h5>
        <small class="text-muted ml-auto">Todos los derechos reservados - 2021</small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.my-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
}
.behind-footer {
  margin-top: 4rem;
}
</style>