<template>
  <vc-calendar :attributes="attributes" />
</template>

<script>
import axios from "axios";
export default {
  props: ["reservasFinal"],
  computed: {
    attributes() {
      return this.todo.map((todo) => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? "opacity-75" : "",
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        }));
    },
    todo() {
      return this.reservasFinal.map((reserva) => ({
        dates: new Date(reserva.fecha),
        color: "red",
        isComplete: false,
        description: reserva.nombre
      }))
    }
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
