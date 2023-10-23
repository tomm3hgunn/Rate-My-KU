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

