<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Header />
    <Sidebar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// Shared
import Header from "./components/shared/Header.vue";
import Sidebar from "./components/shared/Sidebar.vue";
import Footer from "./components/shared/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Footer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.w-30 {
  width: 30%;
}
.w-40 {
  width: 40%;
}
</style>
