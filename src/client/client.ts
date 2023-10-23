import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

// const light = new THREE.SpotLight();
// light.position.set(5, 5, 5);
// scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();

// Since Three r150, and Blender 3.6, lighting has changed significantly.
//
//renderer.physicallyCorrectLights = true; // is now deprecated since Three r150. Use renderer.useLegacyLights = false instead.
//
// If exporting lights from Blender, they are very bright.
// lights exported from blender are 10000 times brighter when used in Threejs
// so, you can counter this by setting renderer.useLegacyLights = false
//renderer.useLegacyLights = false; // WebGLRenderer.physicallyCorrectLights = true is now WebGLRenderer.useLegacyLights = false
// however, they are now still 100 times brighter in Threejs than in Blender,
// so to try and match the threejs scene shown in video, reduce Spotlight watts in Blender to 10w.
// The scene in blender will be lit very dull.
// Blender and Threejs use different renderers, they will never match. Just try your best.
//
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();
loader.load(
  'models/monkey.glb',
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        m.receiveShadow = true;
        m.castShadow = true;
      }
      if ((child as THREE.Light).isLight) {
        const l = child as THREE.SpotLight;
        l.castShadow = true;

        //bias prevents an object to be rendered in a dummy way because of casting and receiving shadow at the same time
        l.shadow.bias = -0.003;
        l.shadow.mapSize.width = 1024;
        l.shadow.mapSize.height = 1010;
      }
    });
    scene.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.log(error);
  }
);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
