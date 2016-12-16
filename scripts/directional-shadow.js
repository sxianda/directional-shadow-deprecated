function initializeDirectionalShadow(clip) {
  var cards = clip.querySelectorAll('div.directional-shadow');
  
  // Insert shadow divs for each directional-shadow element.
  for (var i = 0; i < cards.length; i++) {
    var elem = cards[i];
	var style = window.getComputedStyle(elem, null);
	
    var elemClassStr = elem.className;
    elemClassStr = elemClassStr.replace(/\bdirectional-shadow\b/,'');
    
    var shadowX = elem.getAttribute('shadow-x');
    var shadowY = elem.getAttribute('shadow-y');
    var shadowDepth = elem.getAttribute('shadow-depth');
    
    // Elem's parent is perspective, perspective's parent is shadow-collection;
    var parent = elem.parentElement.parentElement;
    
    // Create shadow elements.
    var shadowPerspective = document.createElement("div");
    shadowPerspective.className = "perspective";
	shadowPerspective.style.webkitPerspectiveOrigin = shadowX + "% " + shadowY + "%";
    shadowPerspective.style.webkitPerspective = shadowDepth;
    
    var shadowCard = document.createElement("div");
    shadowCard.className = "shadow-card" + elemClassStr;
	// Users should not be allowed to override class styles. 
	// shadowCard.style.width = elem.style.width;
	// shadowCard.style.height = elem.style.height;
    
    var shadow = document.createElement("div");
    shadow.className = "shadow";
	shadow.style.width = (elem.offsetWidth - 10) + "px";
	shadow.style.height = (elem.offsetHeight - 10) + "px";
    
    parent.insertBefore(shadowPerspective, parent.childNodes[0]);
    shadowPerspective.appendChild(shadowCard);
    shadowCard.appendChild(shadow);
    
    // Create shadow gradient elements.
    var shadowGradientPerspective = document.createElement("div");
    shadowGradientPerspective.className = "perspective";
    shadowGradientPerspective.style.webkitPerspectiveOrigin = shadowX + "% " + shadowY + "%";
    shadowGradientPerspective.style.webkitPerspective = shadowDepth;
    
    var shadowCardGradient = document.createElement("div");
    shadowCardGradient.className="shadow-card-gradient" + elemClassStr;
	// Users should not be allowed to override class styles. 
	// shadowCardGradient.style.width = elem.style.width;
	// shadowCardGradient.style.height = elem.style.height;
    
    var shadowGradient = document.createElement("div");
    shadowGradient.className="shadow";
	shadowGradient.style.width = (elem.offsetWidth - 10) + "px";
	shadowGradient.style.height = (elem.offsetHeight - 10) + "px";
    
    parent.insertBefore(shadowGradientPerspective, parent.childNodes[0]);
    shadowGradientPerspective.appendChild(shadowCardGradient);
    shadowCardGradient.appendChild(shadowGradient);
    
    // Add event listeners
    
  }
}

function updateShadows(card, transition, transform, duration) {
  var collection = card.parentElement.parentElement;
  var shadowCard = collection.querySelectorAll('div.shadow-card')[0];
  var shadowCardGradient = collection.querySelectorAll('div.shadow-card-gradient')[0];
  
  shadowCard.style.webkitTransition = transition;
  shadowCardGradient.style.webkitTransition = transition;
  
  shadowCard.style.webkitTransform = transform;
  shadowCardGradient.style.webkitTransform = transform;
  
  shadowCard.style.webkitAnimation = "";
  shadowCardGradient.style.webkitAnimation = "";
  document.body.offsetTop;
  
  shadowCard.style.webkitAnimation = "smooth-step " + duration + "ms";
  shadowCardGradient.style.webkitAnimation = "smooth-step-gradient " + duration + "ms";
}
