/* ========================= SECCIONES ========================= */
const aprendizaje = document.getElementById("aprendizaje");
const actividad = document.getElementById("actividad");
const resultado = document.getElementById("resultado");


/* ========================= FORMULARIO ========================= */
const formularioSeccion = document.getElementById("formulario");
const formulario = document.getElementById("datosForm");
const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioVocales"));

if (usuarioGuardado) {
  document.getElementById("nombre").value = usuarioGuardado.nombre;
  document.getElementById("edad").value = usuarioGuardado.edad;
}

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
  audioBienvenida.play().catch(() => { });
});

async function cargarActividades() {
  const respuesta = await fetch("./assets/preguntas.json");
  const datos = await respuesta.json();
  actividades = datos;
}
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
let actividades = [];

let indiceActividad = 0;
let aciertos = 0;
let errores = 0;

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
document.getElementById("irActividad").addEventListener("click", async () => {

  if (actividades.length === 0) {
    await cargarActividades();
  }

  audioBoton.play();
  mostrarBloque(actividad, aprendizaje);
  iniciarActividad();
});

/* ========================= ACTIVIDAD ========================= */
function iniciarActividad() {
  setTimeout(cargarActividad, 1200);
}

function mezclarOpciones(array) {
  return array.sort(() => Math.random() - 0.5);
}

function cargarActividad() {
  const act = actividades[indiceActividad];
  const contenedor = document.querySelector("#actividad .letras");
  const instruccion = document.getElementById("instruccion");

  const progreso = document.getElementById("progreso");

  let porcentaje = ((indiceActividad + 1) / actividades.length) * 100;

  progreso.style.width = porcentaje + "%";

  instruccion.textContent = `🔊 Tocá la letra ${act.vocal}`;


  const audioConsigna = new Audio(act.consigna);
  audioConsigna.currentTime = 0;
  audioConsigna.play();

  contenedor.innerHTML = "";

  mezclarOpciones(act.opciones).forEach(letra => {
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
  let ranking = JSON.parse(localStorage.getItem("rankingVocales")) || [];

  ranking.push(resultadoFinal);

  localStorage.setItem("rankingVocales", JSON.stringify(ranking));

  ranking.sort((a, b) => {
    if (b.aciertos !== a.aciertos) {
      return b.aciertos - a.aciertos;
    }
    return a.errores - b.errores;
  });

  let top3 = ranking.slice(0, 3);
  const listaRanking = document.getElementById("ranking-lista");
  listaRanking.innerHTML = "";
  top3.forEach((jugador, index) => {

    let medalla = "";

    if (index === 0) medalla = "🥇";
    if (index === 1) medalla = "🥈";
    if (index === 2) medalla = "🥉";

    const li = document.createElement("li");

    li.textContent =
      `${medalla} ${jugador.nombre} - ${jugador.aciertos} aciertos / ${jugador.errores} errores`;

    listaRanking.appendChild(li);

  });
  let textoRanking = "🏆 Ranking:\n";

  top3.forEach((jugador, index) => {
    textoRanking += `${index + 1}. ${jugador.nombre} - ${jugador.aciertos} aciertos / ${jugador.errores} errores\n`;
  });

  Swal.fire({
    title: "¡Juego terminado!",
    text: `${usuario.nombre}, lograste ${aciertos} aciertos, ${errores} errores`,
    icon: "success",
    confirmButtonText: "Atrás"
  });


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

const botonVerResultado = document.getElementById("verResultado");

botonVerResultado.addEventListener("click", () => {
  mostrarResultado();
});

cargarActividades();