import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

useEffect(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth,  window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight( 0xffffff, 4 );
  scene.add( ambientLight );  
  scene.background = new THREE.Color( 0xaaffaa );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 1, 0 );
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  camera.position.y = 5;
  camera.position.z = 5;

  const loader = new GLTFLoader();

  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  }

  loader.load( 'images/data.glb', function ( gltf ) {
    const o = gltf.scene;
    o.updateMatrixWorld();
    scene.add( o );
    renderer.render( scene, camera );
    animate();

  }, undefined, function ( error ) {

    console.error( error );

  } );
}, []);