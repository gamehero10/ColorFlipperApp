const button = document.getElementById('flipBtn');
const colorDisplay = document.getElementById('colorDisplay');

function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return '#' + hex.padStart(6, '0');
}

button.addEventListener('click', () => {
  const newColor = getRandomColor();
  document.body.style.backgroundColor = newColor;
  colorDisplay.textContent = 'Current Color: ' + newColor;
});
