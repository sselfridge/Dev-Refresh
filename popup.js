'use strict';
let on_off_button = document.getElementById('on_off_button');

var on; //toggle to keep track of if the extention is activated
var currentTab;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].id;
});



chrome.storage.sync.get(['on','activeTabs'], function (result) {
  console.log("Result:");
  console.log(result);
  const currentTabActive = result['activeTabs'][currentTab];
  console.log(`Current: ${currentTab}  ActiveTabs:}`);
  console.log(result['activeTabs']);

  if (result['on'] && currentTabActive) {
    on_off_button.innerHTML = 'Stop'
    on = true;
  } else {
    on_off_button.innerHTML = 'Start'
    on = false;
  }
});

on_off_button.onclick = function (element) {

  if (on) {
    chrome.storage.sync.set({ on: false }, function () {
      on_off_button.innerHTML = 'Start'
      on = false;
    });
  } else { //turn extention on for current tab
    chrome.storage.sync.set({ on: true }, function () {
      on_off_button.innerHTML = 'Stop'
      on = true;
    });



    chrome.storage.sync
  }
}


//code for selecting the current tab for activating extention
