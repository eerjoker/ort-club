<template>
  <div>
    <p>Soy el usuario actual</p>
    <!-- <p>Contador: {{ count }}</p> -->
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>

</style>