<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Header />
    <Sidebar />
    <Calendar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// Shared
import Header from "./components/shared/Header.vue";
import Sidebar from "./components/shared/Sidebar.vue";
import Footer from "./components/shared/Footer.vue";
import Calendar from "./components/Calendar.vue"

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Footer,
    Calendar
  },
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
</style>
