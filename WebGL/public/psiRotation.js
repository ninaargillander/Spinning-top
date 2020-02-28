export function psiRotation(object, angle) {

    //Bestämmer axlarnas rotationsordning till först rotation runt z, sen x, sen y
    object.parent.parent.children["2"].rotation.order = "ZXY"

    //Sätter rotation runt egen axel.
    object.parent.parent.children["2"].rotation.y = angle;

};