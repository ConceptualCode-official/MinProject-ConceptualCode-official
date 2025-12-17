// Utility functions for math and colors

export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

export function distance(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + 
    Math.pow(p1.y - p2.y, 2) + 
    Math.pow(p1.z - p2.z, 2)
  );
}

// Convert HEX color to Three.js Color compatible format if needed, 
// though Three.js handles hex strings well.
