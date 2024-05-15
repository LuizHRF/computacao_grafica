import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ToonShaderHatching } from 'three/examples/jsm/Addons.js';
const pi = Math.PI;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfcf6e3);
const h = window.innerHeight,
  w = window.innerWidth;

const aspectRatio = w / h,
  fieldOfView = 45,
  nearPlane = 1,
  farPlane = 5000;

const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);

const renderer = new THREE.WebGLRenderer({
  canvas: c,
  alpha: true,
  antialias: true
});

const dpi = window.devicePixelRatio;
renderer.setSize(w * dpi, h * dpi);
const theCanvas = document.getElementById("c");


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//camera
camera.position.set(22, 15, 6);
camera.lookAt(new THREE.Vector3(0, 7, 0));
const controls = new OrbitControls( camera, renderer.domElement );

const col_light = 0xffeec4; // set

const mult = 8;

const light = new THREE.AmbientLight(col_light, 0.3*mult);

const keyLight = new THREE.DirectionalLight(col_light, 0.6*mult*1.5);
keyLight.position.set(20, 30, 10);
keyLight.castShadow = true;
keyLight.shadow.camera.top = 50;

// const shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );

scene.add(light);
scene.add(keyLight);

// axis
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//materials
const mat_grass = new THREE.MeshToonMaterial({ color: 0x024d18 });
const mat_dark = new THREE.MeshToonMaterial({ color: 0x5a6e6c });
const mat_black = new THREE.MeshToonMaterial({ color: 0x261d0d , side: THREE.DoubleSide});
const mat_pillar = new THREE.MeshToonMaterial({ color: 0x453418 });
const mat_pale = new THREE.MeshToonMaterial({ color: 0xcfc7b4 });
const mat_brown = new THREE.MeshToonMaterial({ color: 0xa68558});
const mat_stone = new THREE.MeshPhysicalMaterial({ color: 0x9eaeac, roughness: 0.7, transmission: 0.5, thickness: 5});
const mat_bush = new THREE.MeshPhysicalMaterial({color: 0x328a07, roughness: 0.7, transmission: 0.5, thickness: 5});
const vidro_mat = new THREE.MeshPhysicalMaterial({
  roughness: 0,
  transmission: 0.9,
  thickness: 4
});


//-------------------------------------ground-------------------------------------

const ground = new THREE.Group();

const geometry = new THREE.CylinderGeometry(8 - 0.01, 8, 0.1, 9);
const floor = new THREE.Mesh(geometry, mat_grass
  
)
floor.position.y = 0;
floor.receiveShadow = true;
ground.add(floor);

floor.scale.x = 0.8;


const geo_base = new THREE.CylinderGeometry(8, 1, 10, 9);
const base = new THREE.Mesh(geo_base, mat_dark);
base.scale.x = floor.scale.x;
base.position.y = -5;
ground.add(base);

scene.add(ground);

//-------------------------------------stone-------------------------------------
const geo_stone = new THREE.DodecahedronGeometry(1, 0);
const stone = [];
for (let i = 0; i < 2; i++) {
  stone[i] = new THREE.Mesh(geo_stone, mat_stone);
  stone[i].castShadow = true;
  scene.add(stone[i]);
}
stone[0].rotation.set(0, 12, pi / 2);
stone[0].scale.set(1.5, 0.5, 0.5);
stone[0].position.set(-2, 0.5, 6);
stone[0].castShadow = true;

stone[1].rotation.set(0, 0, pi / 2);
stone[1].scale.set(0.5, 0.5, 0.5);
stone[1].position.set(stone[0].position.x+0.6, stone[0].position.y-0.3, stone[0].position.z+0.5);
stone[1].castShadow = true;

//-------------------------------------arbustos-------------------------------------

const bush_geom = new THREE.DodecahedronGeometry(1, 0);
const bushGroup = new THREE.Group();
const bush = []
for (let i = 0; i < 4; i++) {
  bush[i] = new THREE.Mesh(bush_geom, mat_bush);
  bush.push(bush[i]);
  bushGroup.add(bush[i]);
  bush[i].castShadow = true;
}

{ //Posição e rotação dos arbustos
  bush[0].rotation.set(0, 12, pi/2);
  bush[0].scale.set(0.6, 1, 1);
  bush[0].position.set(0, 0, 0);

  bush[1].rotation.set(0, 0, pi / 2);
  bush[1].scale.set(0.2, 0.5, 0.5);
  bush[1].position.set(bush[0].position.x+0.2, bush[0].position.y-0.3, bush[0].position.z-1.6);

  bush[2].rotation.set(1, 2, 0);
  bush[2].scale.set(0.6, 0.8, 1.2);
  bush[2].position.set(bush[0].position.x-1, bush[0].position.y, bush[0].position.z-0.6);

  bush[3].rotation.set(0, 0, pi / 2);
  bush[3].scale.set(0.2, 0.5, 0.5);
  bush[3].position.set(bush[0].position.x+0.9, bush[0].position.y-0.3, bush[0].position.z-0.7);
}

bushGroup.position.set(-2, 0.4, -5);
bushGroup.rotation.set(0, 1.5*pi, 0);
scene.add(bushGroup);

//-------------------------------------Fundação-------------------------------------

  const moinho = new THREE.Group();
  scene.add(moinho);

  const found_height = 10;
  const radius_found_top = 4;
  const radius_found_bottom = radius_found_top/2.5;
  const geo_foundation = new THREE.CylinderGeometry(radius_found_top, radius_found_bottom, found_height, 6);
  const foundation = new THREE.Mesh(geo_foundation, mat_brown);
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  
  foundation.rotation.x = pi;
  foundation.position.y = found_height / 2;

  moinho.add(foundation);
  foundation.castShadow = true;

//-------------------------------------Pilares-------------------------------------

  const pilares = [];
  const geo_pilar = new THREE.CylinderGeometry(0.05, 0.05, 11);

  for(let i=0; i<3; i++){ //De dois em dois
    
    const pilares_group = new THREE.Group();
    const pilar1 = new THREE.Mesh(geo_pilar, mat_pillar);

    pilar1.position.set(0, 5, 2.8)
    pilar1.rotation.x = -0.24;

    const pilar2 = new THREE.Mesh(geo_pilar, mat_pillar);
    pilar2.position.set(0, 5, -2.8)
    pilar2.rotation.x = 0.24;
    
    pilares_group.add(pilar1, pilar2);
    pilares.push(pilares_group);
  }

  pilares[1].rotation.y = pi/3;
  pilares[2].rotation.y = -pi/3;
  
  for(let i=0; i<3; i++){
    moinho.add(pilares[i]);
  }

//-------------------------------------Topo do moinho-------------------------------------

  const head_height = 2;
  const radius_head_top = radius_found_bottom+0.6;
  const radius_head_bottom = radius_head_top/4;
  const geo_head = new THREE.CylinderGeometry(radius_head_top, radius_head_bottom, head_height, 12);
  const head = new THREE.Mesh(geo_head, mat_black);

  head.rotation.x = pi;
  head.position.y = found_height+0.7;

  moinho.add(head);
  head.castShadow = true;


//-------------------------------------Janelas--------------------------------------------

  const janela_geo = new THREE.BoxGeometry(1, 0.06, 1)
  const vidro_geo = new THREE.BoxGeometry(0.3, 0.005, 0.3) 
  
  const janelas = [];

  for (let i = 0; i<3; i++){ //Para cada janela
    const janela = new THREE.Group();
    
    const moldura = new THREE.Mesh(janela_geo, mat_black);

    janela.add(moldura);

    for(let j = 0; j<2; j++){ //Para cada vidro
      const vidro = new THREE.Mesh(vidro_geo, vidro_mat);
      moldura.getWorldPosition(vidro.position.set());
      vidro.position.y += 0.04;

      vidro.position.x -= (j*-0.4)+0.2;
      vidro.position.z += 0.2;

      const vidro2 = new THREE.Mesh(vidro_geo, vidro_mat);
      moldura.getWorldPosition(vidro2.position.set());
      vidro2.position.y += 0.04;

      vidro2.position.x += (j*-0.4)+0.2;
      vidro2.position.z -= 0.2;

      janela.add(vidro, vidro2);
    }

    janela.rotation.z = -pi/2.3;
    janelas.push(janela);
  }  

  { //Posição e rotação das janelas
    janelas[0].position.set(1.1, 7, -1.73);
    janelas[0].rotation.y = 1.05

    janelas[1].position.set(-2.05, 7, 0);
    janelas[1].rotation.y = pi

    janelas[2].position.set(1.1, 7, 1.73);
    janelas[2].rotation.y = -1.05;
  }

  for (let i = 0; i<3; i++){
    janelas[i].scale.set(1.5, 1.5, 1);
    moinho.add(janelas[i]);
  }

//-------------------------------------Porta--------------------------------------------

  const door = new THREE.Group();

  const door_geo_inner = new THREE.BoxGeometry(3.5, 0.05, 1.5)
  const doorInner = new THREE.Mesh(door_geo_inner, mat_black);
  doorInner.position.y += 0.01
  door.add(doorInner);

  const door_geo_outer = new THREE.BoxGeometry(3.6, 0.06, 1.6)
  const doorOuter = new THREE.Mesh(door_geo_outer, mat_pillar);
  door.add(doorOuter);

  {//Detalhes
    const details_group = new THREE.Group();
    const door_geo_det = new THREE.BoxGeometry(3.1, 0.001, 0.1)

    const detail1_1 = new THREE.Mesh(door_geo_det, mat_pillar);
    detail1_1.position.z -= 0.5;
    detail1_1.scale.x = 0.4;
    detail1_1.position.x -= 0.9;
    details_group.add(detail1_1);

    const detail1_2 = new THREE.Mesh(door_geo_det, mat_pillar);
    detail1_2.position.z -= 0.5;
    detail1_2.scale.x = 0.4;
    detail1_2.position.x += 0.9;
    details_group.add(detail1_2);

    const detail2 = new THREE.Mesh(door_geo_det, mat_pillar);
    details_group.add(detail2);
    detail2.position.z += 0.5;

    const detail3 = new THREE.Mesh(door_geo_det, mat_pillar);
    details_group.add(detail3);
    detail3.scale.x = 0.35;
    detail3.rotation.y = pi/2;
    detail3.position.x -= 1.5;

    const detail4 = new THREE.Mesh(new THREE.SphereGeometry(0.1), mat_pillar);
    detail4.position.z -= 0.5;
    details_group.add(detail4);
    

    details_group.position.x += 0.14;
    details_group.position.y += 0.05;
    details_group.scale.x = 1.1;
    door.add(details_group);
  }

  door.position.set(3.15, 1.7, 0);
  door.rotation.z = -pi/2.3;

  moinho.add(door);

//-------------------------------------Pás--------------------------------------------

  const holder = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.6, 0.6), mat_black);
  holder.position.set(2, 8.6, 0);
  holder.castShadow = true;
  moinho.add(holder)

  const blades = new THREE.Group(); 
  blades.position.set(0, 5, 0);
  
  const radius = 0.6
  const holder2_1 = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16, 0, pi*2, 0, pi/2), mat_black);
  const holder2_2 = new THREE.Mesh(new THREE.CircleGeometry(radius), mat_black);
  holder2_2.castShadow = true;
  holder2_2.rotation.x = pi/2;
  holder2_2.position.y -= 0.1;
  holder2_1.position.y -= 0.1;
  blades.add(holder2_1, holder2_2);

  { //pás
    const bladesArray = []
    const cableLenght = 3.5;
    const cableLenghtfactor = (cableLenght/2)-0.1;
    const bladeCable_geo = new THREE.CylinderGeometry(0.1, 0.1, cableLenght);

    for (let i=0; i<4; i++){
      const blade = new THREE.Group();

      const blade_cable = new THREE.Mesh(bladeCable_geo, mat_black);
      blade.add(blade_cable);
      blade_cable.castShadow = true;

      const blade_cloth_backgroud = new THREE.Mesh(new THREE.BoxGeometry(0.05, cableLenght-0.6, 0.8), mat_black);
      blade_cloth_backgroud.castShadow = true;

      blade_cloth_backgroud.position.y = ((-1)**i)*0.5;
      blade_cloth_backgroud.position.z = ((-1)**i)*0.3;

      //blade.add(blade_cloth_backgroud);

      const blade_cloth = blade_cloth_backgroud.clone();
      blade_cloth.material = mat_pale
      blade_cloth.scale.set(0.2, 1, 0.9)
      blade_cloth.position.x -=0.026
      blade.add(blade_cloth)

      bladesArray.push(blade);
      blades.add(blade);
    }

    bladesArray[0].rotation.z = -pi/2;
    bladesArray[0].position.x = radius + cableLenghtfactor;

    bladesArray[1].rotation.z = -pi/2;
    bladesArray[1].rotation.y = pi/2;
    bladesArray[1].position.z = radius + cableLenghtfactor;

    bladesArray[2].rotation.z = pi/2;
    bladesArray[2].rotation.x = -pi;
    bladesArray[2].position.x = - (radius + cableLenghtfactor);

    bladesArray[3].rotation.z = pi/2;
    bladesArray[3].rotation.y = -pi/2;
    bladesArray[3].rotation.x = pi;

    bladesArray[3].position.z = -(radius + cableLenghtfactor);
  
  }

  blades.rotation.z = pi/2;	
  blades.rotation.y = pi;
  blades.position.set(2.6, 8.6, 0);
  scene.add(blades);

//-------------------------------------SkyBox-------------------------------------

  const imagePrefix = "dawnmountain-";
	const directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	const imageSuffix = ".png";
	const skyGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );	

  const loader = new THREE.TextureLoader();
  loader.setPath( 'images/' );
	
	const materialArray = [];
	for (let i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: loader.load( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	//const skyMaterial = new THREE.MeshBasicMaterial( materialArray );
	const skyBox = new THREE.Mesh( skyGeometry, materialArray );
	scene.add( skyBox );

//-------------------------------------Topo do moinho-------------------------------------

  const birdVector = []

  const bird = new THREE.Group()

  const fix = new THREE.Points(); //Ponto fixo que ajuda a movimentar o pássaro
  fix.position.set(0,0,0)
  bird.add(fix)

   //Mesh do pássaro
    const birdMesh = new THREE.Group()
    const corpo = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), new THREE.MeshToonMaterial({color: 'grey', side: THREE.DoubleSide}))
    corpo.material.color.setHSL( Math.random() , 0.6, .5);
    corpo.castShadow = true;
    corpo.scale.set(0.9, 0.3, 0.3)
    corpo.position.x -= 0.1
    birdMesh.add(corpo)

    { //Asas
      const wingShape = new THREE.Shape();
      wingShape.bezierCurveTo( 0.5, .5, 0, 1.2, 0, 0 );
      const wing = new THREE.Mesh(new THREE.ShapeGeometry( wingShape ), corpo.material.clone());
      wing.material.color.setHSL( Math.random() , 0.6, .5);
      
      wing.scale.set(0.5, 0.5, 0.5)
      wing.rotation.z = 1;

      const wing2 = wing.clone();

      wing.rotation.x = pi/2;
      wing2.rotation.x = -pi/2;
      birdMesh.add(wing, wing2)
    }

    bird.add(birdMesh)
    

    birdMesh.position.set(7, 7, 7)
    birdMesh.rotateY(1)

    birdVector.push(bird)


  const bird2 = bird.clone();
  bird2.position.z =+ 1;
  bird2.position.y =+2;

  birdVector.push(bird2)  

  const bird3 = bird.clone();
  bird3.position.x -= 2;
  bird3.position.y -= 1;

  birdVector.push(bird3)


  for(const obj of birdVector){
    scene.add(obj)

  }

  function animatebird(time){
    let i =0;
    for(const bird of birdVector){
      i++;
      bird.rotation.y +=.006
      bird.rotation.x += (Math.sin(time/1000)/1000) * i
    };
  }

//-------------------------------------Renderização-------------------------------------
const render = function () {
  requestAnimationFrame(render);

  const time = Date.now(); 

  blades.rotation.x += 0.01;
  animatebird(time)

  renderer.render(scene, camera);
};
render();

