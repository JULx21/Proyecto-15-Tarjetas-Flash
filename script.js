// lista de tarjetas, cada una tiene su pregunta y su respuesta
const tarjetas = [
  { pregunta: "¿Qué es una variable?", respuesta: "Un espacio para guardar datos." },
  { pregunta: "¿Qué diferencia hay entre let y const?", respuesta: "let se puede cambiar, const no." },
  { pregunta: "¿Qué es un array?", respuesta: "Una lista de valores, por ejemplo [1, 2, 3]." },
  { pregunta: "¿Qué es un objeto?", respuesta: "Datos con nombre, por ejemplo { nombre: 'Ana' }." },
  { pregunta: "¿Qué hace console.log()?", respuesta: "Muestra un mensaje en la consola." },
  { pregunta: "¿Qué es una función?", respuesta: "Un bloque de código que se puede usar varias veces." },
  { pregunta: "¿Qué es el DOM?", respuesta: "La página HTML que JavaScript puede modificar." },
  { pregunta: "¿Qué significa ===?", respuesta: "Compara el valor y también el tipo." },
  { pregunta: "¿Para qué sirve if / else?", respuesta: "Para ejecutar un código u otro según una condición." },
  { pregunta: "¿Para qué sirve un for?", respuesta: "Para repetir un código varias veces." },
  { pregunta: "¿Qué es un string?", respuesta: "Un dato de texto, por ejemplo 'Hola'." },
  { pregunta: "¿Qué hace push()?", respuesta: "Agrega un elemento al final de un array." },
  { pregunta: "¿Qué es un evento?", respuesta: "Algo que pasa en la página, como un clic." },
  { pregunta: "¿Qué es una arrow function?", respuesta: "Una forma corta de escribir funciones: () => {}" },
  { pregunta: "¿Qué es JSON?", respuesta: "Un formato de texto para guardar e intercambiar datos." },
  { pregunta: "¿Qué hace querySelector()?", respuesta: "Selecciona un elemento del HTML con un selector CSS." },
  { pregunta: "¿Qué es null?", respuesta: "Un valor vacío puesto a propósito." },
  { pregunta: "¿Qué es undefined?", respuesta: "Una variable que no tiene valor todavía." },
  { pregunta: "¿Qué es un callback?", respuesta: "Una función que se pasa a otra para usarla después." },
  { pregunta: "¿Qué es un framework?", respuesta: "Una herramienta que ayuda a crear apps con menos código." },
];

// la app principal, aqui guardo el estado (los datos que cambian)
const app = Vue.createApp({
  data() {
    return {
      tarjetas: tarjetas,
      indice: 0,                // en que tarjeta voy, empieza en 0
      mostrarRespuesta: false,  // false = pregunta, true = respuesta
    };
  },
  methods: {
    siguiente() {
      // solo avanza si no estoy en la ultima
      if (this.indice < this.tarjetas.length - 1) {
        this.indice = this.indice + 1;
        this.mostrarRespuesta = false; // la nueva empieza con la pregunta
      }
    },
    anterior() {
      // solo retrocede si no estoy en la primera
      if (this.indice > 0) {
        this.indice = this.indice - 1;
        this.mostrarRespuesta = false;
      }
    },
    voltear() {
      // el ! lo cambia al contrario: true pasa a false y al reves
      this.mostrarRespuesta = !this.mostrarRespuesta;
    },
  },
});

// componente de la barra, recibe indice y total desde la app
app.component("barra", {
  props: ["indice", "total"],
  computed: {
    // el +1 es porque el indice empieza en 0 y yo cuento desde 1
    porcentaje() {
      return Math.round(((this.indice + 1) / this.total) * 100);
    },
  },
  template: `
    <div class="progreso">
      <div class="barra-contenedor">
        <div class="barra-relleno" :style="{ width: porcentaje + '%' }"></div>
      </div>
      <span>{{ porcentaje }}%</span>
      <span>{{ indice + 1 }} de {{ total }}</span>
    </div>
  `,
});

// componente de la tarjeta, solo muestra el texto que le llegue
app.component("tarjeta", {
  props: ["texto"],
  template: `
    <div class="tarjeta">
      <p>{{ texto }}</p>
    </div>
  `,
});

// componente de los botones, no cambia nada por si solo,
// solo avisa a la app con $emit y la app hace el cambio
app.component("botones", {
  props: ["mostrarRespuesta"],
  emits: ["anterior", "voltear", "siguiente"],
  template: `
    <div class="botones">
      <button @click="$emit('anterior')">‹ Previous</button>
      <button @click="$emit('voltear')">
        {{ mostrarRespuesta ? "Hide Answer" : "Show Answer" }}
      </button>
      <button @click="$emit('siguiente')">Next ›</button>
    </div>
  `,
});

// esto va siempre al final, despues de crear los componentes
app.mount("#app");