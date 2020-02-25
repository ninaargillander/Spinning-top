import { euler } from './euler.js';
import { ourRotationY } from './ourRotationY.js';
import { psiRotation } from './psiRotation.js';
import { axisAngle } from './axisAngle.js';

var scene = new THREE.Scene();
var container = new THREE.Group();
var containerChild = new THREE.Object3D();0
var camera = new THREE.PerspectiveCamera(750, window.innerWidth / window.innerHeight, 0.1, 1000);
var object = new THREE.Geometry();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//var geometry = new THREE.BoxGeometry(1, 1, 1);
//var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.z = 20;
camera.position.y = 5;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 100, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

scene.add(container);
container.add(containerChild);

//Ekvationer
var F = 1;
var r = 0.02;
var delta_t = 1;
var m = 0.5;
var h = 0.04;
var g = 9.82;
var H = 1 / 60;

var I3 = (3 * m * r * r) / 10;

var psi_dot = (F * r * delta_t) / I3;

var psi = [];
psi[0] = 0;

var rotation_psi = [];
var originalPosition = [];

var howManyPsi = 1000;

var objLoader = new THREE.OBJLoader();
objLoader.setPath('/assets/');
objLoader.load('cyborg.obj', function (object) {

	object.position.x = 0;
	object.position.y = 3;
	object.position.z = 0;
	originalPosition = [object.position.x, object.position.y, object.position.z];

	containerChild.add(object);

	//
	// Här har vi ett problem: vi borde kunna ändra variabeln .....up för att få snurran att vinklas mot 
	// en viss punkt, dvs typ rotationsaxeln som vi vill ha. Nu kan vi vinkla den med axisAngle()
	// men den roterar fortfarande kring världens y-axel (se psiRotation() för mer specifikt).
	//

	console.log(object.parent.children["0"].children["0"].up.x);
	object.parent.children["0"].children["0"].up.x = 1;

	console.log(object.parent.children["0"].children["0"].up.x)

	object.parent.children["0"].children["0"].up.y = 0;
	object.parent.children["0"].children["0"].up.z = 0;



	for (var i = 0; i < howManyPsi; ++i) {

		psi[i + 1] = euler(psi[i], psi_dot, H);
	}

});

var k = 0;

var animate = function () {
	//Uppdaterar 60 fps 
	requestAnimationFrame(animate);

	//axisAngle(container, 10);
	psiRotation(container, psi[k]);

	if (k == howManyPsi) k = 0;
	//console.log('K: ' + k)
	k++;

	renderer.render(scene, camera);
};

setTimeout(animate(), 100);