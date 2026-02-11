/* ========================= SECCIONES ========================= */
const aprendizaje = document.getElementById("aprendizaje");
const actividad = document.getElementById("actividad");
const resultado = document.getElementById("resultado");


/* ========================= FORMULARIO ========================= */
const formularioSeccion = document.getElementById("formulario");
const formulario = document.getElementById("datosForm");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;

  const usuario = {
    nombre: nombre,
    edad: edad
  };

  localStorage.setItem("usuarioVocales", JSON.stringify(usuario));

mostrarBloque(aprendizaje, formularioSeccion);

audioBienvenida.currentTime = 0;
audioBienvenida.play().catch(() => {});
});


/* ========================= AUDIOS ========================= */
const sonidos = {
  A: new Audio("assets/audios/letra-a.mp3"),
  E: new Audio("assets/audios/letra-e.mp3"),
  I: new Audio("assets/audios/letra-i.mp3"),
  O: new Audio("assets/audios/letra-o.mp3"),
  U: new Audio("assets/audios/letra-u.mp3"),
};

const audioBienvenida = new Audio("./assets/audios/hola-escuchamoslasvocales.mp3");
const audioBoton = new Audio("./assets/audios/vamosajugar.mp3");
const audioDondeEsta = new Audio("./assets/audios/donde-esta-la-vocal.mp3");
const audioCorrecto = new Audio("./assets/audios/correcto.mp3");
const audioError = new Audio("./assets/audios/error.mp3");

/* ========================= DATOS DE ACTIVIDADES ========================= */
const actividades = [
  {
    vocal: "A",
    consigna: "./assets/audios/letra-a.mp3",
    opciones: ["B", "A", "R"]
  },
  {
    vocal: "E",
    consigna: "./assets/audios/letra-e.mp3",
    opciones: ["E", "M", "T"]
  },
  {
    vocal: "I",
    consigna: "./assets/audios/letra-i.mp3",
    opciones: ["S", "I", "L"]
  },
  {
    vocal: "O",
    consigna: "./assets/audios/letra-o.mp3",
    opciones: ["O", "L", "A"]
  },
  {
    vocal: "U",
    consigna: "./assets/audios/letra-u.mp3",
    opciones: ["U", "N", "O"]
  }
];

let indiceActividad = 0;
let aciertos = 0;
let errores = 0;

/* =========================BIENVENIDA (al hacer clik en la pagina, se reproduce el audio de bienvenida y tambien la consigna)========================= */
// function reproducirBienvenida() {
//   audioBienvenida.play().catch(() => { });
//   window.removeEventListener("click", reproducirBienvenida);


/* ========================= APRENDIZAJE – VOCALES========================= */
const letrasAprendizaje = document.querySelectorAll("#aprendizaje .letra");

letrasAprendizaje.forEach(letra => {
  letra.addEventListener("click", () => {
    letrasAprendizaje.forEach(l => l.classList.remove("seleccionada"));
    letra.classList.add("seleccionada");

    const l = letra.dataset.letra;
    sonidos[l].currentTime = 0;
    sonidos[l].play();
  });
});


/* ========================= BOTÓN VAMOS A JUGAR   ========================= */
document.getElementById("irActividad").addEventListener("click", () => {
  audioBoton.play();
  mostrarBloque(actividad, aprendizaje);
  iniciarActividad();
});

/* ========================= ACTIVIDAD ========================= */
function iniciarActividad() {
  setTimeout(cargarActividad, 1200);
}

function cargarActividad() {
  const act = actividades[indiceActividad];
  const contenedor = document.querySelector("#actividad .letras");
  const instruccion = document.getElementById("instruccion");

  instruccion.textContent = `🔊 Tocá la letra ${act.vocal}`;


  const audioConsigna = new Audio(act.consigna);
  audioConsigna.currentTime = 0;
  audioConsigna.play();

  contenedor.innerHTML = "";

  act.opciones.forEach(letra => {
    const btn = document.createElement("button");
    btn.className = "letra";
    btn.textContent = letra;

    btn.addEventListener("click", () => evaluarRespuesta(letra));
    contenedor.appendChild(btn);
  });
}


function evaluarRespuesta(letra) {
  const correcta = actividades[indiceActividad].vocal;

  if (letra === correcta) {
  aciertos++;
  
  audioCorrecto.currentTime = 0;
  audioCorrecto.play();

  audioCorrecto.onended = () => {
    indiceActividad++;

    if (indiceActividad < actividades.length) {
      cargarActividad();
    } else {
      mostrarResultado();
    }
  };
  } else {
    errores++;
    audioError.play();
  }
}

/* ========================= RESULTADO ========================= */

function mostrarResultado() {

  const usuario = JSON.parse(localStorage.getItem("usuarioVocales"));

  const resultadoFinal = {
    nombre: usuario.nombre,
    edad: usuario.edad,
    aciertos: aciertos,
    errores: errores
  };


  localStorage.setItem("resultadoVocales", JSON.stringify(resultadoFinal));

  document.getElementById("resultado-mensaje").textContent =
    `${usuario.nombre}, obtuviste:
     Aciertos: ${aciertos} | Errores: ${errores}`;

  mostrarBloque(resultado, actividad);
}

/* ========================= UTILIDAD ========================= */
function mostrarBloque(siguiente, actual) {
  actual.classList.add("oculto");
  setTimeout(() => siguiente.classList.remove("oculto"), 100);
}

const botonVolver = document.getElementById("volver");

botonVolver.addEventListener("click", () => {

  indiceActividad = 0;
  aciertos = 0;
  errores = 0;

  mostrarBloque(aprendizaje, resultado);

});
