<template>
  <div >
    <h1>Estadisticas Especiales</h1>
    <div class="area">
      <b-card class="mb-6">
        <b-card-text>
          <div>
            <div>
              <b-form-select
                v-model="seleccion"
                :options="actividadesParaSelect"
              ></b-form-select>
            </div>
            <div>
              <DonutChart
                :chartData="datacollection"
                :options="options"
              ></DonutChart>
            </div>
          </div>
        </b-card-text>
      </b-card>

      <b-card class="mb-6">
        <div>
          <div>
            <LineChart
              :chartData="datacollectionLine"
              :options="optionsLine"
            ></LineChart>
          </div>
        </div>
      </b-card>
    </div>
   
  </div>
</template>

<script>
import axios from "axios";
import DonutChart from "./donutChart.js";
import LineChart from "./lineChart.js";
import colorLib from "@kurkle/color";

export default {
  components: {
    DonutChart,
    LineChart,
  },
  data() {
    return {
      datacollection: null,
      options: null,
      datacollectionLine: null,
      optionsLine: null,
      loaded: false,
      reservas: [],
      actividades: [],
      seleccion: null,
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    };
  },
  async mounted() {
    await this.getReservas();
    await this.fillDataDonut();
    await this.fillDataLine();
    await this.getActividades();
    this.$watch(
      () => this.seleccion,
      () => {
        this.fillDataDonut();
        this.fillDataLine();
      }
    );
  },
  methods: {
    fillDataDonut() {
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
    fillDataLine() {
      (this.datacollectionLine = {
        labels: this.meses,
        datasets: [
          {
            label: "Reservas Mensuales",
            data: this.reservasPorMes,
            backgroundColor: this.transparentize("rgb(255, 99, 132)", 1),
            borderColor: "rgb(255, 99, 132)",
          },
        ],
      }),
        (this.optionsLine = {
          
          responsive: true,
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Reservas Anuales",
          },
        });
    },
    transparentize(value, opacity) {
      const alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return colorLib(value).alpha(alpha).rgbString();
    },
  },
  computed: {
    reservasManana() {
      const reservasManana = [];

      for (let reserva of this.reservas) {
        let horaReserva = new Date(reserva.fechaHora).getHours();

        if (
          horaReserva < 12 &&
          horaReserva >= 8 &&
          this.seleccion == reserva.idActividad
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
          horaReserva < 18 &&
          horaReserva >= 12 &&
          this.seleccion == reserva.idActividad
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
        if (
          horaReserva < 23 &&
          horaReserva >= 18 &&
          this.seleccion == reserva.idActividad
        ) {
          reservasNoche.push(reserva);
        }
      }

      return reservasNoche.length;
    },
    actividadesParaSelect() {
      const actAux = [];
      actAux.push({ value: null, text: "Seleccione una actividad" });
      for (let act of this.actividades) {
        actAux.push({ value: act.id, text: act.nombre });
      }
      return actAux;
    },
    reservasPorMes() {
      const reservasAnual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let reserva of this.reservas) {
        let mesReserva = new Date(reserva.fechaHora).getMonth();

        reservasAnual[mesReserva] += 1;
      }

      return reservasAnual;
    },
  },
};
</script>

<style>
.area {
  width: 500px;
  height: 100px;
  margin: auto;
}
</style>
