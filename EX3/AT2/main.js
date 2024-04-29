import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector( '#c' );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color('rgb(191, 156, 84)');

//----------------------------------------------------------------------------

const controls = new OrbitControls( camera, renderer.domElement ); //ELEMENTO QUE GERENCIA OS CONTROLES DO MOUSE
camera.position.z = 7;

controls.maxPolarAngle = (Math.PI/2)// Limitando a rotação em y (para não passar do chão)
controls.minDistance = 3 // Limitando o zoom mínimo
controls.maxDistance = 15 // Limitando o zoom máximo
controls.update();

//----------------------------------------------------------------------------

const m = new THREE.MeshPhongMaterial( { color: new THREE.Color('rgb(36, 47, 64)') } );
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), m)
floor.rotateX(-Math.PI / 2)
floor.position.y = -1;
scene.add(floor)

//----------------------------------------------------------------------------

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshPhongMaterial( { color: new THREE.Color('skyblue'), shininess: 250 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//----------------------------------------------------------------------------

const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );

//----------------------------------------------------------------------------
{
    const color = 0xFFFFFF;
    const intensity = 300;
    const light = new THREE.PointLight( color, intensity );
    light.position.set( -3, 10, 10 );
    scene.add( light );
}

{
    const color = 0xFFFFFF;
    const intensity = 300;
    const light = new THREE.PointLight( color, intensity );
    light.position.set( -5, 10, -1 );
    scene.add( light );
}



function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();

export {scene, camera}