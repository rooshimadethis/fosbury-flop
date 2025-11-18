const addSiteButton = document.getElementById('add-site');
const paywalledSitesList = document.getElementById('paywalled-sites-list');

function renderPaywalledSites() {
  chrome.storage.local.get('paywalledSites', (data) => {
    const paywalledSites = data.paywalledSites || [];
    paywalledSitesList.innerHTML = '';

    paywalledSites.forEach((site) => {
      const listItem = document.createElement('li');
      listItem.textContent = site;

      const deleteButton = document.createElement('button');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'images/delete128.png';
      deleteIcon.classList.add('delete-icon');
      deleteButton.appendChild(deleteIcon);
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'removeSite', site }, () => {
          renderPaywalledSites();
        });
      });

      listItem.appendChild(deleteButton);
      paywalledSitesList.appendChild(listItem);
    });
  });
}

addSiteButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.url) {
      const url = new URL(tab.url);
      const hostname = url.hostname.replace('www.', '');

      chrome.runtime.sendMessage({ action: 'addSite', site: hostname }, (response) => {
        if (response.success) {
          renderPaywalledSites();
          chrome.tabs.create({ url: `https://archive.ph/${tab.url}` });
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', renderPaywalledSites);


