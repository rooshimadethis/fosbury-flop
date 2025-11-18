let paywalledSites = [];

fetch(chrome.runtime.getURL('paywalled_sites.json'))
  .then(response => response.json())
  .then(data => {
    paywalledSites = data;
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    const hostname = url.hostname.replace('www.', '');

    if (paywalledSites.some(site => hostname.includes(site)) && url.pathname !== '/' && url.pathname !== '') {
      chrome.tabs.create({ url: `https://archive.ph/${tab.url}` });
    }
  }
});
