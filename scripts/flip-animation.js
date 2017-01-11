var duration = 1000.0;
var angleX = 0;
var angleY = 0;
var angleZ = 0;

function toggleElement(card, distance, targetDegrees) {
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  card.style.webkitTransition = "-webkit-transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  
  card.style.transform = "translateZ(" + distance + "px) rotateY(" + targetDegrees + "deg)";
  card.style.webkitTransform = "translateZ(" + distance + "px) rotateY(" + targetDegrees + "deg)";
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
  angleY += 45;
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  card.style.transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";
}

function flipZ(distance) {
  var card = document.getElementById("square-animation");
  angleZ += 45;
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";

  card.style.transform = "translateZ(" + distance + "px) rotateX(" + angleX + "deg) rotateY(" + angleY
      + "deg) rotateZ(" + angleZ + "deg)";
}
