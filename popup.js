'use strict';
let on_off_button = document.getElementById('on_off_button');

//globals for popup.js
let currentTab;
let currentTabActive;

// update currentTab for popup - not expected to change during its lifecycle
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].id;
});


//get status when first opening popup turns on
chrome.storage.sync.get(['activeTabs'], function (result) {

  const activeTabs = result['activeTabs'];
  currentTabActive = activeTabs.includes(currentTab);

  if (currentTabActive) {
    on_off_button.innerHTML = 'Stop'
  } else {
    on_off_button.innerHTML = 'Start'
  }
});


// turn refreshing on or off for the current tab
on_off_button.onclick = function (element) {

  chrome.storage.sync.get(['activeTabs'], function (result) { //fetch active tabs from storage
    let activeTabs = result['activeTabs'];

    currentTabActive = activeTabs.includes(currentTab);

   
    if (currentTabActive) {

      console.log(`Active Tabs ${activeTabs}`);

      //Remove current tab from activetabs array
      let indexOf = activeTabs.indexOf(currentTab)
      activeTabs.splice(indexOf, 1);


      console.log(`Active Tabs After: ${activeTabs}`);
      let newObj = {
        activeTabs: activeTabs,
      }


      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Start'
      });
    } else { //turn extention on for current tab
      activeTabs.push(currentTab);
      let newObj = {
        activeTabs: activeTabs,
      }

      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Stop'
      });
    } //else
  }) //get.sync.storage.chrome
} //onclick

