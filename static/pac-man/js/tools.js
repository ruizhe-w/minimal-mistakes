function addCircle(parentElement, cx, cy, r, className, id) {
    var newCircle = document.createElementNS(SVG_NS, "circle");
    newCircle.setAttributeNS(null, "cx", cx);
    newCircle.setAttributeNS(null, "cy", cy);
    newCircle.setAttributeNS(null, "r", r);
    newCircle.setAttributeNS(null, "class", className);
    newCircle.setAttributeNS(null, "id", id);
    parentElement.appendChild(newCircle);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}