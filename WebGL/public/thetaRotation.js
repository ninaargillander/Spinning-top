export function thetaRotation(object, angle) {

    //Sätter ordningen av vilka rotationer utförs först
    object.rotation.order = "YXZ";

    //Roterar containern, så objektet roteras runt världens x- och z-axel
    object.rotation.z = angle;
    object.rotation.x = angle;

};
