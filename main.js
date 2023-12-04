import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const fontLoader = new FontLoader();
let texttext = undefined;
fontLoader.load("./public/Comfortaa_Regular.json", (font) => {
  const textGeometry = new TextGeometry("COfffe, at last", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  texttext = text;
  scene.add(text);
});
const loader = new GLTFLoader();
const marimi = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  marimi.width / marimi.height,
  0.1,
  100
);
camera.position.set(0, 0, 8);
scene.add(camera);
// scene.add(axesHelper);

//objects
let bijou = undefined;
loader.load("./public/bijou.glb", (gltf) => {
  gltf.scene.position.y = -1;
  gltf.scene.position.x = -1.5;
  gltf.scene.position.z = -1;
  gltf.scene.rotation.x = Math.PI / 6;
  bijou = gltf.scene;
  scene.add(gltf.scene);
});

//lights
var light = new THREE.PointLight("white", 300);
var light1 = new THREE.AmbientLight("gray", 10);
light.position.set(-2, 4, 5);
// light1.position.set(3, 0, -2);
scene.add(light, light1);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(marimi.width, marimi.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.render(scene, camera);

//animations
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / marimi.width - 0.5;
  cursor.y = e.clientY / marimi.height - 0.5;
});

const clock = new THREE.Clock();
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;

  camera.position.x += (-cursor.x - camera.position.x) * deltaTime;
  camera.position.y += (cursor.y - camera.position.y) * deltaTime;

  if (texttext) {
    texttext.position.x += (-cursor.x - texttext.position.x) * deltaTime * 2;
    texttext.position.y += (cursor.y - texttext.position.y) * deltaTime * 2;
  }

  bijou && (bijou.rotation.y += 0.01);
  previousTime = elapsedTime;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
