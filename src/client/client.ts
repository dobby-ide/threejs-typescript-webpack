import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//request a callback to provide the animation, generally occurs at 60 frames a second
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.z += 0.001;
  cube.rotation.x += 0.0009;
  cube.rotation.y += 0.0001;

  //having a render function inside animate() is necessary to see the animation in the screen, but render can also be called outside this function and
}

function render() {
  renderer.render(scene, camera);
}

animate();
render();
