export function precession(object, angle) {
   
    //Roterar containern runt y-axeln, vilket blir världens y-axel
    object.parent.rotation.y = angle;
   
};
