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
camera.position.x = 9;
camera.position.y = 7;

controls.update();

//-----------------------------Chão----------------------------------------------

const m = new THREE.MeshPhongMaterial({color: new THREE.Color('darkBlue')});
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), m)
floor.rotateX(-Math.PI / 2)
floor.position.y = -1;
scene.add(floor);

const objects = new THREE.Group();

//-----------------------------Esfera----------------------------------------------
const loader = new THREE.TextureLoader();
{
    const normalmap =loader.load('textures/Metal_pattern_007c_normal.jpg' );
    const metallicmap =loader.load('textures/Metal_pattern_007c_metallic.jpg' );
    const aomap =loader.load('textures/Metal_pattern_007c_ambientOcclusion.jpg' );
    const rMap = loader.load('textures/Metal_pattern_007c_roughness.jpg' );
    const emMap = loader.load('textures/Metal_pattern_007c_opacity.jpg' );
    const cmap = loader.load('textures/Metal_pattern_007c_basecolor.jpg' );
    const lmap = loader.load('textures/Metal_pattern_007c_height.jpg' );

    const sphereMaterial =  new THREE.MeshStandardMaterial({normalMap: normalmap, metalnessMap: metallicmap, aoMap: aomap, roughnessMap: rMap, emissiveMap: emMap, map: cmap, envMap: lmap , color: 'yellow'});

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2), sphereMaterial)
    sphere.position.set(0, 1, 5);
    objects.add(sphere);
}

//-----------------------------Cubo----------------------------------------------
{
    const normalmap =loader.load('texturas2/Substance_Graph_Normal.jpg' );
    const aomap =loader.load('texturas2/Substance_Graph_AmbientOcclusion.jpg' );
    const rMap = loader.load('texturas2/Substance_Graph_Roughness.jpg' );
    const cmap = loader.load('texturas2/Substance_Graph_BaseColor.jpg' );
    const lmap = loader.load('Substance_Graph_Height.jpg' );

    const cubeMaterial =  new THREE.MeshStandardMaterial({normalMap: normalmap, aoMap: aomap, roughnessMap: rMap, map: cmap, displacementMap: lmap, color: 'lightGreen'});

    const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), cubeMaterial)
    cube.position.set(0, 1, -5);
    objects.add(cube);
}

//-----------------------------Esfera----------------------------------------------

{
    const normalMap =loader.load('textures3/Water_002_NORM.jpg' );
    const occlusionMap =loader.load('textures3/Water_002_OCC.jpg' );
    const roughnessMap =loader.load('textures3/Water_002_ROUGH.jpg' );
    const displacementMap = loader.load('textures3/Water_002_DISP.jpg' );
    const colorMap = loader.load('textures3/Water_002_COLOR.jpg' );

    const sphereMaterial =  new THREE.MeshStandardMaterial({normalMap: normalMap, aoMap: occlusionMap, roughnessMap: roughnessMap, map: colorMap, displacementMap: displacementMap});

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2), sphereMaterial)
    sphere.position.set(-5, 1, 0);
    objects.add(sphere);
}

//-----------------------------Esfera----------------------------------------------

{
    const normalMap =loader.load('textures4/Substance_Graph_normal.jpg' );
    const occlusionMap =loader.load('textures4/Substance_Graph_ambientOcclusion.jpg' );
    const roughnessMap =loader.load('textures4/Substance_Graph_roughness.jpg' );
    const heightMap = loader.load('textures4/Substance_Graph_height.jpg' );
    const colorMap = loader.load('textures4/Substance_Graph_basecolor.jpg' );

    const sphereMaterial =  new THREE.MeshStandardMaterial({normalMap: normalMap, aoMap: occlusionMap, roughnessMap: roughnessMap, map: colorMap, displacementMap: heightMap});

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2), sphereMaterial)
    sphere.position.set(5, 1, 0);
    objects.add(sphere);
}
//-----------------------------Luz ambiente----------------------------------------------

const Light = new THREE.AmbientLight( 0x404040 ); 
scene.add( Light );

//-----------------------------Luz do "sol"----------------------------------------------

const directionalLight = new THREE.DirectionalLight( {color: "white"}, 1 );

directionalLight.position.set( 30, 30, 30);
scene.add( directionalLight );


scene.add(objects);

scene.traverse( function( child ) { //Garantindo que hajam sombras

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

function girarCamera(time){
    offset.x =distance * Math.sin( time * 0.0002 );
    offset.z =distance * Math.cos( time * 0.0002 );

    camera.position.set(0,7,0).add( offset );
    camera.lookAt(0,0,0);
}

function animate() {
	requestAnimationFrame( animate );

    for (const obj of objects.children) {

        const time = Date.now();
        obj.rotation.y += 0.001;
        obj.rotation.x += 0.001;

        controls.update();
        girarCamera(time)

    }

    objects.rotation.y += 0.001;

	renderer.render( scene, camera );
}

animate();

export {scene, camera}