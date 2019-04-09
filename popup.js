'use strict';
let on_off_button = document.getElementById('on_off_button');

var on; //toggle to keep track of if the extention is activated
var currentTab;
var activeTabSet;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].id;
});


//get status when first turns on
chrome.storage.sync.get(['on', 'activeTabs', 'userInactive', 'allowRefresh'], function (result) {
  console.log("Result:");
  console.log(result);
  console.log(`Active Tab set from DB:`);
  activeTabSet = new Set(result['activeTabs']);
  activeTabSet.add(5);
  console.log(activeTabSet);
  const currentTabActive = activeTabSet.has(currentTab);
  console.log(`Current: ${currentTab}  ActiveTabs:${result['activeTabs']} Has?${currentTabActive}`);

  if (result['on'] && currentTabActive) {
    on_off_button.innerHTML = 'Stop'
    on = true;
  } else {
    on_off_button.innerHTML = 'Start'
    on = false;
  }
});

on_off_button.onclick = function (element) {
  let newObj = {};
  if (on) {

    activeTabSet.delete(currentTab);

    newObj = {
      on: false,
      activeTabs: Array.from(activeTabSet),
    }


    chrome.storage.sync.set(newObj, function () {
      on_off_button.innerHTML = 'Start'
      on = false;
    });
  } else { //turn extention on for current tab
    activeTabSet.add(currentTab);

    newObj = {
      on: true,
      activeTabs: Array.from(activeTabSet),
    }


    chrome.storage.sync.set(newObj, function () {
      on_off_button.innerHTML = 'Stop'
      on = true;
    });

  }





}

window.onblur = function(){




}



//code for selecting the current tab for activating extention
