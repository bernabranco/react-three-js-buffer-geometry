
import { useEffect } from 'react'
import * as THREE from 'three';
import Stats from './Stats.js'
import texture1 from '../texture/circle.png'

export default function Threejs() {

	useEffect(() => {

		// Global Variables
		let sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		let pointSize = 20;
		let speed = 0.0005;

		// CREATE SCENE
		const scene = new THREE.Scene();

		// DEFINE CUSTOM POINTS
		const particleCount = 20000;
		let particles = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			particles[i] = Math.random() * 2000 - 1000;
		}

		//CREATE BUFFER GEOMETRY
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

		// MATERIAL WITH IMPORTED TEXTURE
		const texture = new THREE.TextureLoader().load(texture1);
		let material = new THREE.PointsMaterial({
			size: pointSize,
			depthTest: false, //for transparent png
			transparent: true, //for transparent png
			fog: false,
			map: texture
		});

		// MESH
		const mesh = new THREE.Points(geometry, material);
		mesh.scale.set(1, 1, 1);
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
		const farPlane = 3000;

		const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = farPlane / 3;
		scene.add(camera)

		// ADD CAMERA CONTROLS
		const OrbitControls = require('three-orbit-controls')(THREE)
		const controls = new OrbitControls(camera)

		// FRONT-END PART
		let container = document.getElementById('webgl-canvas');
		container.style.width = '100%';
		container.style.height = '100vh';
		container.style.overflow = 'hidden';

		// RENDERER
		const renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(sizes.width, sizes.height);
		container.appendChild(renderer.domElement);

		let mouseX = 0;
		let mouseY = 0;
		function render() {

			let time = Date.now() * speed;
			//ANIMATE PARTICLE X
			for (let i = 0; i <= particleCount; i += 3) {
			}

			//ANIMATE PARTICLE Y
			for (let i = 1; i <= particleCount; i += 3) {
			}

			//ANIMATE PARTICLE Z
			for (let i = 2; i <= particleCount; i += 3) {
				particles[i] = 1000 * Math.sin(i * 0.002 + time);
			}

			//UPDATE GEOMETRY POSITION
			geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

			//ROTATE MESH
			//mesh.rotation.x += 0.001;
			//mesh.rotation.y += 0.001;

			//RENDER SCENE
			renderer.render(scene, camera);
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
		}
		animate();

		// EVENT LISTENERS
		window.addEventListener('resize', onWindowResize, false);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);

		// MOUSEMOVE
		let windowHalfX = sizes.width / 2;
		let windowHalfY = sizes.height / 2;
		function onDocumentMouseMove(e) {
			mouseX = e.clientX - windowHalfX;
			mouseY = e.clientY - windowHalfY;
		}

		// TOUCH
		function onDocumentTouchStart(e) {
			if (e.touches.length === 1) {
				e.preventDefault();
				mouseX = e.touches[0].pageX - windowHalfX;
				mouseY = e.touches[0].pageY - windowHalfY;
			}
		}

		// TOUCH MOVE
		function onDocumentTouchMove(e) {
			if (e.touches.length === 1) {
				e.preventDefault();
				mouseX = e.touches[0].pageX - windowHalfX;
				mouseY = e.touches[0].pageY - windowHalfY;
			}
		}

		// WINDOW RESIZE
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		//GET PERFORMACE STATS, COMMENT TO HIDE
		(function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()

	});

	return (
		null
	)
}



