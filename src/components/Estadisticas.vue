<template>
  <div>

  </div>
</template>

<script>
import {line} from 'vue-chartjs'
export default {
    extends: line,
    props: {
        label: {
            type: String
        },
        chartData: {
            type: Array
        },
        Options: {
            type: Object
        }
    },
    mounted(){
        //this.renderChart(data, options)
    }
}
</script>

<style>

</style>