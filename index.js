const flipButton = document.getElementById('flipBtn');
const copyButton = document.getElementById('copyBtn');
const colorDisplay = document.getElementById('colorDisplay');
const copyMsg = document.getElementById('copyMsg');
const colorModeSelect = document.getElementById('colorMode');

const predefinedColors = [
  '#FF5733', // Red-Orange
  '#33FF57', // Green
  '#3357FF', // Blue
  '#F3FF33', // Yellow
  '#FF33F6', // Pink
  '#33FFF6', // Cyan
  '#A833FF', // Purple
  '#FF8C33', // Orange
];

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
  const h = Math.floor(Math.random() * 361); // 0-360
  const s = Math.floor(Math.random() * 101); // 0-100%
  const l = Math.floor(Math.random() * 101); // 0-100%
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getPredefinedColor() {
  const index = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[index];
}

function setColor(color) {
  document.body.style.backgroundColor = color;
  colorDisplay.textContent = 'Current Color: ' + color;
}

flipButton.addEventListener('click', () => {
  let newColor;
  const mode = colorModeSelect.value;

  switch (mode) {
    case 'hex':
      newColor = getRandomHex();
      break;
    case 'rgb':
      newColor = getRandomRgb();
      break;
    case 'hsl':
      newColor = getRandomHsl();
      break;
    case 'predefined':
      newColor = getPredefinedColor();
      break;
    default:
      newColor = getRandomHex();
  }

  setColor(newColor);
  copyMsg.textContent = ''; // Clear copy message
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
