var observer = new MutationObserver(function(mutations) {
                                    mutations.forEach(function(mutation) {
                                                      updateShadows(mutation.target);
                                                      });
                                    });

var config = { attributeFilter: ["style"], };

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
    shadowGradient.className="shadow-gradient";
    shadowGradient.style.width = (elem.offsetWidth - 10) + "px";
    shadowGradient.style.height = (elem.offsetHeight - 10) + "px";
   
    var shadowGradientBack = document.createElement("div");
    shadowGradientBack.className = "shadow-gradient-back";
    shadowGradientBack.style.width = (elem.offsetWidth - 10) + "px";
    shadowGradientBack.style.height = (elem.offsetHeight - 10) + "px";
    shadowGradientBack.style.transform = "rotateY(180deg)";
    shadowGradientBack.style.webkitTransform = "rotateY(180deg)";
	  
    parent.insertBefore(shadowGradientPerspective, parent.childNodes[0]);
    shadowGradientPerspective.appendChild(shadowCardGradient);
    shadowCardGradient.appendChild(shadowGradient);
    shadowCardGradient.appendChild(shadowGradientBack);
    
    // Add DOMMutObserver
    observer.observe(elem, config);
  }
}

function updateShadows(card) {
  var collection = card.parentElement.parentElement;
  var shadowCard = collection.querySelectorAll('div.shadow-card')[0];
  var shadowCardGradient = collection.querySelectorAll('div.shadow-card-gradient')[0];
  
  var transition = card.style.transition;
  var transform = card.style.transform;
  var webkitTransition = card.style.webkitTransition;
  var webkitTransform = card.style.webkitTransform;
  
  shadowCard.style.webkitTransition = webkitTransition;
  shadowCardGradient.style.webkitTransition = webkitTransition;
  
  shadowCard.style.webkitTransform = webkitTransform;
  shadowCardGradient.style.webkitTransform = webkitTransform;
}
