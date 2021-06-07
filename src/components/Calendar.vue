<template>
  <vc-calendar :attributes='attributes'
  />
</template>

<script>
export default {
  data() {
    const todos = [
      {
        description: 'Clase de futbol',
        isComplete: false,
        dates: { weekdays: 6 }, // weekdays: Todos los viernes --- days: numero del dia especifico
        color: 'red',
      },
    ];
    return {
      incId: todos.length,
      todos,
    };
  },
  computed: {
    attributes() {
      return [
        // Attributes todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  },
};
</script>

<style>

</style>