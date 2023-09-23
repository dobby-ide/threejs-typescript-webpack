import * as THREE from 'three';
import { OrthographicCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
//adds a bgcolor
scene.background = new THREE.Color(0xffffff);
//takes also care of the aspect ratio
const camera = new THREE.PerspectiveCamera(95, 222 / 222, 0.5, 2000);
camera.position.z = 2;

const camera2 = new OrthographicCamera(-2, 2, 2, -2);
//add a canvas object if we want a custom canvas in our html
const canvas = document.getElementById('c1') as HTMLCanvasElement;

//now the canvas will need to be added to our renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(222, 222);

//below line serves to dynamically append the canvas created
//commenting it out will force to create your own canvas in your html file
//document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//BELOW IS THE RESIZING FUNCTIONALITIES
// window.addEventListener('resize', onWindowResize, false);
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   render();
// }

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera2);
}

animate();
