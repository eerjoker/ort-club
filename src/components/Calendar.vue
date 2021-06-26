<template>
  <vc-calendar :attributes="attributes" />
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    reservas: [],
    todos: [
      // {
      //   description: "Clase de futbol",
      //   isComplete: false,
      //   dates: { weekdays: 6 }, // weekdays: Todos los viernes --- days: numero del dia especifico
      //   color: "red",
      // },
    ],
  }),

  computed: {
    attributes() {
      return [
        // Attributes todos
        ...this.todos.map((todo) => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? "opacity-75" : "",
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  },
  async created() {
    try {
      const reservasResponse = await axios.get(
        `${this.$store.state.url}/reservas`
      );
      if (reservasResponse.status < 200 || reservasResponse.status >= 300) {
        throw new Error(
          "Error al cargar los usuarios: " + reservasResponse.statusText
        );
      }
      this.reservas = reservasResponse.data;
    } catch (err) {
      alert(err.message);
    }
  },
};
</script>

<style></style>
