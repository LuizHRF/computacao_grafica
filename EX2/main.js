
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { AnimationClip, VectorKeyframeTrack, AnimationMixer } from "three";


function main() {

    const canvas = document.querySelector( '#c' );
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

    const fov = 40;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xAAAAAA );

    {

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( - 1, 2, 4 );
        scene.add( light );

    }

    {

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( 1, - 2, - 4 );
        scene.add( light );

    }

    const objects = [];
    const spread = 15;

    function addObject( x, y, obj ) {

        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add( obj );
        objects.push( obj );

    }

    function createMaterial() {

        const material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
        } );

        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL( hue, saturation, luminance );

        return material;

    }

    function addSolidGeometry( x, y, geometry ) {

        const mesh = new THREE.Mesh( geometry, createMaterial() );
        addObject( x, y, mesh );

    }

    function addLineGeometry( x, y, geometry ) {

        const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
        const mesh = new THREE.LineSegments( geometry, material );
        addObject( x, y, mesh );

    }

    {

        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry( -1, 1, new THREE.BoxGeometry( width, height, depth ) );

    }

    {

        const radius = 7;
        addSolidGeometry( 0, 2, new THREE.DodecahedronGeometry( radius ) );

    }

    {

        const shape = new THREE.Shape();
        const x = - 2.5;
        const y = - 5;
        shape.moveTo( x + 2.5, y + 2.5 );
        shape.bezierCurveTo( x + 2.5, y + 2.5, x + 2, y, x, y );
        shape.bezierCurveTo( x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5 );
        shape.bezierCurveTo( x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5 );
        shape.bezierCurveTo( x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5 );
        shape.bezierCurveTo( x + 8, y + 3.5, x + 8, y, x + 5, y );
        shape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

        const extrudeSettings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 2,
        };

        addSolidGeometry( - 1, 0, new THREE.ExtrudeGeometry( shape, extrudeSettings ) );

    }



    {

        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        addSolidGeometry( 1, 1, new THREE.SphereGeometry( radius, widthSegments, heightSegments ) );

    }

    {

        const radius = 7;
        addSolidGeometry( 1, 0, new THREE.TetrahedronGeometry( radius ) );

    }


    {

        const radius = 5;
        const tubeRadius = 2;
        const radialSegments = 8;
        const tubularSegments = 24;
        addSolidGeometry( 0, - 1, new THREE.TorusGeometry( radius, tubeRadius, radialSegments, tubularSegments ) );

    }

    function resizeRendererToDisplaySize( renderer ) {

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if ( needResize ) {

            renderer.setSize( width, height, false );

        }

        return needResize;

    }

    function render( time ) {

        time *= 0.001;

        if ( resizeRendererToDisplaySize( renderer ) ) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

        }

        objects.forEach( ( obj, ndx ) => {

            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = -rot;
            obj.rotation.y = rot;

        } );

        objects[0].scale.set(Math.sin(time)*2, Math.sin(time)*2, Math.sin(time)*2)
        objects[4].scale.set(Math.sin(time)*2, Math.sin(time)*2, Math.sin(time)*2)

        objects[1].rotation.set(Math.cos(time)*3, Math.cos(time)*3, Math.cos(time)*3)
        objects[5].rotation.set(Math.cos(time)*3, Math.cos(time)*3, Math.cos(time)*3)

        objects[2].position.x = (Math.tan(time))
        objects[2].position.z = (Math.tan(time))
        objects[2].position.y = (Math.tan(time))

        objects[3].position.x = (3+Math.tan(time))

        
        renderer.render( scene, camera );

        requestAnimationFrame( render );

    }

    requestAnimationFrame( render );

}

main();