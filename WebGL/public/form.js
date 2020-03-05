
export function userInputForm() {
    var form = document.createElement("form");

    // document.getElementsByTagName('body').innerHTML = "<h2>Force: </h2>";
    var force = document.createElement("input");
    force.setAttribute('type', "number");
    force.setAttribute('id', 'force');
    force.setAttribute('placeholder', 'force');

    var dt = document.createElement("input");
    dt.setAttribute('type', "number");
    dt.setAttribute('id', 'dt');
    dt.setAttribute('placeholder', 'delta t');

    var s = document.createElement("button");
    //s.setAttribute('type', "submit");
    s.setAttribute('value', "submit");
    s.setAttribute('onclick', 'onSubmit();');

    form.appendChild(force);
    form.appendChild(dt);
    form.appendChild(s);

    document.getElementsByTagName('body')[0].appendChild(form);

    var theForce = form.elements[0].value;
    var deltaT = document.getElementById("dt").value;

    console.log('theForce: ' + theForce);
    console.log("deltaT: " + deltaT);

    return [theForce, deltaT];
}
