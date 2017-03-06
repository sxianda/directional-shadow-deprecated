var duration = 600.0;
var angleX = 0;
var angleY = 0;
var angleZ = 0;

function toggleElement(card, distance, targetDegrees) {
  cardRotateY(card, targetDegrees);
}

function cardRotateX(card, deg) {
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  var distance = window.getComputedStyle(card).getPropertyValue("transform-origin").split(" ")[0];
  card.style.transform = "translateZ(" + distance + ") rotateX(" + deg + "deg)";
}
  
function cardRotateY(card, deg) {
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  var distance = window.getComputedStyle(card).getPropertyValue("transform-origin").split(" ")[0];
  card.style.transform = "translateZ(" + distance + ") rotateY(" + deg + "deg)";
}

function cardRotateZ(card, deg) {
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  var distance = window.getComputedStyle(card).getPropertyValue("transform-origin").split(" ")[0];
  card.style.transform = "translateZ(" + distance + ") rotateZ(" + deg + "deg)";
}

function flipX(distance) {
  var card = document.getElementById("square-animation");
  angleX += 45;
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  var transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";

  card.style.transform = transform;
}

function flipY(distance) {
  var card = document.getElementById("square-animation");
  angleY += 30;
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  card.style.transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";
      
  var card1 = document.getElementById("square-animation1");
  card1.style.transition = "transform " + 6000 + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  card1.style.transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";
}

function flipZ(distance) {
  var card = document.getElementById("square-animation");
  angleZ += 45;
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  card.style.transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";
}
