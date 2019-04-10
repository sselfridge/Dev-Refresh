'use strict';

//Background.js Globals
let paused = false; //is the extention paused? either by keyboard command or offscreen
let curentTab = null; //current tab - refreshed on tabchange with onActiveChanged
let userInactive = false;
let activeTabs = [];  //can't pass a set through the chrome DB for some reason - keeping in as array
let badgeColor = 'red';
let allowRefresh = false;
let testProp = true;



chrome.runtime.onInstalled.addListener(function () {

  // //defaults for local data
  const newStorage = {
    userInactive: false,
    activeTabs: [],
    // allowRefresh: false,
  }

  chrome.storage.sync.set(newStorage, function () {
    console.log('"defaults set in SYNC storage": ');
  });


});

//TODO - check for active window as well
chrome.tabs.onActiveChanged.addListener(function (tabId) {
  console.log(`Current Tab ID:${tabId}`);
  curentTab = tabId;
});



chrome.storage.onChanged.addListener(function (obj) {
  console.log(obj);

  if (obj.userInactive) {
    console.log(`User Inactive updated: ${obj.userInactive.newValue}`);
    userInactive = obj.userInactive.newValue;
  }

  if (obj.activeTabs) {
    console.log(`Active Tabs updated: ${obj.activeTabs.newValue}`);
    activeTabs = obj.activeTabs.newValue;
  }

})

//actions on hot key
// pause and unpuse
chrome.commands.onCommand.addListener(function (command) {
  console.log(`Command: ${command} has been activated!`);
  if (command !== 'toggle-pause') return; //only command we should be getting, ignore others
  paused = !paused;

});


//check for needed refresh
setInterval(function () {
  if (curentTab == null) return; // this is running in popup.html with no current tab - this should prevent that.
  console.log(`QWERTYUIOP`);
  if (activeTabs.includes(curentTab) && !paused && userInactive) {  ///
    console.log('PAGE WOULD REFRESH NOW!!!!!');
    chrome.tabs.executeScript({
      code: 'location.reload(true)'
    });
  } else {
    console.log(`No refresh: ActiveTab:${activeTabs} Current:${curentTab} UserInactive:${userInactive}`);
  }
}, 2000)


//check status and update icon accordingly
setInterval(function () {
  if (curentTab == null) return; // this is running in popup.html with no current tab - this should prevent that.
  console.log(`Paused:${paused}  Inactive:${userInactive} Tab:${curentTab}`);
  console.log(`Active Tabs:`);
  console.log(activeTabs);
  // let currentTabActive =  activeTabsSet.has(Number( currentTab));
  let currentTabActive = activeTabs.includes(curentTab);
  console.log(' curentTab: ', curentTab);
  console.log('currentTabActive: ', currentTabActive);

  if (currentTabActive) {
    console.log(`Curret Tab Active`);
    if (paused) { //pause overwrites other behavior as long as ex is on for this tab
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
  } else if (!currentTabActive && curentTab != null) { //extention off for this tab, remove badge
    console.log(`Current Tab Inactive: remove badge: ${curentTab}`);
    chrome.browserAction.setBadgeText({ text: '' });
  } else {
    console.log(`We SHOULDN"T HIT THIS!!!`);
  }
}, 1000)

// This looks promising for watching files maybe?
// edit - I think this is for chrome apps like videostream, not my purposes
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture


