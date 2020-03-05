
export function userInputForm() {
    var form = document.createElement("form");

    // document.getElementsByTagName('body').innerHTML = "<h2>Force: </h2>";
    var force = document.createElement("input");
    force.setAttribute('type', "number");
    force.setAttribute('id', 'force');
    force.setAttribute('placeholder', 'force');
    /*
        var dt = document.createElement("input");
        dt.setAttribute('type', "number");
        dt.setAttribute('id', 'dt');
        dt.setAttribute('placeholder', 'delta t');*/

    var s = document.createElement("button");
    s.setAttribute('id', "ja");
    s.setAttribute('value', "submit");
    //s.setAttribute('onclick', 'onSubmit();');

    form.appendChild(force);
    // form.appendChild(dt);
    form.appendChild(s);
    document.getElementsByTagName('body')[0].appendChild(form);

    var var1;

    function callSubmit() {
        var1 = document.getElementById('force').value;
        console.log("this is var1: " + var1)
    }

    document.getElementById('ja').addEventListener('click', callSubmit
    )

    var theForce;
    /*
        function submit() {
            
     
            theForce = form.elements[0].value;
            deltaT = document.getElementById("dt").value;
     
            console.log('theForce: ' + theForce);
            console.log("deltaT: " + deltaT);
     
        }
     */

    return [theForce];
}
