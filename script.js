// 100 fotoğraf için örnek dizi (dilediğin gibi değiştirebilirsin)
const photoUrls = Array.from({length: 100}, (_, i) => `https://randomuser.me/api/portraits/med/${i%2===0?'men':'women'}/${i%50}.jpg`);

let camera, scene, renderer, controls;
let meshes = [];
let zoom = 0;

init();
animate();

function init() {
  const container = document.getElementById('container');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 32);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 18;
  controls.maxDistance = 60;
  controls.autoRotate = false;

  // Kalp yüzeyine fotoğrafları diz
  const n = photoUrls.length;
  for (let i = 0; i < n; i++) {
    // Kalp yüzeyinde 3D nokta hesaplama
    const t = Math.PI * 2 * (i / n);
    const phi = Math.acos(1 - 2 * (i + 0.5) / n); // uniform dağılım
    const heart = heart3D(phi, t, 10);
    const texture = new THREE.TextureLoader().load(photoUrls[i]);
    texture.minFilter = THREE.LinearFilter;
    const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geo = new THREE.PlaneGeometry(1.7, 1.7);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(heart.x, heart.y, heart.z);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
    meshes.push(mesh);
  }

  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('wheel', onScroll, { passive: false });
}

function heart3D(phi, theta, scale) {
  // 3D kalp parametrik denklem
  // https://mathworld.wolfram.com/HeartSurface.html
  const r = scale * (1 - Math.sin(phi)) * 0.8;
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = scale * Math.cos(phi) * 0.9;
  return { x, y, z };
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll(e) {
  e.preventDefault();
  zoom += e.deltaY * 0.002;
  zoom = Math.max(-1, Math.min(zoom, 2));
  camera.position.setLength(32 - zoom * 16);
  updateBlur();
}

function updateBlur() {
  const blur = zoom < 0.2;
  meshes.forEach(mesh => {
    mesh.material.opacity = blur ? 0.7 : 1.0;
    mesh.material.needsUpdate = true;
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
} 