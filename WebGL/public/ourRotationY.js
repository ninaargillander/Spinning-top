export function ourRotationY(object, angle, originalPosition) {

    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var yRot = [];

    yRot[0] = [cos, 0, sin];
    yRot[1] = [0, 1, 0];
    yRot[2] = [-sin, 0, cos];

    var result = matrixMult(originalPosition, yRot);
    // console.log('Result rotation: ' + result)
    console.log('Original: ' + yRot);
    object.parent.children["3"].children["0"].children["0"].geometry.attributes.position.array = result + originalPosition;

    // object.position.set(result[0], result[1], result[2]);


    // console.log('Result: ' + result);
}

function matrixMult(A, B) {
    var result = [];

    //console.log('A: ' + A);
    //console.log('B: ' + B);

    result[0] = A[0] * B[0][0] + A[1] * B[1][0] + A[2] * B[2][0];
    result[1] = A[0] * B[0][1] + A[1] * B[1][1] + A[2] * B[2][1];
    result[2] = A[0] * B[0][2] + A[1] * B[1][2] + A[2] * B[2][2];

    // console.log('Result matrixMult: ' + result)
    return result;
}