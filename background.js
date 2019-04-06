'use strict';

chrome.runtime.onInstalled.addListener(function () {

  //defaults for local data
  chrome.storage.sync.set({ userInactive: false }, function () { });
  chrome.storage.sync.set({ on: false }, function () { });
  chrome.storage.sync.set({ paused: false }, function () { });
  chrome.storage.sync.set({ activeTabs: [] }, function () { });
  chrome.storage.sync.set({ allowRefresh: false }, function () { }); //used to make sure we only refresh tabs extention was turned on for
  chrome.storage.sync.set({ color: 'green' }, function () { });

});


//actions on hot key
// pause and unpuse
chrome.commands.onCommand.addListener(function (command) {

  // console.log(`Command: ${command} has been activated!`);
  chrome.storage.sync.get(['paused'], function (result) {
    paused = result['paused'];
    if (paused) {
      chrome.storage.sync.set({ paused: false }, function () {
        console.log("Un-Paused");
      });
    } else {
      chrome.storage.sync.set({ paused: true }, function () {
        console.log("Paused");
      });
    }
  });

});

//check status and update icon accordingly
setInterval(function () {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    console.log("Tabs:");
    console.log(tabs);
    var activeTab = tabs[0];
    var activeTabId = activeTab.id;
    chrome.storage.sync.get(['activeTabs'], function (result) {
      let activeTabs = result['activeTabs'];
      if (activeTabs.includes(activeTabId)) {
        chrome.storage.sync.set({ allowRefresh: true }, function () { });
      } else {
        chrome.storage.sync.set({ allowRefresh: false }, function () { });
      }
    })

  });

  chrome.storage.sync.get(['on'], function (refreshResult) {
    let on = refreshResult['on'];
    if (on === true) {
      chrome.storage.sync.get(['userInactive'], function (result) {
        chrome.storage.sync.get(['paused'], function (pausedResult) {
          let userInactive = result['userInactive'];
          const paused = pausedResult['paused'];

          // console.log('refreshOn: ', refreshOn);
          // console.log('userInactive: ', userInactive);

          if (paused) {
            chrome.browserAction.setBadgeText({ text: 'Hold' });
            chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' })

          } else {
            if (userInactive) {
              chrome.browserAction.setBadgeText({ text: 'Running' });
              chrome.browserAction.setBadgeBackgroundColor({ color: 'green' })

            } else if (!userInactive) {
              chrome.browserAction.setBadgeText({ text: 'Stop' });
              chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })
            }
          }

        });
      })
    } else {
      chrome.browserAction.setBadgeText({ text: '' });
    }

  });
}, 400)

// This looks promising for watching files maybe?
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture