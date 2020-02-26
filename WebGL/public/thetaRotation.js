export function thetaRotation(object, angle) {
   
    //Sätter ordningen av vilka rotationer utförs först
    object.parent.rotation.order = "YXZ";
    
    //Roterar containern, så objektet roteras runt världens x- och z-axel
    object.parent.rotation.z = angle;
    object.parent.rotation.x = angle;
   
};
