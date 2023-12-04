import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const axesHelper = new THREE.AxesHelper(30);
const marimi = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  marimi.width / marimi.height,
  0.1,
  100
);
camera.position.z = 8;
scene.add(camera);
// scene.add(axesHelper);

//objects
let bijou = undefined;
loader.load("./public/bijou.glb", (gltf) => {
  console.log("done");
  bijou = gltf.scene;
  gltf.scene.position.y = -1;
  gltf.scene.position.x = -3;
  gltf.scene.position.z = -1;
  gltf.scene.rotation.x = Math.PI / 6;
  scene.add(gltf.scene);
});

//lights
var light = new THREE.PointLight("white", 300);
var light1 = new THREE.PointLight("#433423", 20);
light.position.set(-2, 4, 5);
light1.position.set(3, 0, -2);
scene.add(light, light1);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(marimi.width, marimi.height);
renderer.render(scene, camera);

//animations
const clock = new THREE.Clock();
let pastTime;
window.addEventListener("mousemove", (event) => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = pastTime - elapsedTime;
  bijou && (bijou.position.x += event.pageX / marimi.width / 1000);
  bijou && (bijou.position.y += -event.pageY / marimi.height / 1000);
  pastTime = elapsedTime;
});

const tick = () => {
  bijou && (bijou.rotation.y += 0.005);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
