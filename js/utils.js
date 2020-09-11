export const getDraggableElements = limit => {
  let elements = [];
  for (let i = 1; i <= 8; i++) {
    let element = $(`#drag${i}`);
    if (i <= limit) elements.push(element);
    else element.css("display", "none");
  }

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
