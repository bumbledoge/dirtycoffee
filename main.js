import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const fontLoader = new FontLoader();
let texttext = undefined;
fontLoader.load("./Comfortaa_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Coffee, at last", {
    font: font,
    size: 0.2,
    height: 0.05,
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
const panel = new THREE.Mesh(
  new THREE.BoxGeometry(8, 2, 2),
  new THREE.MeshLambertMaterial({ color: "#fbf2c0" })
);
panel.position.set(0, 0, -5);
scene.add(panel);

let bijou = undefined;
loader.load("./bijou.glb", (gltf) => {
  gltf.scene.position.y = -1;
  gltf.scene.position.x = -1.5;
  gltf.scene.position.z = -1;
  gltf.scene.rotation.x = Math.PI / 6;
  bijou = gltf.scene;
  scene.add(gltf.scene);
});
let boba = undefined;
let bobas = [];
loader.load("./boba.glb", (gltf) => {
  boba = gltf.scene.children[0];
  boba.material = new THREE.MeshLambertMaterial({ color: "#5E300E" });
  boba.scale.set(25, 25, 25);

  const particlesCount = 350;
  for (let i = 1; i <= particlesCount; i++) {
    const cloner = boba.clone();
    bobas.push(cloner);
    console.log(cloner);
    cloner.position.set(
      (Math.random() - 0.5) * 13,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 20
    );
    cloner.rotation.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    // cloner.scale.set(40, 40, 40);

    scene.add(cloner);
  }
});

// scene.add(particles);

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

    panel.position.x += (-cursor.x - panel.position.x) * deltaTime * 2;
    panel.position.y += (cursor.y - panel.position.y) * deltaTime * 2;
  }
  boba &&
    bobas.forEach((el) => {
      el.rotation.x += Math.random() * 0.05;
      el.rotation.y += Math.random() * 0.01;
    });
  bijou && (bijou.rotation.y += 0.01);
  previousTime = elapsedTime;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
