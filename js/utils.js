export const getDraggableElements = limit => {
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

const leftValues = {
  center: 30,
  left: 3,
  right: 56.7
}

export const getHoopLeft = (position, hoodValue) => `${leftValues[position] + hoodValue}vw`;

export const showGameScreen = () => {
  $("#game").css({
    transform: "scale(1)",
    "border-radius": 0
  })
}

export const hideMainScreen = () => {
  $("#mainFace").css({
    transform: "scale(0)",
    "border-radius": "50%"
  });
} 
