<template>
 <div> 
  

</div>

</template>

<script>




import axios from "axios";


export default {
  name: "Estadisitcas",
  data() {
    return {
      reservas: [],
      chartData: null,
      chartOptions: null,
      loaded: false,
    };
  },
  async created() {
    await this.getReservas();
    this.setChartData();
    this.setChartOptions();
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
        this.reservas = reservasResponse.data;
        this.loaded = true;
      } catch (err) {
        alert(err.message);
      }
    },
    setChartData() {
      this.chartData = {
        labels: ["Mañana", "Tarde", "Noche"],
        datasets: [
          {
            label: "Reservas por moment del dia",
            data: [
              this.reservasManana,
              this.reservasTarde,
              this,
              this.reservasNoche,
            ],
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
          },
        ],
      };
    },
    setChartOptions(){
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  async mounted() {
    await this.getReservas();
    this.setChartData();
    this.setChartOptions();
  },
};
</script>

<style scoped>
</style>
