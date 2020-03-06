export function psiRotation(object, angle) {
<<<<<<< HEAD
=======
   
>>>>>>> 66d91b435c90bc7456460ac153a30f63e651410c
    //Bestämmer axlarnas rotationsordning till först rotation runt z, sen x, sen y
    object.children["0"].children["0"].rotation.order = "ZXY"

    //Sätter rotation runt egen axel.
    object.children["0"].children["0"].rotation.y = angle;
<<<<<<< HEAD
};



=======
    //console.log(object);

};
>>>>>>> 66d91b435c90bc7456460ac153a30f63e651410c
