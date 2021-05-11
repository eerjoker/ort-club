<template>
  <div>
    <b-button v-b-toggle.sidebar>Toggle Sidebar</b-button>
    <ul>
      <li>
        <router-link to="/usuario">Usuario</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {

  }
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
