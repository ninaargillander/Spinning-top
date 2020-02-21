export function psiRotation(object, angle) {
    //Troligtvis gör .rotation att den roterar kring worldAxis
    object.parent.children["3"].rotation.y = angle;


};