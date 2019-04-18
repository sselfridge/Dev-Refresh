'use strict';

//Background.js Globals
let paused = false; //is the extention paused? either by keyboard command or offscreen
let currentTab = null; //current tab - refreshed on tabchange with onActiveChanged
let userInactive = false;
let activeTabs = [];  //can't pass a set through the chrome DB for some reason - keeping in as array


chrome.runtime.onInstalled.addListener(function () {

  //defaults for local data
  const newStorage = {
    userInactive: false,
    activeTabs: [],
  }

  chrome.storage.sync.set(newStorage, function () {
    console.debug('Defaults set in chrome SYNC storage');
  });


});



//keep the global curretTab updated with the current tab in focus in chrome
chrome.tabs.onActivated.addListener(function (activeObj) {
  const tabId = activeObj.tabId;
  const windowId = activeObj.windowId;

  console.debug("") //newline so this is distinct in the logs
  console.debug(`Current Tab ID:${tabId} Window-ID:${windowId}`);

  currentTab = tabId;
  checkTab(); //check for badge color when tab changes
});



//update local variables of changes in Storage
// -activeTabs from popup.js
// -userInactive from content.js
chrome.storage.onChanged.addListener(function (obj) {

  if (obj.userInactive) {
    console.debug(`User Inactive updated: ${obj.userInactive.newValue}`);
    userInactive = obj.userInactive.newValue;
  }

  if (obj.activeTabs) {
    console.debug(`Active Tabs updated: ${obj.activeTabs.newValue}`);
    activeTabs = obj.activeTabs.newValue;
  }

  //update current tab whenever the storage is changed
  //keeps tab from being null when window is changed
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0].id;
    checkTab(); // checkTab needs to be called anytime there's a change that the badge could needto be updated for
  });
})

//actions on hot key
// toggle pause - makes badge color orange
chrome.commands.onCommand.addListener(function (command) {
  if (command !== 'toggle-pause') return; //only command we should be getting, ignore others
  console.debug(`Pause Command: ${command} has been activated`);
  paused = !paused;
  checkTab(); //update badge color when pause command is recieved
});


//check for needed refresh every 2 seconds
setInterval(checkRefresh, 2000);

function checkRefresh() {

  console.debug(`===================================================================`);
  if (currentTab == null) {
    console.debug("Current Tab NULL ************************************");
    return;
  } // setInterval causes the function to run in the popup.js as well

  // since popup.html has no tab info, this prevents anything from executing

  console.debug(`ActiveTabs:${activeTabs} Tab:${currentTab} paused:${paused} Inactive${userInactive}`);
  if (activeTabs.includes(currentTab) && !paused && userInactive) {
    console.debug("Refreshing:");
    chrome.tabs.executeScript(currentTab, {
      code: 'location.reload(true)'
    });

  } else {
    //If we not refreshing, whats the state of the control variables
    console.debug(`No refresh: ActiveTab:${activeTabs} Current:${currentTab} UserInactive:${userInactive}`);
  }
  checkTab();
}


//check status and update badge color and text
//need to call this whenever a change action happens:
function checkTab() {
  console.debug(`Checking Tab for color:`);
  if (currentTab == null) { return;  } // this is running in popup.html with no current tab - this should prevent that.
  console.debug(`Paused:${paused}  Inactive:${userInactive} Tab:${currentTab} ActiveTab:${activeTabs}`);
  let currentTabActive = activeTabs.includes(currentTab);

  if (currentTabActive) {
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
  } else if (!currentTabActive && currentTab != null) { //extention off for this tab, remove badge
    console.debug(`Current Tab Inactive: remove badge: ${currentTab}`);
    chrome.browserAction.setBadgeText({ text: '' });
  } else {
    console.debug(`We SHOULDN"T HIT THIS!!!`);
  }
}
