
// Variables y constantes
const leftValues = {
  center: 30,
  left: 3,
  right: 56.7
}

const getHoopLeft = (position, hoodValue) => `${leftValues[position] + hoodValue}vw`;

// Cantidad de aros por nivel
var hoopsPerLevel = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8
};

// Variable de control de tiempo
let control;
// Variable de control de tiempo
let control_cro;
// Número de jugadas
let jugadas = 0;
// Minutos transcurridos
let minutos = 0
// Segundos transcurridos
let segundos = 0;
// Segundos transcurridos entre jugadas
let segundos_jugadas = 0;
// Objeto que guarda todo
var objeto_control = new Object();
var total_time = 0;
var usuario;
// Cantidad de sentimientos
var cantidad_sentimientos = document.getElementsByName("sentimiento_name").length;
var lista_sentimientos = [];
var sentimiento_check;
var ok_sentimiento = false;
var sentimiento;

// Obtener el número de aros
function getDraggableElements(limit) {
  // limit es el número de aros escogidos por el usuario
  // crea la variable elements
  let elements = [];
  // For que recorre 8 pasos
  for (let i = 1; i <= 8; i++) {
    // Asigna a la variable element el drag #
    let element = $(`#drag${i}`);
    // Si i es menor o igual al límite añade a la lista de elementos el elemento
    if (i <= limit) elements.push(element);
    // Sino, oculta el elemento
    else element.css("display", "none");
  }
  // Regrese el valor de la lista
  return elements;
}


// Función que oculta la página de inicio
function hideMainScreen() {
  // Coge el id de la página de inicio
  $("#mainFace").css({
    //Lo manda para atrás
    transform: "scale(0)",
    "border-radius": "50%"
  });
}


// Muestra la pantalla del juego
function showGameScreen() {
  $("#game").css({
    // Coloca la sección con id game en la escala 1, o sea, adelante
    transform: "scale(1)",
    "border-radius": 0
  })
}

// Muestra la pantalla del juego
function sin_intentos() {
  $("#sin_intentos").css({
    // Coloca la sección con id game en la escala 1, o sea, adelante
    transform: "scale(1)",
    "border-radius": 0,
    "z-index": 1000,
    // Lo pone visible
    opacity: 1
  })
}

// --------------- PARA EL MÉTODO POST -----------
// Token necesario para que funcione el método POST
var csrftoken = Cookies.get('csrftoken');
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

// USUARIOS
var lista_children = [];

$.get(
  '/api/children/',
  function (data) {
    console.log(data);
    for (let q = 0; q < data.length; q++) {
      lista_children.push(data[q].nombre.toUpperCase())
    }
  }
);

// JUEGO
var juegox;
$.get(
  '/api/jugador/',
  function (data) {
    juegox = data;
  }
);
// Es las veces que el niño ha jugado
// Este es cada 8 días, mínimo
var n_juego;
// El número de intentos que ha realizado por juego
var intentos;


// Función principal
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
      cronometro_control();
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
      controlador();
      segundos_jugadas = 0;

    },
    containment: "parent"
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

  $('input[type=radio][name=sentimiento_name]').change(function () {
    sentimiento = this.value;
    for (let index = 0; index < cantidad_sentimientos; index++) {
      sentimiento_check = document.getElementsByName("sentimiento_name")[index].checked
      lista_sentimientos.push(sentimiento_check);
    }
    if (lista_sentimientos.includes(true)) {
      ok_sentimiento = true;
    }
  });

  // Cuando se da click en el botón start
  $("#start").click(function () {
    usuario = $("#username").val();
    // Si el nombre de usuario no ha sido ingresado
    if (!usuario) {
      alert("Por favor ingrese un nombre");
      return;
    }
    if (!lista_children.includes(usuario.toUpperCase())) {
      alert("Por favor ingrese el nombre correctamente");
      return;
    }
    if (!ok_sentimiento) {
      alert("Por favor ingrese un sentimiento");
      return;
    }
    let numberOfHoops = hoopsPerLevel[lv];
    // Si la cantidad de aros no ha sido ingresado
    if (!numberOfHoops) return alert("Por favor, primero seleccione un nivel");
    let c_intento = [];
    for (let r = 0; r < juegox.length; r++) {
      if (juegox[r].nombre.toUpperCase() == usuario.toUpperCase()) {
        c_intento.push(juegox[r].intento)
        console.log(juegox[r].intento);
      }
    }
    intentos = c_intento[c_intento.length - 1] + 1;

    hideMainScreen();

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

    let na = "";
    for (let w = numberOfHoops; w >= 1; w--) {
      if (w != numberOfHoops) {
        na = w.toString() + "A," + na;
      }
      else {
        na = w.toString() + "A" + na;
      }
    }
    objeto_control = {
      jugada: [0],
      posicion: [na],
      tiempo: [0]
    }

    if (intentos <= 5) {
      startGame(lv);
    }
    else{
      sin_intentos();
    }

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

// ---------------------------- Explicación del juego -------------------
// Función del inicio del juego
function startGame(level) {
  // Muestra el nombre del usuario
  $("#user").html("Hola " + usuario.split(" ", 1));
  // Muestra el número de jugadas
  $("#jugadas").html(jugadas);
  // Oculta la página principal
  hideMainScreen();
  // Inicia el juego 400 ms después de dar start
  setTimeout(showGameScreen, 400);
  // Llama a la función cronómetro 0.8 s después de dar start
  setTimeout(function () {
    cronometro();
    cronometro_control();
  }, 800);
  // Coloca la torre 2 en el centro
  $("#tower2").data("data", {
    pos: "center",
    maxValue: 0,
    elements: []
  });
  // Coloca la torre 3 a la derecha
  $("#tower3").data("data", {
    pos: "right",
    maxValue: 0,
    elements: []
  });

  // Extrae los elementos de la torre 1
  let elements = $("#tower1").data("data").elements;
  // Coloca que los elementos sean movibles
  elements[elements.length - 1].draggable({ disabled: false });
  // Hace a las torres un objetivo para los elementos arrastrables
  $(".tower").droppable({
    // Función
    drop(_, hoop) {
      // Obtiene el máximo valor de aro en la torre sobre la que se posiciona el aro que se tiene seleccionado
      let maxValue = $(this).data("data").maxValue;
      // Obtiene el número del disco que se mueve
      let dragValue = hoop.draggable.data("data").value;

      // Si el disco que se movió es mayor al máximo valor de la torre
      if (dragValue > maxValue) {
        // No revierte la jugada, como debe ser
        hoop.draggable.draggable({ revert: false });
        // No sé
        setTimeout(function () {
          hoop.draggable.draggable({ revert: true });
        }, 10);
        // Añade la torre que aro tiene encima
        $(this).data("data").elements.push(hoop.draggable);

        // Guarda el valor del la última torre en la que estaba el aro antes de donde se ubicó
        let lastTower = hoop.draggable.data("data").lastTower;
        // Guarda los elementos de la última torre en la que estaba el aro
        let elements = lastTower.data("data").elements;
        // Si la última torre es diferente a la torre actual
        // Es decir, si se mueve el aro de una torre a otra
        if (lastTower[0] != $(this)[0]) {
          // Elimina el último elemento de elements, porque, como ese almacena los aros de la última torre
          // Y el aro se movió de la última a la torre actual, el aro ahora pertenece a la torre actual
          // Y la última quedó sin ese elemento
          elements.pop();
        }

        // Si hay aros en la última torre
        if (elements.length > 0) {
          // Habilita que el último aro de la última torre se pueda mover
          elements[elements.length - 1].draggable({ disabled: false });
          // Coloca el último aro de la última torre como su valor máximo
          lastTower.data("data").maxValue = elements[elements.length - 1].data("data").value;
        }
        // Si no hay aros en la última torre se le coloca como 0 el máximo valor
        // Es decir, se le dice que no tiene nada ahí
        else lastTower.data("data").maxValue = 0;

        // Convierte en la última torre la torre donde se acaba de dejar el aro
        // Es decir, la torre actual ahora es la última torre
        hoop.draggable.data("data").lastTower = $(this);
        // Ahora los elementos de la última torre corresponden a la torre actual
        elements = $(this).data("data").elements;
        // Si hay más de un aro en la torre actual
        if (elements.length > 1) {
          // Desabilita el movimiento de los aros de esa torre
          elements.forEach(el => el.draggable({ disabled: true }));
        }
        // Luego habilita el último aro para que si se mueva
        elements[elements.length - 1].draggable({ disabled: false });
        // Coloca el máximo valor de la torre como el aro que está arriba
        $(this).data("data").maxValue = dragValue;
      }
      // ---------------------------- Explicación del juego fin -------------------

      // Calcula la cantidad de aros en la torre y lo multiplica por 20
      let top = $(this).data("data").elements.length * 20;
      // Crea una ecuación para calcular a partir del 100% de la página
      // Restarle la cantidad de pixeles que hayan con respecto al número de aros
      top = `calc(100% - ${top}px)`;
      // Determina si se encuentra en la derecha, izquierda o centro
      let position = $(this).data("data").pos;
      // Guarda 
      let left = getHoopLeft(position, dragValue);
      // Edita el estilo 
      hoop.draggable.css({
        left,
        top,
        transition: ".4s"
      });
      setTimeout(function () {
        hoop.draggable.css({ transition: "0s" });
        validarVictoria(level, jugadas);
      }, 400);
    }
  });
  // Envia los datos de inicio
  controlador();
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
  total_time = txtM + ":" + txtS;
  // Muestra los segundos
  $("#segundos").html(txtS);
  // Muestra los minutos
  $("#minutos").html(txtM);
  // Llama a la función cronómetro cada 1000 ms (1s)
  control = setTimeout(function () {
    cronometro();
  }, 1000);
}

// Función encargada de contar el tiempo entre jugadas
function cronometro_control() {
  // Incrementa la cuenta de segundos
  segundos_jugadas++;
  // Llama a la función cronómetro cada 1000 ms (1s)
  control_cro = setTimeout(function () {
    cronometro_control();
  }, 1000);
}

// Función de pausa
function pause() {
  // Evita que la función setTimeout se ejecute
  clearTimeout(control);
  clearTimeout(control_cro);
  // Estilo de la interface de pausa 
  $("#pauseFace").css({
    // Se coloca la interface de pausa arriba de todo
    "z-index": 1000,
    // Lo pone visible
    opacity: 1
  });
}


function controlador() {
  let vtorre1 = [];
  let vtorre2 = [];
  let vtorre3 = [];
  let vtorres = [];
  let cantidad1 = $("#tower1").data("data").elements.length;
  let cantidad2 = $("#tower2").data("data").elements.length;
  let cantidad3 = $("#tower3").data("data").elements.length;


  for (let index = 0; index < cantidad1; index++) {
    if ($("#tower1").data("data").elements[index] != null) {
      let cual = $("#tower1").data("data").elements[index].selector[5];
      if (cual > 0) {
        vtorre1.push(cual + "A");
      }
      else {
        let cual2 = $("#tower1").data("data").elements[index].context.id[4];
        if (cual2 > 0) {
          vtorre1.push(cual2 + "A");
        }
      }
    }
  }

  for (let index = 0; index < cantidad2; index++) {
    if ($("#tower2").data("data").elements[index] != null) {
      let cual = $("#tower2").data("data").elements[index].context.id[4];
      vtorre2.push(cual + "B");
    }
  }

  for (let index = 0; index < cantidad3; index++) {
    if ($("#tower3").data("data").elements[index] != null) {
      let cual = $("#tower3").data("data").elements[index].context.id[4];
      vtorre3.push(cual + "C");
    }
  }

  if (vtorre1.length > 0) {
    vtorres = vtorre1.toString();
  }
  if (vtorre2.length > 0) {
    vtorres = vtorres + "," + vtorre2;
  }
  if (vtorre3.length > 0) {
    vtorres = vtorres + "," + vtorre3;
  }

  objeto_control.jugada.push(jugadas);
  objeto_control.posicion.push(vtorres);
  objeto_control.tiempo.push(segundos_jugadas);

  $.ajax({
    type: "POST",
    url: "/api/jugador/",
    data: {
      "nombre": usuario,
      "fecha": "",
      "n_juego": 1,
      "intento": intentos,
      "sentimiento": sentimiento,
      "movimiento": jugadas,
      "tiempo_entre_movimiento": segundos_jugadas,
      "posicion": vtorres,
      "tiempo_total": total_time
    }
  });
  console.log(objeto_control);
}

