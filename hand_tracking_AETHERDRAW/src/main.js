import { initScene, updateDrawing } from './scene.js';
import { initHandTracking } from './hands.js';
import { updateUI } from './ui.js';
import { state } from './state.js';

// Initialize Three.js Scene
initScene();

// Initialize Hand Tracking
initHandTracking(() => {
  // This callback runs on every frame after hand processing
  
  // 1. Update UI (Cursors, Tool Selection)
  updateUI();

  // 2. Update Drawing Logic (Left Hand)
  updateDrawing(state.hands.left);
});

console.log("AetherDraw Initialized");
