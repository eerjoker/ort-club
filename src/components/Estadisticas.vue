<template>
  <div class="container">
    <div>
      <b-form-select
        v-model="seleccion"
        :options="actividadesParaSelect"
      ></b-form-select>
    </div>
    <div class="area">
      <TestLineChart
        :chartData="datacollection"
        :options="options"
      ></TestLineChart>
    </div>
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
      actividades: [],
      seleccion: null,
    };
  },
  async mounted() {
    await this.getReservas();
    await this.fillData();
    await this.getActividades();
    this.$watch(
      () => this.seleccion,
      () => {
       this.fillData()
      }
    );
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
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
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
            text: "Reservas por momento del dia",
          },
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
    async getActividades() {
      try {
        const actividadesResponse = await axios.get(
          `${this.$store.state.url}/actividades`
        );
        if (
          actividadesResponse.status < 200 ||
          actividadesResponse.status >= 300
        ) {
          throw new Error(
            "Error al cargar los usuarios: " + actividadesResponse.statusText
          );
        }
        this.actividades = actividadesResponse.data;
      } catch (err) {
        alert(err.message);
      }
    },
  },
  computed: {
    reservasManana() {
      const reservasManana = [];
      console.log("Select de metodo " + this.seleccion);

      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();

        if (
          (horaReserva < 12) &&
          (horaReserva >= 8) &&
          (this.seleccion == reserva.idActividad)
        ) {
          reservasManana.push(reserva);
        }
      }

      return reservasManana.length;
    },
    reservasTarde() {
      const reservasTarde = [];
      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();
        if (
          (horaReserva < 18) &&
          (horaReserva >= 12) &&
          (this.seleccion == reserva.idActividad)
        ) {
          reservasTarde.push(reserva);
        }
      }

      return reservasTarde.length;
    },
    reservasNoche() {
      const reservasNoche = [];
      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();
        if ((horaReserva < 23) && (horaReserva >= 18)  &&
          (this.seleccion == reserva.idActividad)) {
          reservasNoche.push(reserva);
        }
      }

      return reservasNoche.length;
    },
    actividadesParaSelect() {
      const actAux = [];
      actAux.push({ value: null, text: "Seleccione una actividad" });
      for (let act of this.actividades) {
        console.log("act aux: " + act.id);
        actAux.push({ value: act.id, text: act.nombre });
      }
      return actAux;
    },
  },
  // async created() {
  //   await this.getReservas();
  //   await this.fillData();
  //   await this.getActividades();
  // },
};
</script>

<style>
.area {
  width: 500px;
  height: 100px;
  margin: auto;
}
</style>
