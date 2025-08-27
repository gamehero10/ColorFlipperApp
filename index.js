const flipButton = document.getElementById('flipBtn');
const copyButton = document.getElementById('copyBtn');
const colorDisplay = document.getElementById('colorDisplay');
const copyMsg = document.getElementById('copyMsg');

function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return '#' + hex.padStart(6, '0');
}

function setColor(color) {
  document.body.style.backgroundColor = color;
  colorDisplay.textContent = 'Current Color: ' + color;
}

// Flip color on button click
flipButton.addEventListener('click', () => {
  const newColor = getRandomColor();
  setColor(newColor);
  copyMsg.textContent = ''; // Clear copy message
});

// Copy color on button click
copyButton.addEventListener('click', () => {
  const color = colorDisplay.textContent.replace('Current Color: ', '').trim();

  navigator.clipboard.writeText(color)
    .then(() => {
      copyMsg.textContent = 'Color copied to clipboard!';
    })
    .catch(() => {
      copyMsg.textContent = 'Failed to copy.';
      copyMsg.style.color = 'red';
    });
});
