import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const canvas = document.querySelector( '#c' );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color('rgb(191, 156, 84)');
//----------------------------------------------------------------------------

const keyboard = new THREEx.KeyboardState();

const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const material = new THREE.MeshFaceMaterial([
        new THREE.MeshPhongMaterial({
           color: 0xff22cc,
           flatShading: true,
        }), // front
        new THREE.MeshPhongMaterial({
           color: 0xffcc22
        }), // side
     ])
     const text = new THREE.Mesh(geometry, material)
     text.position.z = 4
     scene.add(text)
} );

//----------------------------------------------------------------------------

camera.position.z = 9;

//----------------------------------------------------------------------------

{ //PAREDES
    const m = new THREE.MeshPhongMaterial( { color: new THREE.Color('rgb(109, 157, 175)'), side: THREE.DoubleSide, shadowSide: THREE.DoubleSide } );
    const largura = 10;
    const altura = 10;
    { //Parede da Esquerda
        const wall_left = new THREE.Mesh(new THREE.PlaneGeometry(altura, largura), m)
        wall_left.rotateY(Math.PI/2)
        wall_left.position.x = -4;
        scene.add(wall_left)
    }
    {
        const wall_right = new THREE.Mesh(new THREE.PlaneGeometry(altura, largura), m)
        wall_right.rotateY(Math.PI/2)
        wall_right.position.x = 4;
        scene.add(wall_right)
    }
    {
        const wall_up= new THREE.Mesh(new THREE.PlaneGeometry(altura, largura), m)
        wall_up.rotateX(Math.PI /2)
        wall_up.position.y = 4;
        scene.add(wall_up)
    }
    {
        const wall_down= new THREE.Mesh(new THREE.PlaneGeometry(altura, largura), m)
        wall_down.rotateX(Math.PI /2)
        wall_down.position.y = -4;
        scene.add(wall_down)
    }
}
//----------------------------------------------------------------------------

const radius = 1;
const geometry = new THREE.SphereGeometry(radius);
const material = new THREE.MeshPhongMaterial( { color: new THREE.Color('white'),  shininess: 300  } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//----------------------------------------------------------------------------

{
    const color = 0xFFFFFF;
    const intensity = 25;
    const light = new THREE.PointLight( color, intensity );
    light.position.set(-2.5, 2.8, 2);
    scene.add( light );
}

{
    const color = 0xFFFFFF;
    const intensity = 25;
    const light = new THREE.PointLight( color, intensity );
    light.position.set(2.5, 2.8, -2);
    scene.add( light );
}

let accelerationY = 0
let accelerationX = 0

function moveX() {

    if (keyboard.pressed('left')) {
        accelerationX += -0.001
    }
    if (keyboard.pressed('right')) {
        accelerationX += 0.001
    }

    if( sphere.position.x <= -4+radius || sphere.position.x >= 4-radius){
        accelerationX = -(accelerationX*0.95)
    }

    sphere.translateX(accelerationX)
}

function moveY() {

    if (keyboard.pressed('down')) {
        accelerationY += -0.001
    }
    if (keyboard.pressed('up')) {
        accelerationY += 0.001
    }
    if (sphere.position.y >= 4-radius || sphere.position.y <= -4+radius){
        accelerationY = -(accelerationY*0.95)
    }
    
    sphere.translateY(accelerationY)
}

function reset() {
    if (keyboard.pressed('c')) {
        sphere.position.x = 0
        sphere.position.y = 0
        accelerationX = 0
        accelerationY = 0
    }
}


function animate() {
	requestAnimationFrame( animate );

    moveX()
    moveY()
    reset()
    
	renderer.render( scene, camera );
}

animate();