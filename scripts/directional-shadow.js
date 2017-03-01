var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    updateShadows(mutation.target);
  });
});

var config = { attributeFilter: ["style"], };
var styleElement;

function initializeDirectionalShadow(clip) {
  var cards = clip.querySelectorAll('div.directional-shadow');

  // Insert shadow divs for each directional-shadow element.
  for (var i = 0; i < cards.length; i++) {
    var elem = cards[i];
    var style = window.getComputedStyle(elem, null);

    var zAdjust = "translateZ(" + style.getPropertyValue("transform-origin").split(" ")[0] + ")";
    elem.style.transform = zAdjust;
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

    var shadowGradient = document.createElement("div");
    shadowGradient.className="shadow-gradient";
    shadowGradient.style.width = (elem.offsetWidth - 10) + "px";
    shadowGradient.style.height = (elem.offsetHeight - 10) + "px";

    shadowCard.style.transform = zAdjust;
    shadowCardGradient.style.transform = zAdjust;

    parent.insertBefore(shadowGradientPerspective, parent.childNodes[0]);
    shadowGradientPerspective.appendChild(shadowCardGradient);
    shadowCardGradient.appendChild(shadowGradient); 
    parent.degY = 0;

    // Add DOMMutObserver
    observer.observe(elem, config);
  }
  styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  var headElement = document.getElementsByTagName('head')[0];
  headElement.appendChild(styleElement);
}

function updateShadows(card, originDegX, originDegY, originDegZ) {
  var collection = card.parentElement.parentElement;
  var shadowCard = collection.querySelectorAll('div.shadow-card')[0];
  var shadowCardGradient = collection.querySelectorAll('div.shadow-card-gradient')[0];
  var shadow = collection.querySelectorAll('div.shadow')[0];
  var shadowGradient = collection.querySelectorAll('div.shadow-gradient')[0];

  var transition = card.style.transition;
  var transform = card.style.transform;

  var degXArr = transform.match(/rotateX\((\d+)deg\)/);
  var degYArr = transform.match(/rotateY\(([\d\.]+)deg\)/);
  var degZArr = transform.match(/rotateZ\((\d+)deg\)/);

  originDegY = collection.degY;
  var degX = 0, degY = 0, degZ = 0;
  if (degXArr)
    degX = parseFloat(degXArr[1]);
  if (degYArr && degX == 0)
    degY = parseFloat(degYArr[1]);
  if (degZArr && degX == 0 && degY == 0)
    degZ = parseFloat(degZArr[1]);

  collection.degY = degY;
  var webkitTransition = card.style.webkitTransition;
  var webkitTransform = card.style.webkitTransform;

  var transitionDuration = "";
  if (transition == null || transition == undefined)
    transitionDuration = transition.split(" ")[1];
  else transitionDuration = webkitTransition.split(" ")[1];

  // Update shadow transition and transforms
  shadowCard.style.webkitTransition = webkitTransition;
  shadowCardGradient.style.webkitTransition = webkitTransition;

  shadowCard.style.webkitTransform = webkitTransform;
  shadowCardGradient.style.webkitTransform = webkitTransform;

  // Modify shadow gradient direction if needed.
  if (degY % 360 > 90 && degY % 360 <= 270) {
    shadowGradient.style.backgroundImage =
        "-webkit-linear-gradient(left, #DCDCDC, #808080)";
  } else {
    shadowGradient.style.backgroundImage =
        "-webkit-linear-gradient(right, #DCDCDC, #808080)";
  }

  // Shadow and gradient opacity animation, we do not support rotations greater
  // than 360 degrees.
  var y0 = parseFloat(originDegY) % 360;
  var y1 = degY % 360;

  var x0 = 0, x1 = 0;
  var location0 = 0, location1 = 0;
  if (y0 < 90) {
    x0 = y0 / 90;
    location0 = 1;
  } else if (y0 < 180) {
    x0 = 2 - y0 / 90;
    location0 = 2;
  } else if (y0 < 270) {
    x0 = y0 / 90 - 2;
    location0 = 3;
  } else {
    x0 = 4 - y0 / 90;
    location0 = 4;
  }

  if (y1 < 90) {
    x1 = y1 / 90;
    location1 = 1;
  } else if (y1 < 180) {
    x1 = 2 - y1 / 90;
    location1 = 2;
  } else if (y1 < 270) {
    x1 = y1 / 90 - 2;
    location1 = 3;
  } else {
    x1 = 4 - y1 / 90;
    location1 = 4;
  }

  var opacity0 = 0.0 + cubicBezier(0.6, 0.0, 0.4, 1.0, x0);
  var opacity1 = 0.0 + cubicBezier(0.6, 0.0, 0.4, 1.0, x1);
  var inverseOpacity0 = 1.0 - opacity0;
  var inverseOpacity1 = 1.0 - opacity1;
  var keyFrames = '';
  var keyFramesInverse = '';
  var keyframePrefix = '@-webkit-keyframes smooth-shadow-gradient { ';
  var keyframePrefixInverse = '@-webkit-keyframes smooth-shadow { ';
  var opacityPrefix = ' { opacity: ';
  var timingFunction = '; -webkit-animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1.0); } ';
  var keyFrameSuffix = '}';
  if (location0 == location1) {
    keyFrames = keyframePrefix
        + '0% ' + opacityPrefix + opacity0 + timingFunction
        + '100% ' + opacityPrefix + opacity1 + timingFunction
        + keyFrameSuffix;
    keyFramesInverse = keyframePrefixInverse
        + '0% ' + opacityPrefix + inverseOpacity0 + timingFunction
        + '100% ' + opacityPrefix + inverseOpacity1 + timingFunction
        + keyFrameSuffix;
  } else if (location0 + location1 == 5) {
    // 1->4, 4->1, 2->3 or 3->2
    var percentage = (90.0 * location0 - y0) * 100.0 / ((y1 - y0) % 360);
    keyFrames = keyframePrefix
        + '0% ' + opacityPrefix + opacity0 + timingFunction
        + percentage + '% ' + opacityPrefix + '0.1' + timingFunction
        + '100% ' + opacityPrefix + opacity1 + timingFunction
        + keyFrameSuffix;
    keyFramesInverse = keyframePrefixInverse
        + '0% ' + opacityPrefix + inverseOpacity0 + timingFunction
        + percentage + '% ' + opacityPrefix + '0.9' + timingFunction
        + '100% ' + opacityPrefix + inverseOpacity1 + timingFunction
        + keyFrameSuffix;
  } else if (location0 - location1 == 1 || location0 - location1 == -1) {
    // 1->2, 2->1, 3->4 or 4->3
    var percentage = (90.0 * location0 - y0) * 100.0 / ((y1- y0) % 360);
    keyFrames = keyframePrefix
        + '0% ' + opacityPrefix + opacity0 + timingFunction
        + percentage + '% ' + opacityPrefix + '0.9' + timingFunction
        + '100% ' + opacityPrefix + opacity1 + timingFunction
        + keyFrameSuffix;
    keyFramesInverse = keyframePrefixInverse
        + '0% ' + opacityPrefix + inverseOpacity0 + timingFunction
        + percentage + '% ' + opacityPrefix + '0.1' + timingFunction
        + '100% ' + opacityPrefix + inverseOpacity1 + timingFunction
        + keyFrameSuffix;
  } else {
    var criteria1 = (location0 + location1 == 4);
    var criteria2 = (y1 - y0) % 360 < 180;
    var percentage1, percentage2 = 0;
    if (criteria2) {
      percentage1 = (90.0 * location0 - y0) * 100.0 / ((y1 - y0) % 360);
      percentage2 = (90.0 * location0 + 90.0 - y0) * 100.0 / ((y1 - y0) % 360);
    } else {
      percentage1 = (y0 - 90.0 * (location0 - 1)) * 100.0 / ((y1 - y0) % 360);
      percentage2 = (y0 - 90.0 * (location0 - 2)) * 100.0 / ((y1 - y0) % 360);
    }
    if ((criteria1 && criteria2) || (!criteria1 && !criteria2)) {
      keyFrames = keyframePrefix
          + '0% ' + opacityPrefix + opacity0 + timingFunction
          + percentage1 + '% ' + opacityPrefix + '0.9' + timingFunction
          + percentage2 + '% ' + opacityPrefix + '0.1' + timingFunction
          + '100% ' + opacityPrefix + opacity1 + timingFunction
          + keyFrameSuffix;
      keyFramesInverse = keyframePrefixInverse
          + '0% ' + opacityPrefix + inverseOpacity0 + timingFunction
          + percentage1 + '% ' + opacityPrefix + '0.1' + timingFunction
          + percentage2 + '% ' + opacityPrefix + '0.9' + timingFunction
          + '100% ' + opacityPrefix + inverseOpacity1 + timingFunction
          + keyFrameSuffix;
    } else {
      keyFrames = keyframePrefix
          + '0% ' + opacityPrefix + opacity0 + timingFunction
          + percentage1 + '% ' + opacityPrefix + '0.1' + timingFunction
          + percentage2 + '% ' + opacityPrefix + '0.9' + timingFunction
          + '100% ' + opacityPrefix + opacity1 + timingFunction
          + keyFrameSuffix;
      keyFramesInverse = keyframePrefixInverse
          + '0% ' + opacityPrefix + inverseOpacity0 + timingFunction
          + percentage1 + '% ' + opacityPrefix + '0.9' + timingFunction
          + percentage2 + '% ' + opacityPrefix + '0.1' + timingFunction
          + '100% ' + opacityPrefix + inverseOpacity1 + timingFunction
          + keyFrameSuffix;
    }
  }

  styleElement.innerHTML = keyFrames + " " + keyFramesInverse;
  shadowCardGradient.style.webkitAnimation = "smooth-shadow-gradient " + transitionDuration;
  shadowCardGradient.style.opacity = opacity1;
  shadowCard.style.webkitAnimation = "smooth-shadow " + transitionDuration;
  shadowCard.style.opacity = inverseOpacity1;
}

function cubicBezier(p1x, p1y, p2x, p2y, x) {
  var a = 3 * p1x - 3 * p2x + 1;
  var b = -6 * p1x + 3 * p2x;
  var c = 3 * p1x;

  var left = 0.0, right = 1.0, epsilon = 0.001;
  var lv = 0.0, rv = 1.0;
  if (x != 0 && x != 1) {
    while (right - left > epsilon) {
      var mid = (left + right) / 2;
      var mv = tToCubicBezier(a, b, c, mid);
      if (x == mv) {
        left = mv;
        break;
      } else if (x < mv) {
        right = mid;
      } else {
        left = mid;
      }
    }
  }

  var ay = 3 * p1y - 3 * p2y + 1;
  var by = -6 * p1y + 3 * p2y;
  var cy = 3 * p1y;

  if (x == 1) left = 1;
  return ((ay * left + by) * left + cy) * left;
}

function tToCubicBezier(a, b, c, t) {
  return ((a * t + b) * t + c) * t;
}
