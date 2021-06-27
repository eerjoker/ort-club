<template>
  <div>
      <h1>Manana</h1>
     <li v-for="reserva in reservas" :key="reserva.id">
        {{reserva.fechaHora}}
    </li> 
  </div>
</template>

<script>
import axios from "axios";
import {line} from 'vue-chartjs'
export default {
    name: "Estadisitcas",
    data() {
        return {
            reservas: [],
        }
    },
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
    async created() {
        await this.getReservas()
    },
    computed: {
        reservasManana() {
            const reservasManana = []
            for(let reserva of this.reservas){
                let horaReserva = new Date(reserva).getHours()
                console.log(horaReserva)
                if(horaReserva < 12 & horaReserva > 8){
                    reservasManana.push(reserva)
                }
            }
            console.log(reservasManana)   
            return reservasManana
        },
        reservasTarde() {
            const reservasTarde = []
            for(let reserva of this.reservas){
                let horaReserva = new Date(reserva).getHours()
                if(horaReserva < 18 & horaReserva > 12){
                    reservasTarde.push(reserva)
                }
            }   
            console.log(reservasTarde)
            return reservasTarde
        },
         reservasNoche() {
            const reservasNoche = []
            for(let reserva of this.reservas){
                let horaReserva = new Date(reserva).getHours()
                if(horaReserva < 23 & horaReserva > 18){
                    reservasNoche.push(reserva)
                }
            }   
              console.log(reservasNoche)
            return reservasNoche
        },
    },
    methods: {
        async getReservas() {
      try {
        const reservasResponse = await axios.get(
          `${this.$store.state.url}/reservas`
        );
        if (reservasResponse.status < 200 || reservasResponse.status >= 300) {
          throw new Error(
            "Error al cargar los usuarios: " + reservasResponse.statusText
          );
        }
        this.reservas = reservasResponse;
      } catch (err) {
        alert(err.message);
      }
    },
     
    },
    mounted(){
        //this.renderChart(data, options)
    }
}
</script>

<style>

</style>