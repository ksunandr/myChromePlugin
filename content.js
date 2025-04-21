let sequence = [];
let currentIndex = 0;
const values = ["KA", "AF", "JC", "AH", "GW"];
let div = null;
let isVisible = false;

// Shuffle utility
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Render sequence with highlight
function renderSequence() {
  if (!div) return;

  div.innerHTML = sequence
    .map((item, index) => {
      if (index === currentIndex) {
        return `<span style="padding: 2px 6px; border: 2px solid white; border-radius: 50%;">${item}</span>`;
      } else {
        return `<span style="margin: 0 5px;">${item}</span>`;
      }
    })
    .join(" ");
}

// Handle single click (cycle through)
function handleClick() {
  if (sequence.length > 0) {
    currentIndex = (currentIndex + 1) % sequence.length;
    renderSequence();
  }
}

// Handle double click (reset sequence)
function handleDoubleClick() {
  sequence = shuffleArray(values);
  currentIndex = 0;
  renderSequence();
}

// Show or hide block
function toggleBlock() {
  if (!div) {
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.right = '20px';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.style.color = 'white';
    div.style.padding = '10px 15px';
    div.style.borderRadius = '10px';
    div.style.fontSize = '18px';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.zIndex = '99999';
    div.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    div.style.cursor = 'pointer';
    div.addEventListener("click", handleClick);
    div.addEventListener("dblclick", handleDoubleClick);
    document.body.appendChild(div);
  }

  if (isVisible) {
    div.style.display = "none";
    isVisible = false;
  } else {
    sequence = shuffleArray(values);
    currentIndex = 0;
    renderSequence();
    div.style.display = "block";
    isVisible = true;
  }
}

// Wait for message from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_SEQUENCE") {
    toggleBlock();
  }
});
