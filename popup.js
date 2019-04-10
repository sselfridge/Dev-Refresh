'use strict';
let on_off_button = document.getElementById('on_off_button');

let currentTab;
let currentTabActive;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].id;
});


//get status when first opening popup turns on
chrome.storage.sync.get(['activeTabs'], function (result) {

  const activeTabs = result['activeTabs'];
  currentTabActive = activeTabs.includes(currentTab);
  console.log(`Current: ${currentTab}  ActiveTabs:${result['activeTabs']} Has?${currentTabActive}`);

  if (currentTabActive) {
    on_off_button.innerHTML = 'Stop'
  } else {
    on_off_button.innerHTML = 'Start'
  }
});

on_off_button.onclick = function (element) {
  console.log(`Button Clicked`);
  chrome.storage.sync.get(['activeTabs'], function (result) {
    let activeTabs = result['activeTabs'];
    console.log(`Button Clicked: Current:${currentTab} Active Tabs:${activeTabs}`);
    currentTabActive = activeTabs.includes(currentTab);

    let newObj = {};
    if (currentTabActive) {

      console.log(`Active Tabs ${activeTabs}`);

      //Remove current tab from activetabs array
      let indexOf = activeTabs.indexOf(currentTab)
      activeTabs.splice(indexOf, 1);


      console.log(`Active Tabs After: ${activeTabs}`);
      newObj = {
        activeTabs: activeTabs,
      }


      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Start'
      });
    } else { //turn extention on for current tab
      activeTabs.push(currentTab);
      newObj = {
        activeTabs: activeTabs,
      }


      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Stop'
      });
    }
  })
}

//code for selecting the current tab for activating extention
