const flipButton = document.getElementById('flipBtn');
const copyButton = document.getElementById('copyBtn');
const colorDisplay = document.getElementById('colorDisplay');
const copyMsg = document.getElementById('copyMsg');
const colorModeSelect = document.getElementById('colorMode');
const darkModeToggle = document.getElementById('darkModeToggle');
const lockToggle = document.getElementById('lockToggle');
const colorHistoryContainer = document.getElementById('colorHistory');

const predefinedColors = [
  '#FF5733', '#33FF57', '#3357FF',
  '#F3FF33', '#FF33F6', '#33FFF6',
  '#A833FF', '#FF8C33'
];

let colorHistory = [];

function getRandomHex() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return '#' + hex.padStart(6, '0');
}

function getRandomRgb() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomHsl() {
  const h = Math.floor(Math.random() * 361);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getPredefinedColor() {
  const index = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[index];
}

function setColor(color) {
  document.body.style.backgroundColor = color;

  // Animate color display
  colorDisplay.classList.remove('show');
  setTimeout(() => {
    colorDisplay.textContent = 'Current Color: ' + color;
    colorDisplay.classList.add('show');
  }, 100);

  addToHistory(color);
}

function addToHistory(color) {
  if (colorHistory.includes(color)) return;

  colorHistory.unshift(color);
  if (colorHistory.length > 10) {
    colorHistory.pop();
  }
  renderHistory();
}

function renderHistory() {
  colorHistoryContainer.innerHTML = '';
  colorHistory.forEach(color => {
    const box = document.createElement('div');
    box.classList.add('color-box');
    box.style.backgroundColor = color;
    box.title = color;
    box.addEventListener('click', () => {
      setColor(color);
    });
    colorHistoryContainer.appendChild(box);
  });
}

flipButton.addEventListener('click', () => {
  if (lockToggle.checked) {
    copyMsg.style.color = 'orange';
    copyMsg.textContent = 'Color is locked.';
    return;
  }

  let newColor;
  const mode = colorModeSelect.value;

  switch (mode) {
    case 'hex': newColor = getRandomHex(); break;
    case 'rgb': newColor = getRandomRgb(); break;
    case 'hsl': newColor = getRandomHsl(); break;
    case 'predefined': newColor = getPredefinedColor(); break;
    default: newColor = getRandomHex();
  }

  setColor(newColor);
  copyMsg.textContent = '';
});

copyButton.addEventListener('click', () => {
  const color = colorDisplay.textContent.replace('Current Color: ', '').trim();

  navigator.clipboard.writeText(color)
    .then(() => {
      copyMsg.style.color = 'green';
      copyMsg.textContent = 'Color copied to clipboard!';
    })
    .catch(() => {
      copyMsg.style.color = 'red';
      copyMsg.textContent = 'Failed to copy.';
    });
});

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
});

window.addEventListener('DOMContentLoaded', () => {
  colorDisplay.classList.add('show');
});
