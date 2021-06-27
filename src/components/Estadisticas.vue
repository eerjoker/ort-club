<template>
  <div class="area">
    <TestLineChart :chartData="datacollection" :options="options"></TestLineChart>
  </div>
</template>

<script>
import axios from "axios";
import TestLineChart from "./donutChart.js";

export default {
  components: {
    TestLineChart,
  },
  data() {
    return {
      datacollection: null,
      options: null,
      loaded: false,
      reservas: [],
    };
  },
  async mounted() {
    await this.getReservas();
    await this.fillData();
  },
  methods: {
    fillData() {
      (this.datacollection = {
        labels: ["Mañana", "Tarde", "Noche"],
        datasets: [
          {
            label: "Reservas por moment del dia",
            data: [this.reservasManana, this.reservasTarde, this.reservasNoche],
            backgroundColor: [
             'rgb(255, 99, 132)',
             'rgb(54, 162, 235)',
             'rgb(255, 205, 86)'
            ],
            borderColor: "rgb(255, 99, 132)",
          },
        ],
      }),
        (this.options = {
         animateRotate: true,
          responsive: true,
          legend: {
            display: true,
            position: "top",
          },
           title: {
        display: true,
        text: 'Reservas por momento del dia'
      }
        });
    },
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
        this.reservas = reservasResponse.data;
        //this.loaded = true;
      } catch (err) {
        alert(err.message);
      }
    },
  },
  computed: {
    reservasManana() {
      const reservasManana = [];
      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();

        if ((horaReserva < 12) & (horaReserva > 8)) {
          reservasManana.push(reserva);
        }
      }

      return reservasManana.length;
    },
    reservasTarde() {
      const reservasTarde = [];
      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();
        if ((horaReserva < 18) & (horaReserva > 12)) {
          reservasTarde.push(reserva);
        }
      }

      return reservasTarde.length;
    },
    reservasNoche() {
      const reservasNoche = [];
      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();
        if (horaReserva < 23 && horaReserva > 18) {
          reservasNoche.push(reserva);
        }
      }

      return reservasNoche.length;
    },
  },
  async created() {
    await this.getReservas();
    await this.fillData();
  },
};

</script>

<style>
.area{
  width: 500px;
  height: 100px;
  margin: auto;
}
</style>
