import {
  getDraggableElements,
  hideMainScreen,
  showGameScreen,
  getHoopLeft
} from "./utils.js";
import { hoopsPerLevel } from "./constants.js";

let control;
let jugadas = 0;
let minutos = 0,
  segundos = 0;
$(function () {
  let lv;

  $("#resume").click(function () {
    $("#pauseFace").css({
      "z-index": 0,
      opacity: 0
    });
    setTimeout(function () {
      cronometro();
    }, 300);
  });
  $("#pause").click(function () {
    pause();
  });
  for (let i = 1; i <= 8; i++) {
    $(`#drag${i}`).data("data", {
      value: i,
      lastTower: $("#tower1")
    });
  }
  $(".aro").draggable({
    disabled: true,
    revert: true,
    stop: function () {
      jugadas++;
      $("#jugadas").html(jugadas);
    }
  });
  $(".level-selector").click(function () {
    $("a").removeClass("active");
    $(this).addClass("active");
    lv = this.dataset.level;
  });

  $("#start").click(function () {
    if (!$("#username").val()) {
      alert("Por favor ingrese un nombre de usuario valido");
      return;
    }

    let numberOfHoops = hoopsPerLevel[lv];
    if (!numberOfHoops) return alert("Por favor, primero seleccione un nivel");

    $("#tower1").data("data", {
      pos: "left",
      maxValue: numberOfHoops,
      elements: getDraggableElements(numberOfHoops)
    });
    createListener(lv);
    startGame(lv);
  });
});

function validarVictoria(level, jugadas) {
  let aros;
  if (level == "easy") aros = 3;
  else if (level == "medium") aros = 5;
  else aros = 8;
  const elementsT2 = $("#tower2").data("data").elements.length;
  const elementsT3 = $("#tower3").data("data").elements.length;
  if (elementsT2 == aros || elementsT3 == aros) {
    clearInterval(control);
    $(".aro").draggable({ disabled: true });
    setTimeout(function () {
      win(jugadas, level);
    }, 800);
  }
}
function win(jugadas, level) {
  $("#game").css("transform", "scale(0)");
  $("#moves").html(jugadas);
  if (minutos < 10) minutos = `0${minutos}`;
  if (segundos < 10) segundos = `0${segundos}`;
  $("#time").html(`${minutos}:${segundos} m`);
  setTimeout(function () {
    $("#winFace").css("transform", "scale(1)");
  }, 400);
  let seconds = 5;
  let username = $("#username").val();
  setInterval(function () {
    if (!seconds) {
      $("#winFace").css("transform", "scale(0)");
      firebase
        .database()
        .ref(level)
        .push({
          username,
          minutos,
          segundos,
          jugadas,
          userImage
        });
      setTimeout(() => {
        $("#rankingFace").css("transform", "scale(1)");
      }, 300);
    }
    $("#seconds").html(seconds);
    seconds--;
  }, 1000);
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
      }, 400);
    }
  });
}

function cronometro() {
  segundos++;
  if (segundos == 60) {
    minutos++;
    segundos = 0;
  }
  let txtS = segundos < 10 ? `0${segundos}` : `${segundos}`;
  let txtM = minutos < 10 ? `0${minutos}` : `${minutos}`;
  $("#segundos").html(txtS);
  $("#minutos").html(txtM);
  control = setTimeout(function () {
    cronometro();
  }, 1000);
}

function pause() {
  clearTimeout(control);
  $("#pauseFace").css({
    "z-index": 1000,
    opacity: 1
  });
}
