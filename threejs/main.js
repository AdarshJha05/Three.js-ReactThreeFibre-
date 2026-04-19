import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Set up a camera (PerspectiveCamera: field of view, aspect ratio, near clipping, far clipping)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, -200); // Position camera for a better view
// camera.lookAt(0,0,450);


// Set up a WebGL renderer
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;  // For better lighting handling with HDRI
renderer.toneMappingExposure = 1.25;
renderer.outputEncoding = THREE.sRGBEncoding;  // For proper color handling

// Load HDRI environment map for lighting
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/je_gray_02_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;  // Set the texture for reflections

    // Set environment map and background
    scene.environment = texture;
    // scene.background = texture;

    // Add a simple object to the scene (e.g., Torus Knot)
    // const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 16);
    // const material = new THREE.MeshStandardMaterial({
    //     color: 0xffcc00,
    //     metalness: 0.7,
    //     roughness: 0.1,  // Reflective surface
    // });
    // const torusKnot = new THREE.Mesh(geometry, material);
    // scene.add(torusKnot);
});


const loader = new GLTFLoader();
loader.load('./wooden_box.glb', function ( gltf ){
    scene.add( gltf.scene );

}, undefined, function (error) {
    console.error(error);
});

// Add OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth movement
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Resize handling function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for window resize events
window.addEventListener('resize', onWindowResize, false);

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Update controls (important for damping and interaction)
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
























// import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// // Create a scene
// const scene = new THREE.Scene();

// // Set up a camera (PerspectiveCamera: field of view, aspect ratio, near clipping, far clipping)
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Set up a WebGL renderer and attach it to the document
// const canvas = document.getElementById("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Add Ambient Light
// let ambient = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambient);

// // Add Directional Light
// let directional = new THREE.DirectionalLight(0xffffff, 1);
// directional.position.set(10, 10, 20);
// scene.add(directional);

// // Add Directional Light Helper
// const helper = new THREE.DirectionalLightHelper(directional, 10);
// scene.add(helper);

// // Add Point Light (Increased distance)
// let point = new THREE.PointLight(0xffffff, 5, 100, 2);  // Increased distance to 100
// point.position.set(10, -3, 10);
// scene.add(point);

// // Add Point Light Helper (Adjust helper size if needed)
// const pointLightHelper = new THREE.PointLightHelper(point, 8);  // Increased helper size to 5
// scene.add(pointLightHelper);

// // Create a box geometry
// const geometry = new THREE.BoxGeometry(10, 10, 10, 2, 10);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const cube = new THREE.Mesh(geometry, material);

// // Add the cube to the scene
// scene.add(cube);

// // Position the camera so we can see the box
// camera.position.z = 20;  // Set farther for better view

// // Resize handling function
// function onWindowResize() {
//     // Update camera aspect ratio and projection matrix
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Update renderer size
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // OrbitControls for camera interaction
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  // Smooth movement
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// // Listen for window resize events
// window.addEventListener('resize', onWindowResize, false);

// // Animation loop to render the scene
// function animate() {
//     requestAnimationFrame(animate);

//     // Rotate the cube for a little motion
//     cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;

//     // Update controls (important for damping and interaction)
//     controls.update();

//     // Render the scene
//     renderer.render(scene, camera);
// }

// // Call the animate function to start the rendering loop
// animate();










// import { DirectionalLightHelper } from 'three';
// import GUI from 'lil-gui';

// // Create a scene
// const scene = new THREE.Scene();

// // Set up a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;  // Position the camera so we can see the box

// // Set up a WebGL renderer and attach it to the document
// const canvas = document.getElementById("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Set background to black
// renderer.setClearColor(0x000000);  // Black background

// // Load the texture before creating the material
// let loader = new THREE.TextureLoader();
// let color = loader.load("../txt/color.jpg");
// let roughness = loader.load("../txt/roughness.jpg");
// let normal = loader.load("../txt/normal.png");
// let height = loader.load("../txt/height.png");

// // Create a box geometry
// const geometry = new THREE.BoxGeometry(3, 1.5, 1.5);
// const material = new THREE.MeshStandardMaterial({ 
//     map: color, 
//     roughnessMap: roughness, 
//     normalMap: normal,
//     displacementMap: height, // Corrected from HeightMap to displacementMap
//     displacementScale: 0.1,  // Adjust scale for displacement effect
// });
// const box = new THREE.Mesh(geometry, material);
// scene.add(box);  // Add the box to the scene

// // Add Ambient Light for general lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
// scene.add(ambientLight);

// // Add point light with position
// const pointLight = new THREE.PointLight(0xffffff, 0.5); // Soft white light
// pointLight.position.set(2, 5, 3);  // Position the point light
// scene.add(pointLight);

// // Add Directional Light (red with high intensity)
// const redDirectionalLight = new THREE.DirectionalLight(0xff0000, 3); // Red light with intensity of 3
// redDirectionalLight.position.set(5, 10, 7.5); // Position the light in the scene
// scene.add(redDirectionalLight);

// // Add helpers for lights
// const directionalLightHelper = new THREE.DirectionalLightHelper(redDirectionalLight, 5); // Size of the helper
// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5); // Size of the helper
// scene.add(pointLightHelper);

// // Optional: Add GridHelper to visualize the ground
// const gridHelper = new THREE.GridHelper(10, 10); // Size and divisions of the grid
// scene.add(gridHelper);

// // OrbitControls for interactive camera movement
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  // Smooth movement
// controls.dampingFactor = 0.25;  // Damping strength
// controls.enableZoom = true;     // Enable zoom

// // Resize handling function
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // Listen for window resize events
// window.addEventListener('resize', onWindowResize, false);

// // Create a GUI panel
// const gui = new GUI();

// // Add controls for material settings
// const materialFolder = gui.addFolder('Material Settings');
// materialFolder.addColor(material, 'color').name('Color');
// materialFolder.add(material, 'transparent');
// materialFolder.add(material, 'opacity', 0, 1, 0.01);
// materialFolder.add(material, 'displacementScale', 0, 1, 0.01).name('Displacement Scale');
// materialFolder.open();

// // Add controls for mesh settings
// const meshFolder = gui.addFolder('Mesh Settings');
// meshFolder.add(box.position, 'x', -5, 5, 0.01).name('Position X');
// meshFolder.add(box.position, 'y', -5, 5, 0.01).name('Position Y');
// meshFolder.add(box.position, 'z', -5, 5, 0.01).name('Position Z');
// meshFolder.add(box.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
// meshFolder.add(box.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
// meshFolder.add(box.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
// meshFolder.open();

// // Animation loop to render the scene
// function animate() {
//     requestAnimationFrame(animate);
//     box.rotation.y += 0.01;
//     directionalLightHelper.update();
//     controls.update();  // Update the controls (important for damping)
//     renderer.render(scene, camera);
// }

// animate();











// // Create a scene
// const scene = new THREE.Scene();

// // Set up a camera (PerspectiveCamera: field of view, aspect ratio, near clipping, far clipping)
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Set up a WebGL renderer and attach it to the document
// const canvas = document.querySelector("#canvas");
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
// // document.body.appendChild(renderer.domElement);

// // Create a box geometry
// const geometry = new THREE.boxGeometry(5, 5, 5, 30,10,true);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side:THREE.DoubleSide,wireframe:true });
// const box = new THREE.Mesh(geometry, material);

// // Add the box to the scene
// scene.add(box);

// // Position the camera so we can see the box
// camera.position.z = 30;

// // OrbitControls for interactive camera movement
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  // Smooth movement
// controls.dampingFactor = 0.25;  // Damping strength
// controls.enableZoom = true;     // Enable zoom

// // Resize handling function
// function onWindowResize() {
//     // Update camera aspect ratio and projection matrix
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Update renderer size
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // Listen for window resize events
// window.addEventListener('resize', onWindowResize, false);

// // Animation loop to render the scene
// function animate() {
//     requestAnimationFrame(animate);

//     // Rotate the box for a little motion
//     // box.rotation.x += 0.01;
//     // box.rotation.y += 0.01;

//     controls.update();  // Update the controls (important for damping)

//     renderer.render(scene, camera);
// }

// // Call the animate function to start the rendering loop
// animate();









 

//  // Create a scene
//  const scene = new THREE.Scene();

//  // Set up a camera (PerspectiveCamera: field of view, aspect ratio, near clipping, far clipping)
//  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//  // Set up a WebGL renderer and attach it to the document
//  const canvas = document.getElementById("canvas");
//  const renderer = new THREE.WebGLRenderer({canvas});
//  renderer.setSize(window.innerWidth, window.innerHeight);
//  document.body.appendChild(renderer.domElement);

//  const geometry = new THREE.cubeGeometry( 1, 10, 10,2,10); 
//  const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } ); 
//  const cube = new THREE.Mesh( geometry, material ); 

//  // Add the cube to the scene
//  scene.add(cube);

//  // Position the camera so we can see the box
//  camera.position.z = 5;

//  // Resize handling function
//  function onWindowResize() {
//   // Update camera aspect ratio and projection matrix
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   // Update renderer size
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// //Orbit Controls

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping= true;//smooth movement
// controls.dampingFactor=0.25;
// controls.enableZoom=true;
// // controls.autoRotate=true;//to enable auto rotate
// // controls.autoRotateSpeed=20;//to enable auto rotate



// // Listen for window resize events
// window.addEventListener('resize', onWindowResize, false);


//  // Animation loop to render the scene
//  function animate() {
//      requestAnimationFrame(animate);

//      // Rotate the cube for a little motion
//      cube.rotation.x += 0.01;
//      cube.rotation.y += 0.01;
//     //  cube.rotation.z += 0.01;

//      renderer.render(scene, camera);
//  }

//  // Call the animate function to start the rendering loop
//  animate();






// import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe:true });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// const canvas = document.getElementById("canvas");
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);


// //resize and change in screen size
// window.addEventListener('resize', ()=> {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix(); 
// })


// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping= true;//smooth movement
// controls.autoRotate=true;//to enable auto rotate
// controls.autoRotateSpeed=20;//to enable auto rotate
// // controls.enableZoom=true;//can't zoom
// // controls.dampingFactor=0.01;//movement speed




// function animate() {
//   window.requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;
//   // cube.rotation.z += 0.01;

//   controls.update();
// }
// animate();


