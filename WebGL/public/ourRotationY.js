export function ourRotationY(object, angle, originalPosition) {
    var position;

    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var yRot = [];

    yRot[0] = [cos, 0, sin];
    yRot[1] = [0, 1, 0];
    yRot[2] = [-sin, 0, cos];

    var result = matrixMult(originalPosition, yRot);

    parent.children["3"].geometry.attributes.position.array = originalPosition + result;



    //console.log('Original: ' + originalPosition);
    //console.log('Result: ' + result);
}

function matrixMult(A, B) {
    var result = [];

    //console.log('A: ' + A);
    console.log('A.length: ' + A.length);
    for (var i = 0; i + 2 < A.length / 6; i += 3) {

        console.log('Jag är INTEEEE färdig')
        result[i] = A[i] * B[0][0] + A[i + 1] * B[1][0] + A[i + 2] * B[2][0];
        result[i + 1] = A[i] * B[0][1] + A[i + 1] * B[1][1] + A[i + 2] * B[2][1];
        result[i + 2] = A[i] * B[0][2] + A[i + 1] * B[1][2] + A[i + 2] * B[2][2];

    }
    console.log('Jag är FÄÄÄÄÄRDIIIG')

    //console.log('Result matrixMult: ' + result)
    return result;
}