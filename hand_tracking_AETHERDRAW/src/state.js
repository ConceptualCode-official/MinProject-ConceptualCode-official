// Global Application State
export const state = {
  activeTool: 'brush', // brush, pencil, eraser
  activeColor: '#00f3ff',
  brushSize: 0.05,
  isDrawing: false,
  isSelecting: false,
  
  // Hand positions (normalized 0-1)
  hands: {
    left: { x: 0, y: 0, z: 0, isPinched: false, visible: false },
    right: { x: 0, y: 0, z: 0, isPinched: false, visible: false }
  },

  // Configuration
  config: {
    pinchThreshold: 0.05, // Distance between thumb and index
    smoothing: 0.2, // Lerp factor
    zDepthSensitivity: 2,
  }
};

export const tools = {
  brush: { size: 0.08, opacity: 1 },
  pencil: { size: 0.02, opacity: 1 },
  eraser: { size: 0.1, opacity: 0 } // Eraser logic handled in scene
};
