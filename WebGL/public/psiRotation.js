export function psiRotation(object, angle) {
    // Troligtvis gör .rotation att den roterar kring worldAxis
    // finns en finfin förklaring på https://github.com/mrdoob/three.js/issues/910
    // Dock går det inte att lösa på samma sätt då three.js har uppdaterats
    
    //object.parent.children["3"].rotation.order = "ZXY";
    //object.parent.children["3"].rotation.x =  0.4;
    //object.parent.children["3"].rotation.z =  0.4;
    //object.parent.children["3"].rotation.y = angle/100;

    //object.rotation.y = 0.4;

    object.children["0"].rotation.order = "ZXY"

    //object.children["0"].rotation.x = 0.4;

    object.children["0"].rotation.y = angle;

    object.rotation.y = angle/100;
    object.rotation.z = angle/1000;
    

   
   // object.eulerOrder= "YZX";


};