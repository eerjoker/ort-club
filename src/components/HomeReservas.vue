<template>
  <div class="container">
    <h1>Reservas</h1>
    <div v-if="hayUsuario">
      <Calendar :reservasFinal="reservasFinal" />
    </div> 

    <br>

    <div  v-if="hayUsuario">
       <input type="text" v-model="buscador" placeholder="Buscador de reservas"> 
      <ul class="list-unstyled mx-auto w-50">
        
        <br>

      <li v-for="reserva in setReservasBuscador" :key="reserva.id" class="border">
         <div class="d-flex justify-content-between m-1 p-1">
          <p class="my-auto">{{reserva.nombre}}</p>
             <p class="my-auto">{{setFormatFecha(reserva.fecha)}}</p>
          </div>
      </li>
       </ul>
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import axios from "axios";

export default {
  data() {
    return {
      reservas: [],
      actividades: [],
      reservasFinal: [],
      reservasBuscador: [],
      buscador:''
    };
  },
  name: "Home",
  components: {
    Calendar,
  },
  computed: {
    hayUsuario() {
      return this.$store.getters.hayUsuario;
    },
    usuarioActualId() {
      return this.$store.getters.usuarioActualId;
    },
    usuarioActualTipo() {
      return this.$store.getters.usuarioActualTipo;
    },
    setReservasBuscador(){
      return this.reservasFinal.filter((reserva)=>{
        return reserva.nombre.match(this.buscador)
      })
    }
  },
  async created() {
    await this.getReservas();
    await this.getActividades();
    this.setReservaFinal();
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
        this.reservas = this.reservasFiltradas(reservasResponse.data);
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
    reservasFiltradas(reservas) {
      if (this.usuarioActualTipo != "socio" && this.hayUsuario) {
        return reservas;
      } else {
        return reservas.filter((r) => r.idUsuario == this.usuarioActualId);
      }
    },
    getNombreActividad(idActividad) {
      let actividad = this.actividades.find(
        (act) => parseInt(act.id) == idActividad
      );
      if (actividad) {
        return actividad.nombre;
      } else {
        return "Actividad no encontrada";
      }
    },
    async setReservaFinal() {
      this.reservas.sort(function (a, b) {
        var dateA = new Date(a.fechaHora), dateB = new Date(b.fechaHora)
        return dateA - dateB
      });
      for (let reserva of this.reservas) {
        this.reservasFinal.push({
          nombre: this.getNombreActividad(reserva.idActividad),
          fecha: reserva.fechaHora,
        });
      }
    },
    setFormatFecha(fechaAux){
      const fecha = new Date(fechaAux)
      const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      const diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
      return `${diasSemana[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]} del ${fecha.getFullYear()} a las ${fecha.getHours()}:${fecha.getMinutes()} `
    }
  },
};
</script>
