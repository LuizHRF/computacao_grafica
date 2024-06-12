import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

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
camera.position.x = 150;
camera.position.y = 80;

controls.update();

//-----------------------------Chão----------------------------------------------

const m = new THREE.MeshPhongMaterial({color: new THREE.Color('White')});
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), m)
floor.rotateX(-Math.PI / 2)
floor.position.y = -1;
scene.add(floor);

//-----------------------------Luz ambiente----------------------------------------------

const Light = new THREE.AmbientLight( 0x404040 ); 
scene.add( Light );

//-----------------------------Luz do "sol"----------------------------------------------

const directionalLight = new THREE.DirectionalLight( {color: "white"}, 1 );

directionalLight.position.set( 30, 30, 30);
scene.add( directionalLight );

//-----------------------------Objetos---------------------------------------------------
const objects = new THREE.Group();

const FBXloader = new FBXLoader()
const ObLoader = new OBJLoader()

FBXloader.load('../44-casarosa5/casarosa5.fbx', (obj) => {
    obj.scale.set(0.1, 0.1, 0.1)
    obj.position.set(60,30,0)
    objects.add(obj)
});

ObLoader.load('../Heart_v1_L3.123cee89a2ce-bf99-486a-93b2-29faa8963112/12190_Heart_v1_L3.obj', (obj) => {
    obj.scale.set(0.5, 0.5, 0.5)
    obj.rotation.x =- Math.PI / 2
    obj.position.set(-60,2,0)
    objects.add(obj)
});

FBXloader.load('../94-chair_fbx/Modern Chair of mine1.fbx', (obj) => {
    obj.scale.set(0.1, 0.1, 0.1)
    //obj.rotation.x =- Math.PI / 2
    obj.position.set(0,2,60)
    objects.add(obj)
});

scene.add(objects);

function girarCamera(time){
    offset.x =distance * Math.sin( time * 0.0002 );
    offset.z =distance * Math.cos( time * 0.0002 );

    camera.position.set(0,7,0).add( offset );
    camera.lookAt(0,0,0);
}

function animate() {
	requestAnimationFrame( animate );

    //for (const obj of objects.children) {

        //const time = Date.now();
        //obj.rotation.y += 0.001;
        //obj.rotation.x += 0.001;

        controls.update();
        //girarCamera(time)

    //}
     
    objects.rotation.y += 0.001;

	renderer.render( scene, camera );
}

animate();

export {scene, camera}