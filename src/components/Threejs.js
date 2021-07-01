
import {useEffect} from 'react'
import * as THREE from 'three';
import texture1 from './circle.png'

export default function Threejs(){

useEffect(() => {

		let sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		  
		// CREATE SCENE
		const scene = new THREE.Scene();
		
		// CREATE GEOMETRY FROM CUSTOM POINTS
		let particles = [];
		const particleCount = 20000;

		for (let i = 0; i < particleCount; i++) {
			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 1000;
			vertex.y = Math.random() * 2000 - 1000;
			vertex.z = Math.random() * 2000 - 1000;
			particles.push(vertex);
		}

		const geometry = new THREE.BufferGeometry().setFromPoints( particles );

		// MATERIAL WITH IMPORTED TEXTURE
		const texture = new THREE.TextureLoader().load(texture1);
		const material = new THREE.PointsMaterial( {
			size:20,
			depthTest:false, //for transparent png
			transparent:true, //for transparent png
			fog: false,
			map: texture
		} );

		// MESH
		const mesh = new THREE.Points( geometry, material );
		mesh.scale.set( 1, 1, 1 );
		scene.add(mesh);

		// LIGHTS
		const pointLight = new THREE.PointLight(0xffffff, 0.1)
		pointLight.position.x = 2
		pointLight.position.y = 3
		pointLight.position.z = 1000
		scene.add(pointLight)

		// CAMERA
        const fieldOfView = 75;
        const aspectRatio = sizes.width / sizes.height;
        const nearPlane = 1;
		const farPlane = 6000;

		const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = farPlane/3;
		scene.add(camera)

		// ADD CAMERA CONTROLS
		const OrbitControls = require('three-orbit-controls')(THREE)
        const controls = new OrbitControls(camera)

		// RENDERER
		const renderer = new THREE.WebGLRenderer(); 
		renderer.setPixelRatio(window.devicePixelRatio); 
		renderer.setSize(sizes.width, sizes.height); 

		// FRONT-END PART
		let container = document.getElementById('webgl-canvas');
		container.style.width = '100%';
		container.style.height = '100vh';
		container.style.overflow = 'hidden';

		// ADD RENDERER TO CONTAINER
		container.appendChild(renderer.domElement);

		// ANIMATIONS GO INSIDE
		function render() {
			camera.lookAt(scene.position);
			renderer.render(scene, camera);
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
		}
		animate();

		// RESIZE CONTAINER
		window.addEventListener('resize', onWindowResize, false);
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		
      },[]);

return(
   null
)

}



