import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.SphereGeometry(7, 32, 32);
const texture = new THREE.TextureLoader().load('saturn.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const saturn = new THREE.Mesh(geometry, material);
scene.add(saturn);

const ring_geo = new THREE.TorusGeometry(12, 1.5, 2, 100);
const ring_tex = new THREE.TextureLoader().load('ring.jpg');
const ring_material = new THREE.MeshBasicMaterial({map: ring_tex, side: THREE.DoubleSide, transparent: true
});
const ring = new THREE.Mesh(ring_geo, ring_material);

ring.rotation.x = Math.PI / 2.2;
scene.add(ring);

function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(add_star);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  saturn.rotation.y += 0.1;
  saturn.rotation.z += 0.1;

  camera.position.z = 30 + t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  ring.rotation.z += 0.02;
  renderer.render(scene, camera);
}

animate();