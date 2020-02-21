export function psiRotation(object, angle) {
    // Troligtvis gör .rotation att den roterar kring worldAxis
    // finns en finfin förklaring på https://github.com/mrdoob/three.js/issues/910
    // Dock går det inte att lösa på samma sätt då three.js har uppdaterats
    object.parent.children["3"].rotation.y = angle;


};