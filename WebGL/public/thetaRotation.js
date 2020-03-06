export function thetaRotation(object, angle) {

    //Sätter ordningen av vilka rotationer utförs först
    object.rotation.order = "YXZ";
    console.log(object)
    //Roterar containern, så objektet roteras runt världens x- och z-axel
    object.children["0"].children["0"].rotation.z = angle;
    object.children["0"].children["0"].rotation.x = angle;

};
