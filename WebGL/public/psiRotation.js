export function psiRotation(object, angle) {

    //Bestämmer axlarnas rotationsordning till först rotation runt z, sen x, sen y
    object.children["0"].children["0"].rotation.order = "ZXY"

    //Sätter rotation runt egen axel.
    object.children["0"].children["0"].rotation.y = angle;
    //console.log(object);
};