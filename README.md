# fosbunny flop

A Chrome extension to bypass paywalls using archive.ph.

## Features

*   Automatically redirects to an archived version of a page if the site is on the paywalled list.
*   Click the extension icon to open a popup with the following features:
    *   Add the current site to the paywalled list.
    *   View the list of paywalled sites.
    *   Remove a site from the paywalled list.

## Potential Features

*   **Automatic Dark Mode Icon:** Automatically switch the delete icon to a dark mode version when the user has a dark theme enabled.
*   **Custom Archive Service:** Allow users to choose their own archive service (e.g., archive.org, google cache).
*   **Keyboard Shortcut:** Add a keyboard shortcut to add a site to the paywalled list.
*   **Syncing:** Sync the paywalled sites list across devices using `chrome.storage.sync`.

## Installation

1.  Clone this repository or download the source code.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory where you saved the source code.
