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

controls.maxPolarAngle = (1.57) // Limitando a rotação em y (para não passar do chão)
controls.minDistance = 3 // Limitando o zoom mínimo
controls.maxDistance = 15 // Limitando o zoom máximo
controls.update();

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------

camera.position.z = 7;

//----------------------------------------------------------------------------

{ //PAREDES
    const m = new THREE.MeshPhongMaterial( { color: new THREE.Color('rgb(36, 47, 64)'), side: THREE.DoubleSide,} );
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

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshPhongMaterial( { color: new THREE.Color('white') } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//----------------------------------------------------------------------------

const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );

//----------------------------------------------------------------------------

{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set(-2.5, 3.8, 2);
    scene.add( light );

    
    const geometry = new THREE.SphereGeometry(0.3, 10, 10);
    const material = new THREE.MeshPhongMaterial( { color: new THREE.Color('yellow') } );
    const lightSphere = new THREE.Mesh( geometry, material );
    lightSphere.position.set( -2.6, 3.9, 2.1)
    scene.add( lightSphere );
    
}

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();