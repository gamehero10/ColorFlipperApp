const flipButton = document.getElementById('flipBtn');
const copyButton = document.getElementById('copyBtn');
const colorDisplay = document.getElementById('colorDisplay');
const copyMsg = document.getElementById('copyMsg');
const colorModeSelect = document.getElementById('colorMode');
const darkModeToggle = document.getElementById('darkModeToggle');
const lockToggle = document.getElementById('lockToggle');
const colorHistoryContainer = document.getElementById('colorHistory');
const colorPaletteContainer = document.getElementById('colorPalette');

const predefinedColors = [
  '#FF5733', '#33FF57', '#3357FF',
  '#F3FF33', '#FF33F6', '#33FFF6',
  '#A833FF', '#FF8C33' 
];

let colorHistory = [];

function getRandomHex() {
  try {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return '#' + hex.padStart(6, '0');
  } catch {
    return '#000000'; // fallback
  }
}

function getRandomRgb() {
  try {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return 'rgb(0, 0, 0)';
  }
}

function getRandomHsl() {
  try {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return `hsl(${h}, ${s}%, ${l}%)`;
  } catch {
    return 'hsl(0, 0%, 0%)';
  }
}

function getPredefinedColor() {
  try {
    const index = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[index];
  } catch {
    return '#000000';
  }
}

function setColor(color) {
  try {
    document.body.style.backgroundColor = color;

    colorDisplay.classList.remove('show');
    setTimeout(() => {
      colorDisplay.textContent = 'Current Color: ' + color;
      colorDisplay.classList.add('show');
    }, 100);

    addToHistory(color);
    generatePalette(color);
  } catch (error) {
    console.error('Failed to set color:', error);
    copyMsg.style.color = 'red';
    copyMsg.textContent = 'Error: Invalid color format.';
  }
}

function addToHistory(color) {
  if (colorHistory.includes(color)) return;
  colorHistory.unshift(color);
  if (colorHistory.length > 10) {
    colorHistory.pop();
  }
  renderColorList(colorHistory, colorHistoryContainer);
}

function renderColorList(colors, container) {
  const fragment = document.createDocumentFragment();

  colors.forEach(color => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;
    box.title = color;

    box.addEventListener('click', () => {
      try {
        setColor(color);
      } catch (err) {
        console.warn('Failed to apply color from list:', err);
      }
    });

    fragment.appendChild(box);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

function generatePalette(baseColor) {
  try {
    const base = chroma(baseColor);
    const palette = [
      base.hex(),
      base.brighten(1).hex(),
      base.darken(1).hex(),
      base.set('hsl.h', '+30').hex(),
      base.set('hsl.h', '-30').hex()
    ];

    renderColorList(palette, colorPaletteContainer);
  } catch (error) {
    console.warn('Palette generation failed for:', baseColor);
    copyMsg.style.color = 'red';
    copyMsg.textContent = 'Palette generation failed.';
    colorPaletteContainer.innerHTML = '';
  }
}

flipButton.addEventListener('click', () => {
  if (lockToggle.checked) {
    copyMsg.style.color = 'orange';
    copyMsg.textContent = 'Color is locked.';
    return;
  }

  try {
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
  } catch (err) {
    console.error('Error during color flip:', err);
    copyMsg.style.color = 'red';
    copyMsg.textContent = 'Failed to flip color.';
  }
});

copyButton.addEventListener('click', () => {
  try {
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
  } catch (err) {
    console.error('Copy error:', err);
    copyMsg.style.color = 'red';
    copyMsg.textContent = 'Clipboard error.';
  }
});

darkModeToggle.addEventListener('change', () => {
  try {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  } catch (err) {
    console.warn('Dark mode toggle failed:', err);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  colorDisplay.classList.add('show');
});
