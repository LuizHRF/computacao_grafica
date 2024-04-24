import * as THREE from 'three';
import { AnimationClip, VectorKeyframeTrack, AnimationMixer, NumberKeyframeTrack } from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

camera.position.z = 5;

renderer.render( scene, camera );

//---------------------------------------------------------------------------------------------------


const positionKF = new VectorKeyframeTrack(
".position",
[0, 3, 6],
[0, 0, 0, 2, 2, 2, 0, 0, 0]
);

const opacityKF = new NumberKeyframeTrack(
".material.opacity",
[0, 1, 2, 3, 4, 5, 6],
[0, 1, 0, 1, 0, 1, 0]
);

const clip = new AnimationClip("move-n-blink", -1, [
positionKF,
opacityKF,
]);
  
const mixer = new THREE.AnimationMixer( mesh );
const clips = mesh.animations;

// Update the mixer on each frame
function update () {
	mixer.update( deltaSeconds );
}

// Play a specific animation
const action = mixer.clipAction( clip );
action.play();

// Play all animations
clips.forEach( function ( clip ) {
	mixer.clipAction( clip ).play();
} );