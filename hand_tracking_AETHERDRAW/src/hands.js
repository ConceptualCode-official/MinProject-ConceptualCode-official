import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { state } from './state.js';
import { distance, lerp } from './utils.js';

export function initHandTracking(onResultsCallback) {
  const videoElement = document.getElementById('input-video');

  // Fix: Set attributes to satisfy browser autoplay policies and prevent permission errors
  // Browsers often block autoplaying video with audio, so muting is essential.
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.autoplay = true;

  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  hands.onResults((results) => {
    processResults(results);
    if (onResultsCallback) onResultsCallback();
  });

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
  });

  camera.start()
    .then(() => {
      const loader = document.getElementById('loading-overlay');
      if (loader) {
        loader.classList.add('opacity-0', 'pointer-events-none');
        // Remove from DOM after transition to clean up
        setTimeout(() => loader.remove(), 500);
      }
    })
    .catch(err => {
      console.error("Camera error:", err);
      alert("Camera access denied or not available. Please allow camera access and reload.");
    });
}

function processResults(results) {
  // Reset visibility
  state.hands.left.visible = false;
  state.hands.right.visible = false;

  if (results.multiHandLandmarks) {
    for (const [index, landmarks] of results.multiHandLandmarks.entries()) {
      const classification = results.multiHandedness[index];
      // MediaPipe mirrors the image by default in the camera utility, 
      // but the label 'Right' usually refers to the user's right hand 
      // (which appears on the left side of the mirrored video).
      const isRight = classification.label === 'Right'; 
      
      const handState = isRight ? state.hands.right : state.hands.left;
      
      handState.visible = true;

      // Index finger tip (8)
      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];

      // Smooth coordinates
      handState.x = lerp(handState.x, indexTip.x, state.config.smoothing);
      handState.y = lerp(handState.y, indexTip.y, state.config.smoothing);
      handState.z = lerp(handState.z, indexTip.z, state.config.smoothing);

      // Pinch Detection
      // We calculate distance in 3D (using Z) for better accuracy, 
      // though Z is relative in MediaPipe.
      const pinchDist = distance(
        {x: indexTip.x, y: indexTip.y, z: 0}, 
        {x: thumbTip.x, y: thumbTip.y, z: 0}
      );
      
      handState.isPinched = pinchDist < state.config.pinchThreshold;
    }
  }

  // Update Logic based on hand states
  updateAppState();
}

function updateAppState() {
  // Left Hand = Drawing
  if (state.hands.left.visible) {
    state.isDrawing = state.hands.left.isPinched;
  } else {
    state.isDrawing = false;
  }

  // Right Hand = Tool Selection
  if (state.hands.right.visible) {
    state.isSelecting = state.hands.right.isPinched;
  } else {
    state.isSelecting = false;
  }
}
