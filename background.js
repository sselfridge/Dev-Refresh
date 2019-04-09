'use strict';
const g = {
  //Background.js Globals
  paused: false, //is the extention paused? either by keyboard command or offscreen
  curentTab: null, //current tab - refreshed on tabchange with onActiveChanged
  userInactive: false,
  on: false,
  activeTabs: new Set(),
  badgeColor: 'red',
  allowRefresh: false,
  testProp: true,
}


chrome.runtime.onInstalled.addListener(function () {

  // //defaults for local data
  // chrome.storage.sync.set({ userInactive: false }, function () { });  //bool
  // chrome.storage.sync.set({ on: false }, function () { });            //bool
  // // chrome.storage.sync.set({ paused: false }, function () { });        //bool
  // chrome.storage.sync.set({ activeTabs: {} }, function () { });       //array of active tabs - tab only active when turned on via popup on that tab

  // chrome.storage.sync.set({ allowRefresh: false }, function () { });  //used to make sure we only refresh tabs extention was turned on for
  // //this should be the only db req we make from the content.js

  // // chrome.storage.sync.set({ color: 'green' }, function () { });       //string color of the icon badge - TODO: remove as logic for this should be covered by other controls

  const newStorage = {
    userInactive: false,
    on: false,
    activeTabs: new Set(),
    allowRefresh: false,
  }

  chrome.storage.sync.set(newStorage, function () { });  //used to make sure we only refresh tabs extention was turned on for


});

//TODO - check for active window as well
chrome.tabs.onActiveChanged.addListener(function (tabId) {
  console.log(`Current Tab ID:${tabId}`);
  g.curentTab = tabId;
});


chrome.storage.onChanged.addListener(function (obj) {
  console.log(obj);

  if (obj.on) {
    console.log(`On Switch Changed: ${obj.on.newValue}`);
    g.on = obj.on.newValue;
  }

  if (obj.userInactive) {
    console.log(`User Inactive: ${obj.userInactive.newValue}`);
    g.userInactive = obj.userInactive.newValue;
  }

  if (obj.allowRefresh) {
    console.log(`Allow Refresh: ${obj.allowRefresh.newValue}`);
    g.allowRefresh = obj.allowRefresh.newValue;
  }

  if (obj.activeTabs) {
    console.log(`Active Tabs: ${obj.activeTabs.newValue}`);
    g.activeTabs = obj.activeTabs.newValue;
  }

})

//actions on hot key
// pause and unpuse
chrome.commands.onCommand.addListener(function (command) {
  console.log(`Command: ${command} has been activated!`);
  if (command !== 'toggle-pause') return; //only command we should be getting, ignore others
  g.paused = !g.paused;

});


//check for needed refresh
setInterval(function () {
  if (g.allowRefresh && g.activeTabs.has(g.curentTab))
    // chrome.tabs.executeScript({
    //   code: 'location.reload(true)'
    // });
    console.log('PAGE WOULD REFRESH NOW!!!!!');


}, 2000)


//check status and update icon accordingly
setInterval(function () {
  // console.log(`Active Tabs`);
  // console.log(g.activeTabs);
  console.log(`On: ${g.on}  Paused:${g.paused}  Inactive:${g.userInactive}  Allow:${g.allowRefresh}`);
  // console.log(`Current Tab:${g.curentTab} ActiveTabs:`);

  if (g.on) {
    if (g.paused) { //pause overwrites other behavior as long as ex is on for this tab
      chrome.browserAction.setBadgeText({ text: 'Hold' });
      chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' })
      if (g.allowRefresh === true) {
        g.allowRefresh = false;
        chrome.storage.sync.set({ allowRefresh: false }, function () { });
      }
    } else {

      if (g.userInactive) {
        chrome.browserAction.setBadgeText({ text: 'Running' });
        chrome.browserAction.setBadgeBackgroundColor({ color: 'green' })

        if (g.allowRefresh === false) {
          g.allowRefresh = true;
          chrome.storage.sync.set({ allowRefresh: true }, function () { });
        }
      } else if (!g.userInactive) {
        chrome.browserAction.setBadgeText({ text: 'Stop' });
        chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })

        if (g.allowRefresh === true) {
          g.allowRefresh = false;
          chrome.storage.sync.set({ allowRefresh: false }, function () { });
        }
      }
    }
  } else { //extention off for this tab, remove badge
    chrome.browserAction.setBadgeText({ text: '' });
  }
}, 400)

// This looks promising for watching files maybe?
// edit - I think this is for chrome apps like videostream, not my purposes
// https://developer.chrome.com/apps/fileSystem#method-getVolumeList



// Context menus	contextMenus	Allows app or extension developers 
// to add items to the context menu in Chrome. To open the context menu, users right-click a webpage.
// https://developer.chrome.com/extensions/desktopCapture


