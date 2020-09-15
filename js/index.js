// Importa elementos de otro js
import {
  getDraggableElements,
  hideMainScreen,
  showGameScreen,
  getHoopLeft
} from "./utils.js";
import { hoopsPerLevel } from "./constants.js";
import {controlador} from "./controlador.js";

// Variable de control
let control;
// Número de jugadas
let jugadas = 0;
// Minutos transcurridos
let minutos = 0
// Segundos transcurridos
let segundos = 0;


$(function () {
  // Variable que guarda la cantidad de aros seleccionados
  let lv = "";

  // Cuando está en Pausa y se da click en el Botón de volver
  $("#resume").click(function () {
    // El estilo de esa parte
    $("#pauseFace").css({
      // Se coloca hacia adelante
      "z-index": 0,
      // Y se pone transparente
      opacity: 0
    });
    // Se coloca un tiempo de espera de 100 ms desde que se da click
    setTimeout(function () {
      // Continua la cuenta del cronómetro
      cronometro();
    }, 100);
  });


  // Si da click en el botón de Pausa
  $("#pause").click(function () {
    // Llama a la función pause
    pause();
  });

  // For que coloca la cantidad de aros en la torre 1
  for (let i = 1; i <= 8; i++) {
    // Al drag # se le colocan los datos
    $(`#drag${i}`).data("data", {
      // El valor de cada aro
      value: i,
      // La última torre es la 1
      lastTower: $("#tower1")
    });
  }

  // Coloca la clase aro como draggable
  $(".aro").draggable({
    disabled: true,
    // Habilita que se pueda regresar el elemento
    revert: true,
    // Función que se ejecuta cuando se detiene
    stop: function () {
      // Se incrementa el número de jugadas
      jugadas++;
      // Muestra el número de jugadas
      $("#jugadas").html(jugadas);
    }
  });

  // Seleccionar el nivel del juego
  // Obtiene el valor del elemento Select_aros
  var select_aros = document.getElementById('select_aros');
  // Variable de selección
  var selectedOption;

  // Cuando cambie de valor
  select_aros.addEventListener('change',
    function () {
      selectedOption = this.options[select_aros.selectedIndex];
      lv = selectedOption.value;
    }
  );

  // Cuando se da click en el botón start
  $("#start").click(function () {
    // Si el nombre de usuario no ha sido ingresado
    if (!$("#username").val()) {
      alert("Por favor ingrese un nombre de usuario valido");
      return;
    }

    let numberOfHoops = hoopsPerLevel[lv];
    // Si la cantidad de aros no ha sido ingresado
    if (!numberOfHoops) return alert("Por favor, primero seleccione un nivel");

    // Se le asignan los datos a la torre 1
    $("#tower1").data("data", {
      // Posicionado a la izquierda
      pos: "left",
      // El valor máximo es el número de aros seleccionados
      maxValue: numberOfHoops,
      // Asigna el número de elementos (Aros) a partir de la siguiente función
      // Donde se le pasa el número de aros escogidos por el usuario
      elements: getDraggableElements(numberOfHoops)
    });
    createListener(lv);
    startGame(lv);
  });
});

// Función para saber que ganó
function validarVictoria(level, jugadas) {
  // Variable que almacena el número de aros
  let aros;
  // La forma de ganar según los diferentes niveles
  if (level == "uno") aros = 1;
  else if (level == "dos") aros = 2;
  else if (level == "tres") aros = 3;
  else if (level == "cuatro") aros = 4;
  else if (level == "cinco") aros = 5;
  else if (level == "seis") aros = 6;
  else if (level == "siete") aros = 7;
  else aros = 8;
  // Almacena la cantidad de aros que tiene la torre 3
  const elementsT3 = $("#tower3").data("data").elements.length;
  // Si la cantidad de aros es igual a los aros escogidos por el usuario
  if (elementsT3 == aros) {
    // Detiene el conteo del tiempo
    clearInterval(control);
    // Desactiva el movimiento de los aros
    $(".aro").draggable({ disabled: true });
    // Espera un tiempo para decir que ganó
    setTimeout(function () {
      // Llama a la función win después de ese tiempo
      win(jugadas, level);
    }, 500);
  }
}

// Función de ganar
function win(jugadas) {
  // Oculta la pantalla de juego
  $("#game").css("transform", "scale(0)");
  // Muestra el número de movimientos que realizó el ganador
  $("#moves").html(jugadas);
  // Asigna el tiempo
  if (minutos < 10) minutos = `0${minutos}`;
  if (segundos < 10) segundos = `0${segundos}`;
  // Muestra el tiempo que tardó
  $("#time").html(`${minutos}:${segundos} m`);
  // Coloca la pantalla del ganador
  setTimeout(function () {
    $("#winFace").css("transform", "scale(1)");
  });
}


function startGame(level) {
  $("#user").html("Hola " + $("#username").val());
  $("#jugadas").html(jugadas);
  hideMainScreen();

  setTimeout(showGameScreen, 400);
  setTimeout(function () {
    cronometro();
  }, 800);
  $("#tower2").data("data", {
    pos: "center",
    maxValue: 0,
    elements: []
  });
  $("#tower3").data("data", {
    pos: "right",
    maxValue: 0,
    elements: []
  });

  let elements = $("#tower1").data("data").elements;
  elements[elements.length - 1].draggable({ disabled: false });
  $(".tower").droppable({
    drop(_, hoop) {
      let maxValue = $(this).data("data").maxValue;
      let dragValue = hoop.draggable.data("data").value;

      if (dragValue > maxValue) {
        hoop.draggable.draggable({ revert: false });
        setTimeout(function () {
          hoop.draggable.draggable({ revert: true });
        }, 400);

        $(this)
          .data("data")
          .elements.push(hoop.draggable);

        let lastTower = hoop.draggable.data("data").lastTower;
        let elements = lastTower.data("data").elements;
        if (lastTower[0] != $(this)[0]) {
          elements.pop();
        }

        if (elements.length > 0) {
          elements[elements.length - 1].draggable({ disabled: false });
          lastTower.data("data").maxValue = elements[elements.length - 1].data(
            "data"
          ).value;
        } else lastTower.data("data").maxValue = 0;
        hoop.draggable.data("data").lastTower = $(this);
        elements = $(this).data("data").elements;
        if (elements.length > 1) {
          elements.forEach(el => el.draggable({ disabled: true }));
        }
        elements[elements.length - 1].draggable({ disabled: false });
        $(this).data("data").maxValue = dragValue;
      }

      let top = $(this).data("data").elements.length * 20;
      top = `calc(100% - ${top}px)`;
      let position = $(this).data("data").pos;
      let left = getHoopLeft(position, dragValue);

      hoop.draggable.css({
        left,
        top,
        transition: ".4s"
      });
      setTimeout(function () {
        hoop.draggable.css({ transition: "0s" });
        validarVictoria(level, jugadas);
        controlador();
      }, 400);
    }
  });
}

// Función encargada de contar el tiempo
function cronometro() {
  // Incrementa la cuenta de segundos
  segundos++;
  // Si han paso 60 segundos
  if (segundos == 60) {
    // Incrementa la cuenta de minutos
    minutos++;
    // Establece en 0 los segundos
    segundos = 0;
  }
  // Función de los segundos
  let txtS = segundos < 10 ? `0${segundos}` : `${segundos}`;
  // Función de los minutos
  let txtM = minutos < 10 ? `0${minutos}` : `${minutos}`;
  // Muestra los segundos
  $("#segundos").html(txtS);
  // Muestra los minutos
  $("#minutos").html(txtM);
  // Llama a la función cronómetro cada 1000 ms (1s)
  control = setTimeout(function () {
    cronometro();
  }, 1000);
}

// Función de pausa
function pause() {
  // Evita que la función setTimeout se ejecute
  clearTimeout(control);
  // Estilo de la interface de pausa 
  $("#pauseFace").css({
    // Se coloca la interface de pausa arriba de todo
    "z-index": 1000,
    // Lo pone visible
    opacity: 1
  });
}
