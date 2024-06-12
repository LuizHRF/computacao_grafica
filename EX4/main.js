import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector( '#c' );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color('rgb(191, 156, 84)');
renderer.shadowMap.enabled = true;

//----------------------------------------------------------------------------

const controls = new OrbitControls( camera, renderer.domElement ); //ELEMENTO QUE GERENCIA OS CONTROLES DO MOUSE


controls.update();

//-----------------------------Chão----------------------------------------------

const m = new THREE.MeshPhongMaterial({color: new THREE.Color('darkBlue')});
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), m)
floor.rotateX(-Math.PI / 2)
floor.position.y = -1;
scene.add(floor);

const objects = new THREE.Group();

//-----------------------------Cubo----------------------------------------------

const cubeMaterial =  new THREE.MeshPhongMaterial();
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), cubeMaterial)
cube.position.set(0, 3, 5);
objects.add(cube);

//-----------------------------Toro----------------------------------------------

const torus = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.4, 100, 100), new THREE.MeshPhongMaterial({ color: new THREE.Color('lightBlue') }))
torus.position.set(0, 3, -5);
objects.add(torus);

//-----------------------------Dodecaedro----------------------------------------------

const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2), new THREE.MeshPhysicalMaterial( { color: new THREE.Color('orange')} ))
dodeca.position.set(-4, 5, 0);
objects.add(dodeca);

//-----------------------------Luz ambiente----------------------------------------------

const Light = new THREE.AmbientLight( 0x404040 ); 
scene.add( Light );

//-----------------------------Luz do "sol"----------------------------------------------
const sunLight = new THREE.Group();

const directionalLight = new THREE.DirectionalLight( {color: "white"}, 1 );
//sunLight.add(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.75, transparent: true, position: (1,1, 1)})));
sunLight.add(directionalLight);

sunLight.position.set( 30, 30, 30);
scene.add( sunLight );

//-----------------------------Luz point----------------------------------------------

const pointLight = new THREE.Group();

const spLight = new THREE.PointLight(  new THREE.Color('yellow'), 15); //Luz amarela
spLight.castShadow = true;
pointLight.add(new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshPhysicalMaterial({color: 'yellow', opacity: 0.75, transparent: true})));
pointLight.add(spLight);

pointLight.position.set( 0, 2.8, -5 );

scene.add( pointLight );

//-----------------------------Luz cone----------------------------------------------

const coneLight = new THREE.Group();

const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.4, 1), new THREE.MeshPhongMaterial( { color: new THREE.Color('cyan'), transparent: true} ))
coneLight.add(cone);
cone.position.y += 1.6;

const cLight = new THREE.SpotLight( new THREE.Color('yellow'), 15); 

cLight.angle = Math.PI/6;
cLight.target = cube;
coneLight.add(cLight);

coneLight.position.set(0, 7, 5);

const lightHelper = new THREE.SpotLightHelper( cLight );
scene.add( lightHelper );

scene.add( coneLight );

//---------------------------------------------------------------------------------------
scene.add(objects);

scene.traverse( function( child ) { 

    if ( child.isMesh ) {

        child.castShadow = true;
        child.receiveShadow = true;

    }

    if ( child.isLight ) {
        child.castShadow = true;
    }

} );

const offset = new THREE.Vector3(0, 0, 0)
const distance = 15;

function animate() {
	requestAnimationFrame( animate );

    for (const obj of objects.children) {

        const time = Date.now();
        obj.rotation.y += 0.005;
        obj.rotation.x += 0.005;
        pointLight.position.x = 1.5* Math.cos(time/400);

        
        offset.x =distance * Math.sin( time * 0.0002 );
        offset.z =distance * Math.cos( time * 0.0002 );

        camera.position.set(0,7,0).add( offset );
        camera.lookAt(0,0,0);

    }

	renderer.render( scene, camera );
}

animate();

export {scene, camera}