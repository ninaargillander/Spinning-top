import { euler } from './euler.js';
import { psiRotation } from './psiRotation.js';
import { precession } from './precession.js';
import { thetaRotation } from './thetaRotation.js';

var scene = new THREE.Scene();
var container = new THREE.Object3D();
var mainContainer = new THREE.Group();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //75 för snurran, 750 för cyborg

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Skugga
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;


camera.position.z = 20;
camera.position.y = 5; //fem för snurran

var box = new THREE.BoxGeometry(3, 3, 3);
var boxMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(box, boxMaterial);
cube.position.set(0, 3, 0)

cube.castShadow = true;
cube.receiveShadow = true;

scene.add(cube);


var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(210, 100%, 75%)'), 0.75);
fillLight.position.set(0, 10, 0);
//fillLight.target.position.set(0, 0, 0);

var backLight = new THREE.HemisphereLight(new THREE.Color('hsl(34, 45%, 80%)'), new THREE.Color('hsl(30, 38%, 50%)'), 1);

fillLight.castShadow = true;
//skugga
fillLight.castShadow = true;
fillLight.shadowDarkness = 0.5;

fillLight.shadowCameraNear = 15;
fillLight.shadowCameraFar = -10;

fillLight.shadow.bias = 0.0001;

fillLight.shadow.mapSize.width = 1024;
fillLight.shadow.mapSize.height = 1024;

/*
fillLight.shadowCameraRight = 5;
fillLight.shadowCameraLeft = -5;
fillLight.shadowCameraTop = 5;
fillLight.shadowCameraBottom = -5;

*/

scene.add(fillLight);
scene.add(backLight);

var textureLoader = new THREE.TextureLoader();

//Skapar golv och textur
var floorPlane = new THREE.PlaneBufferGeometry(100, 100, 100);
var floorTexture = textureLoader.load('/img/ten.jpg');
var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });

//Skapar "himmel" och textur
var skyPlane = new THREE.PlaneBufferGeometry(150, 150, 150);
var skyTexture = textureLoader.load('/img/nz.jpg');
var skyMaterial = new THREE.MeshPhongMaterial({ map: skyTexture });

//Textur ska repeatas
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(8, 8);

skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
//skyTexture.repeat.set(5, 5);

//Skapa mesh av planen med textur
var sky = new THREE.Mesh(skyPlane, skyMaterial);
sky.position.set(0, 0, -25)

var floor = new THREE.Mesh(floorPlane, floorMaterial);
floor.rotateX(-Math.PI / 2);


scene.add(mainContainer);
mainContainer.add(container);
scene.add(sky)
scene.add(floor);

//floor.recieveShadow = true;

floor.receiveShadow = true;

//ta bort 
scene.add(new THREE.CameraHelper(camera))
var helper = new THREE.CameraHelper(fillLight.shadow.camera);
scene.add(helper);

console.log(fillLight);
//*******************Ekvationer*****************************//

//Snurrans egenskaper
var mass = 0.5;
var radius = 0.02;
var height = 0.04;
var com = 3 * height / 4;
var g = 9.82;

//Initial snurr
var appliedForce = 1;
var delta_t = 0.01;

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

/*
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('spintop.mtl', function (materials) {
	materials.preload();

	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('/assets/');
	objLoader.load('spintop.obj', function (object) {

		object.position.x = 0;
		object.position.y = 2;
		object.position.z = 0;

		object.castShadow = true;
		object.recieveShadow = false;

		container.add(object);

	});
})
*/
var k = 0;

var animate = function () {
	//Uppdaterar 60 fps 
	requestAnimationFrame(animate);

	psiRotation(container, psi[k]);
	precession(container, phi[k]);
	thetaRotation(container, 0.4);

	if (k == howManyPsi) k = 0;
	//console.log('K: ' + k)
	k++;

	renderer.render(scene, camera);
};

setTimeout(animate(), 100);