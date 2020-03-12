import { euler } from './euler.js';
import { psiRotation } from './psiRotation.js';
import { precession } from './precession.js';
import { thetaRotation } from './thetaRotation.js';


//*********************Skapar scenen************************//
var scene = new THREE.Scene();
var container = new THREE.Group();
var mainContainer = new THREE.Group();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ange position för kameran
camera.position.z = 20;
camera.position.y = 5;

//Ljuskällor
var backLight = new THREE.HemisphereLight(new THREE.Color('hsl(34, 45%, 80%)'), new THREE.Color('hsl(30, 38%, 50%)'), 1);
scene.add(backLight)

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(210, 100%, 75%)'), 0.75);
fillLight.position.set(100, 100, 0);

//Skugga
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

fillLight.castShadow = true;
fillLight.shadowDarkness = 1;

fillLight.shadow.camera.near = 0.5;
fillLight.shadow.camera.far = 5000;

fillLight.shadow.camera.right = 50;
fillLight.shadow.camera.left = -50;
fillLight.shadow.camera.top = 50;
fillLight.shadow.camera.bottom = -50;

scene.add(fillLight);
//**********************************************************//

//************************Miljö*****************************//

var textureLoader = new THREE.TextureLoader();

//Skapar golv och textur
var floorPlane = new THREE.PlaneBufferGeometry(100, 100, 100);
var floorTexture = textureLoader.load('/img/ten.jpg');
var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });

//Skapar "himmel" och textur
var skyPlane = new THREE.PlaneBufferGeometry(150, 150, 150);
var skyTexture = textureLoader.load('/img/nz.jpg');
var skyMaterial = new THREE.MeshPhongMaterial({ map: skyTexture });

//Textur ska upprepas
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(8, 8);

skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;

//Skapa mesh av planen med textur
var sky = new THREE.Mesh(skyPlane, skyMaterial);
sky.position.set(0, 0, -25)

var floor = new THREE.Mesh(floorPlane, floorMaterial);
floor.rotateX(-Math.PI / 2);
floor.receiveShadow = true;

//Lägg allt till scenen
scene.add(mainContainer);
mainContainer.add(container);
scene.add(sky)
scene.add(floor);

//***********************************************************//

//*******************Ekvationer*****************************//

//Snurrans egenskaper
var mass = 0.1;
var radius = 0.02;
var height = 0.07;
var com = 3 * height / 4; 	// center of mass, masscentrum
var g = 9.82;				// gravitation

//Initial snurr
var appliedForce = 2;
var delta_t = 0.1;

//Tröghetsmoment
var Inertia = (3 * mass * radius * radius) / 10;

//Tidssteg mellan vilka vinklarna ska beräknas
var stepLength = 1 / 60;	// Delat på 60 ty frame rate är vanligtvis 60 fps

//Psi dot, vinkelhastigheten för vinkel psi
var psi_dot = (appliedForce * radius * delta_t) / Inertia;

//Phi dot, vinkelhastigheten för vinkeln phi
var phi_dot = mass * g * com / (psi_dot * Inertia);


//*****************************************************************//

//******************Läs in snurran med textur*********************//

// MTLLoader includeras genom assets/MTLLoader.js
// MTLLoader krävs för att ladda in texturen till snurran
// Koden i MTLLoader.js är skriven av @author angelxuanchang
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('spintop.mtl', function (materials) {

	materials.preload();

	// OBJLoader includeras genom assets/OBJLoader.js
	// OBJLoader laddar in snurran som ett objekt
	// Koden i OBJLoader.js är skriven av @author mrdoob / http://mrdoob.com/
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('/assets/');
	objLoader.load('spintop.obj', function (object) {

		// Ange objektets position i världen
		object.position.x = 0;
		object.position.y = 0.45;
		object.position.z = 0;

		// Gör så att objektet kastar skugga
		object.children["0"].castShadow = true;
		object.recieveShadow = false;

		container.add(object);

	});
})



//****************************************************************//
var psi_old = 0; 	//startvärdet för vinkeln psi antas vara noll
var phi_old = 0;	//startvärdet för vinkeln phi antas vara noll
var psi_new = 0;	//Variabel som kommer att ersättas med det uträknade värdet för nästa vinkel psi
var phi_new = 0;	//Variabel som kommer att ersättas med det uträknade värdet för nästa vinkel phi

var animate = function () {
	//Uppdaterar 60 fps 
	requestAnimationFrame(animate);

	// Nästa vinkel för psi och phi beräknas med hjälp av Eulers stegmetod
	psi_new = euler(psi_old, psi_dot, stepLength);
	phi_new = euler(phi_old, phi_dot, stepLength);

	// Rotation av snurran
	psiRotation(container, psi_new);			// Psivinkeln sätts till den nya vinkeln
	precession(container, phi_new);				// Phivinkeln sätts till den nya vinkeln
	thetaRotation(container, Math.PI / 12);		// Sätt snurran att luta med en vinkel theta = pi / 12.

	// Sätt de uträknade vinklarna till de "gamla" vinklarna
	psi_old = psi_new;
	phi_old = phi_new;

	// Rendera scenen
	renderer.render(scene, camera);
};

setTimeout(animate(), 100);

