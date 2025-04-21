chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;

  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_SEQUENCE" }, (response) => {
    if (chrome.runtime.lastError) {
      console.warn("Could not send message:", chrome.runtime.lastError.message);
    }
  });
});
