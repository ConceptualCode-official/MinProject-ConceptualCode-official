import * as THREE from 'three';
import { state, tools } from './state.js';

let scene, camera, renderer;
let strokes = [];
let currentStroke = null;
let lastPoint = null;

export function initScene() {
  const container = document.getElementById('canvas-container');

  // Scene Setup
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.02);

  // Camera Setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Grid Helper (Subtle)
  const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x111111);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  // Animation Loop
  animate();

  // Resize Handler
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function updateDrawing(handPos) {
  if (!state.hands.left.visible) {
    endStroke();
    return;
  }

  // Convert normalized hand coordinates (0-1) to World Coordinates
  // Map x (0 to 1) -> (-aspect*5 to aspect*5)
  // Map y (0 to 1) -> (5 to -5)
  // Map z -> depth
  
  const vector = new THREE.Vector3();
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 5; // Half-height of view at z=0 roughly

  // Simple projection for drawing on a plane or in space
  // We'll use a fixed Z plane modified by hand Z
  const x = (1 - handPos.x) * 2 - 1; // Flip X for mirror effect
  const y = (1 - handPos.y) * 2 - 1;
  
  // Unproject to find world position at a certain depth
  vector.set(x, y, 0.5); // 0.5 is between near/far
  vector.unproject(camera);
  
  const dir = vector.sub(camera.position).normalize();
  const distance = (0 - camera.position.z) / dir.z; // Project to Z=0 plane initially
  
  // Add hand depth influence
  // handPos.z is usually small relative to wrist. 
  // We'll just map X/Y to a comfortable drawing plane for now to ensure usability.
  
  const drawX = (1 - handPos.x - 0.5) * (aspect * 10); 
  const drawY = (1 - handPos.y - 0.5) * -10;
  const drawZ = handPos.z * -10; // Depth scaling

  const currentPoint = new THREE.Vector3(drawX, drawY, drawZ);

  if (state.isDrawing) {
    if (!currentStroke) {
      startStroke(currentPoint);
    } else {
      continueStroke(currentPoint);
    }
  } else {
    endStroke();
  }
}

function startStroke(point) {
  if (state.activeTool === 'eraser') {
    // Eraser logic could be raycasting and removing objects, 
    // but for MVP we'll skip complex eraser or just draw black lines
    // Let's stick to drawing for now.
    return; 
  }

  currentStroke = {
    points: [point],
    mesh: null,
    material: new THREE.MeshStandardMaterial({
      color: state.activeColor,
      roughness: 0.4,
      metalness: 0.1,
      emissive: state.activeColor,
      emissiveIntensity: 0.2
    })
  };
  lastPoint = point;
}

function continueStroke(point) {
  if (!currentStroke || !lastPoint) return;

  // Distance check to avoid too many points
  if (point.distanceTo(lastPoint) < 0.05) return;

  // Create a segment (Cylinder or Capsule)
  // For smoother lines, TubeGeometry is better but requires regenerating geometry.
  // For performance in a drawing app, individual segments are often used.
  
  const direction = new THREE.Vector3().subVectors(point, lastPoint);
  const length = direction.length();
  
  const geometry = new THREE.CylinderGeometry(
    state.brushSize, 
    state.brushSize, 
    length, 
    8, 
    1
  );
  
  // Rotate geometry to align with direction
  geometry.translate(0, length / 2, 0); 
  geometry.rotateX(Math.PI / 2);
  
  const mesh = new THREE.Mesh(geometry, currentStroke.material);
  
  // Orient mesh
  mesh.position.copy(lastPoint);
  mesh.lookAt(point);
  
  scene.add(mesh);
  strokes.push(mesh); // Store for undo/clear

  // Add a joint sphere to smooth corners
  const jointGeo = new THREE.SphereGeometry(state.brushSize, 8, 8);
  const joint = new THREE.Mesh(jointGeo, currentStroke.material);
  joint.position.copy(lastPoint);
  scene.add(joint);
  strokes.push(joint);

  currentStroke.points.push(point);
  lastPoint = point;
}

function endStroke() {
  currentStroke = null;
  lastPoint = null;
}

export function clearCanvas() {
  strokes.forEach(mesh => scene.remove(mesh));
  strokes = [];
}

export function saveCanvas() {
  renderer.render(scene, camera);
  const dataURL = renderer.domElement.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'aether-art-' + Date.now() + '.png';
  link.href = dataURL;
  link.click();
}

function animate() {
  requestAnimationFrame(animate);
  
  // Optional: Rotate scene slightly if idle? 
  // No, let's keep it static for precise drawing.
  
  renderer.render(scene, camera);
}
