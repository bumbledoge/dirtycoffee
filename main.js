import * as THREE from "three";

const axesHelper = new THREE.AxesHelper(30);
const marimi = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  marimi.width / marimi.height,
  0.1,
  100
);
camera.position.z = 5;
scene.add(camera);
scene.add(axesHelper);

const textbox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({ color: 0x008dd5 })
);
scene.add(textbox);

//lights
var light = new THREE.PointLight("white", 20);
var light1 = new THREE.PointLight("white", 20);
light.position.set(3, 2, 2);
light1.position.set(-3, 2, 2);
scene.add(light, light1);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(marimi.width, marimi.height);
renderer.render(scene, camera);

console.log(textbox, camera);

const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
