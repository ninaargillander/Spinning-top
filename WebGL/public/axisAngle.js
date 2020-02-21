export function axisAngle(object, angle) {

    var fromVector = new THREE.Vector3(0, 1, 0).normalize();
    var toVector = new THREE.Vector3(1, 1, 0).normalize();

    // Här sätter vi till vilken vektor som snurran ska roteras
    object.parent.children["3"].quaternion.setFromUnitVectors(fromVector, toVector);


    /*    var fromVector = new THREE.Vector3(1, 1, 0).normalize();
       var toVector = new THREE.Vector3(1, 1, 0).normalize();
   
       object.rotateOnAxis(fromVector, angle);
   
       //var quat = new THREE.Quaternion().setFromAxisAngle(fromVector, angle);
       //object.parent.children["3"].position.applyQuaternion(quat);
   
   
   
       //object.parent.children["3"].quaternion.setFromUnitVectors(fromVector, toVector); */
};
