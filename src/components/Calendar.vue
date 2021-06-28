<template>
  <vc-calendar :attributes="attributes" />
</template>

<script>
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
  }
};
</script>

<style></style>
