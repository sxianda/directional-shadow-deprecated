var duration = 1000.0;

function toggleElement(card, targetDegrees) {
  card.style.transition = "transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  card.style.webkitTransition = "-webkit-transform " + duration + "ms cubic-bezier(0.3, 0.6, 0.1, 1.0)";
  
  card.style.transform = "translateZ(100px) rotateY(" + targetDegrees + "deg)";
  card.style.webkitTransform = "translateZ(100px) rotateY(" + targetDegrees + "deg)";
  
  updateShadows(card, card.style.transition, card.style.transform);
}
