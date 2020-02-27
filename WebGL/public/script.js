import { euler } from './euler.js';
import { psiRotation } from './psiRotation.js';
import { precession } from './precession.js';
import { thetaRotation } from './thetaRotation.js';

var scene = new THREE.Scene();
var container = new THREE.Object3D();
var mainContainer = new THREE.Group();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //75 för snurran, 750 för cyborg
//var object = new THREE.Geometry();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//var geometry = new THREE.BoxGeometry(1, 1, 1);
//var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.z = 20;
camera.position.y = 5; //fem för snurran

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 100, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var floorPlane = new THREE.PlaneBufferGeometry(100, 100, 100);
//var floorMaterial = new THREE.MeshBasicMaterial();

var textureLoader = new THREE.TextureLoader();
var floorTexture = textureLoader.load('/assets/floor.jpg');
var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });

floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(2, 2);

var floor = new THREE.Mesh(floorPlane, floorMaterial);
floor.rotateX(-Math.PI / 2);


scene.add(mainContainer);
mainContainer.add(container);
scene.add(floor);

//*******************Ekvationer*****************************//

//Snurrans egenskaper
var mass = 0.5;
var radius = 0.02;
var height = 0.04;
var com = 3 * height / 4;
var g = 9.82;

//Initial snurr
var appliedForce = 1;
var delta_t = 1;

//Tröghetsmoment
var I1 = mass * ((3 / 20) * radius * radius + (3 / 80) * height * height);
var I3 = (3 * mass * radius * radius) / 10;

//Beräkning av Euler-vinklar
var stepLength = 1 / 60;
var howManyPsi = 1000;

//Psi
var psi_dot = (appliedForce * radius * delta_t) / I3;
var psi = [];
psi[0] = 0;

//Phi
var phi_dot = mass * g * com / (psi_dot * I1);
var phi = [];
phi[0] = 0;


//Eulervinklar
for (var i = 0; i < howManyPsi; ++i) {
	psi[i + 1] = euler(psi[i], psi_dot, stepLength);
	phi[i + 1] = euler(phi[i], phi_dot, stepLength);
}
//*****************************************************************//


var objLoader = new THREE.OBJLoader();
objLoader.setPath('/assets/');
objLoader.load('test_snurra.obj', function (object) {

	object.position.x = 0;
	object.position.y = 0;
	object.position.z = 0;

	container.add(object);

});

var k = 0;

var animate = function () {
	//Uppdaterar 60 fps 
	requestAnimationFrame(animate);

	//axisAngle(container, 10);
	psiRotation(container, psi[k]);
	precession(container, phi[k]);
	thetaRotation(container, 0.4);

	if (k == howManyPsi) k = 0;
	//console.log('K: ' + k)
	k++;

	renderer.render(scene, camera);
};

setTimeout(animate(), 100);