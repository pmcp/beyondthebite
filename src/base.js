function base() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(0x212121, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  document.querySelector('#particles').appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 20 * 1, 35 * 1);
  camera.lookAt(scene.position);
  scene.add(camera);

  return { renderer, scene, camera };
}

export default base;
