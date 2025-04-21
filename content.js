let currentText = "Hello there!";

const div = document.createElement('div');
div.innerText = currentText;
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
document.body.appendChild(div);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHANGE_TEXT") {
    currentText = currentText === "Hello there!" ? "You clicked the icon!" : "Hello there!";
    div.innerText = currentText;
  }
});
