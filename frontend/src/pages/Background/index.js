console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isPopupOn: true }, () => {
        console.log('Initial state set to true');
        // Logging the state after setting it
        chrome.storage.local.get(['isPopupOn'], (result) => {
            console.log('State after set:', result.isPopupOn);
        });
    });
});

// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received in background:', request);
    if (request.isPopupOn) {
        chrome.storage.local.set({ isPopupOn: true }, () => {
            console.log('State saved: true');
        });
    } else {
        chrome.storage.local.set({ isPopupOn: false }, () => {
            console.log('State saved: false');
        });
    }
});

