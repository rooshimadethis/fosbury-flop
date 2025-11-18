chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL('paywalled_sites.json'))
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.set({ paywalledSites: data });
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.storage.local.get('paywalledSites', (data) => {
      const paywalledSites = data.paywalledSites || [];
      const url = new URL(tab.url);
      const hostname = url.hostname.replace('www.', '');

      if (paywalledSites.some(site => hostname.includes(site)) && url.pathname !== '/' && url.pathname !== '') {
        chrome.tabs.create({ url: `https://archive.ph/${tab.url}` });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addSite') {
    chrome.storage.local.get('paywalledSites', (data) => {
      const paywalledSites = data.paywalledSites || [];
      if (!paywalledSites.includes(request.site)) {
        paywalledSites.push(request.site);
        chrome.storage.local.set({ paywalledSites }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: true }); // Already exists, but still a success
      }
    });
    return true; // Indicates that the response is sent asynchronously
  } else if (request.action === 'removeSite') {
    chrome.storage.local.get('paywalledSites', (data) => {
      let paywalledSites = data.paywalledSites || [];
      paywalledSites = paywalledSites.filter(site => site !== request.site);
      chrome.storage.local.set({ paywalledSites }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
});
