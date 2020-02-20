import { euler } from './euler.js';
import { ourRotationY } from './ourRotationY.js';

var scene = new THREE.Scene();
var parent = new THREE.Group();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

scene.add(parent);

//Ekvationer
var F = 1;
var r = 0.02;
var delta_t = 1;
var m = 0.5;
var h = 0.04;
var g = 9.82;
var H = 0.001;

var I3 = (3 * m * r * r) / 10;

var psi_dot = (F * r * delta_t) / I3;

var psi = [];
psi[0] = 0;

var rotation_psi = [];
var originalPosition = [];

var objLoader = new THREE.OBJLoader();
objLoader.setPath('/assets/');
objLoader.load('Test_snurra.obj', function (object) {
	//Får ej stå i origo för att kunna beräkna rotation. 
	object.position.x = 1;
	object.position.y -= 5;
	object.position.z = 1;

	parent.add(object);

	originalPosition = object.children["0"].geometry.attributes.position.array;

	for (var i = 0; i < 1000; ++i) {
		psi[i + 1] = euler(psi[i], psi_dot, H);
		//rotation_psi = ourRotationY(object, psi[i], originalPosition)

		//delta_psi[i] = psi[i + 1] - psi[i];
		//		console.log('Delta psi: ' + delta_psi[i]);

	}


	//setInterval(function () { ourRotationY(object, psi, originalPosition) }, 100);



});
var k = 0;
var animate = function () {
	requestAnimationFrame(animate);

	setTimeout(ourRotationY(parent, k++, originalPosition), 100);

	renderer.render(scene, camera);
};

animate();