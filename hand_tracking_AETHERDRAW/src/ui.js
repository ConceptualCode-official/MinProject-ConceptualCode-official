import { state, tools } from './state.js';
import { clearCanvas, saveCanvas } from './scene.js';

// DOM Elements
const cursorLeft = document.getElementById('cursor-left');
const cursorRight = document.getElementById('cursor-right');
const toolPanel = document.getElementById('tool-panel');

// Tool Elements
const toolsEls = {
  brush: document.getElementById('btn-brush'),
  pencil: document.getElementById('btn-pencil'),
  eraser: document.getElementById('btn-eraser'),
  clear: document.getElementById('btn-clear'),
  save: document.getElementById('btn-save')
};

const colorEls = document.querySelectorAll('.color-btn');

export function updateUI() {
  updateCursors();
  handleToolInteraction();
}

function updateCursors() {
  // Left Cursor (Draw)
  if (state.hands.left.visible) {
    cursorLeft.style.display = 'block';
    // Mirror X coordinate for CSS
    const x = (1 - state.hands.left.x) * 100;
    const y = state.hands.left.y * 100;
    cursorLeft.style.left = `${x}%`;
    cursorLeft.style.top = `${y}%`;
    
    if (state.hands.left.isPinched) {
      cursorLeft.classList.add('pinched');
      cursorLeft.style.borderColor = state.activeColor;
    } else {
      cursorLeft.classList.remove('pinched');
      cursorLeft.style.borderColor = state.activeColor;
    }
  } else {
    cursorLeft.style.display = 'none';
  }

  // Right Cursor (Tool)
  if (state.hands.right.visible) {
    cursorRight.style.display = 'block';
    const x = (1 - state.hands.right.x) * 100;
    const y = state.hands.right.y * 100;
    cursorRight.style.left = `${x}%`;
    cursorRight.style.top = `${y}%`;

    if (state.hands.right.isPinched) {
      cursorRight.classList.add('pinched');
    } else {
      cursorRight.classList.remove('pinched');
    }
  } else {
    cursorRight.style.display = 'none';
  }
}

function handleToolInteraction() {
  if (!state.hands.right.visible) return;

  // Get cursor position in pixels
  const cursorX = (1 - state.hands.right.x) * window.innerWidth;
  const cursorY = state.hands.right.y * window.innerHeight;

  // Check collision with tool panel elements
  // We use document.elementFromPoint logic or bounding box checks
  // Since we have specific elements, bounding box is safer
  
  // 1. Check Tools
  Object.entries(toolsEls).forEach(([name, el]) => {
    if (isOverElement(cursorX, cursorY, el)) {
      el.classList.add('bg-white/10'); // Hover effect
      
      if (state.hands.right.isPinched) {
        if (name === 'clear') {
          clearCanvas();
          flashFeedback(el);
        } else if (name === 'save') {
          saveCanvas();
          flashFeedback(el);
        } else {
          setActiveTool(name);
        }
      }
    } else {
      el.classList.remove('bg-white/10');
    }
  });

  // 2. Check Colors
  colorEls.forEach(el => {
    if (isOverElement(cursorX, cursorY, el)) {
      el.style.transform = 'scale(1.2)';
      if (state.hands.right.isPinched) {
        setActiveColor(el.dataset.color);
      }
    } else {
      el.style.transform = 'scale(1)';
    }
  });
}

function isOverElement(x, y, el) {
  const rect = el.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function setActiveTool(toolName) {
  state.activeTool = toolName;
  state.brushSize = tools[toolName].size;
  
  // Update UI
  Object.values(toolsEls).forEach(el => el.classList.remove('active'));
  if (toolsEls[toolName]) toolsEls[toolName].classList.add('active');
}

function setActiveColor(color) {
  state.activeColor = color;
  
  // Update UI borders
  colorEls.forEach(el => {
    if (el.dataset.color === color) {
      el.classList.add('border-white');
      el.classList.remove('border-transparent');
    } else {
      el.classList.remove('border-white');
      el.classList.add('border-transparent');
    }
  });
}

function flashFeedback(el) {
  el.style.backgroundColor = 'rgba(255,255,255,0.5)';
  setTimeout(() => {
    el.style.backgroundColor = '';
  }, 200);
}

// Initialize Lucide icons
lucide.createIcons();
