'use strict';
const on_off_button = document.getElementById('on_off_button');
const pause_button = document.getElementById('pause_button');

//globals for popup.js
let currentTab;
let currentTabActive;
let paused;

const pausedHtml = 'Resume <span id="pauseSubText">(Alt + s)</span>'
const resumeHtml = 'Pause <span id="pauseSubText">(Alt + s)</span>'

// update currentTab for popup - not expected to change during its lifecycle
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].id;
});


//get button status when opening popup
chrome.storage.sync.get(['activeTabs', 'paused'], function (result) {

  const activeTabs = result['activeTabs'];
  paused = result['paused'];

  currentTabActive = activeTabs.includes(currentTab);

  if (currentTabActive) {
    on_off_button.innerHTML = 'Stop'
    on_off_button.className = 'red'

  } else {
    on_off_button.innerHTML = 'Start '
    on_off_button.className = 'green'
  }

  if (paused) {
    pause_button.innerHTML = pausedHtml;
  } else {
    pause_button.innerHTML = resumeHtml;
  }
});

// turn refreshing on or off for the current tab
on_off_button.onclick = function (element) {
  chrome.storage.sync.get(['activeTabs'], function (result) { //fetch active tabs from storage
    let activeTabs = result['activeTabs'];

    currentTabActive = activeTabs.includes(currentTab);

    console.debug(`Popup.js----Active Tabs ${activeTabs} CurrentTabActive?:${currentTabActive}`);

    if (currentTabActive) {

      //Remove current tab from activetabs array
      let indexOf = activeTabs.indexOf(currentTab)
      activeTabs.splice(indexOf, 1);

      console.debug(`Active Tabs After: ${activeTabs}`);
      let newObj = {
        activeTabs: activeTabs,
      }

      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Start'
        on_off_button.className = 'green'
      });

    } else { //turn extention on for current tab
      activeTabs.push(currentTab);
      let newObj = {
        activeTabs: activeTabs,
      }

      chrome.storage.sync.set(newObj, function () {
        on_off_button.innerHTML = 'Stop'
        on_off_button.className = 'red'
      });
    } //else
  }) //get.sync.storage.chrome
} //onclick

pause_button.onclick = function () {
  chrome.storage.sync.get(['paused'], function (result) { //fetch active tabs from storage
    paused = !result['paused'];

    let newText;
    if (paused) {
      newText = pausedHtml;
    } else {
      newText = resumeHtml;
    }

    let newState = {
      paused: paused,
    }

    chrome.storage.sync.set(newState, function () {
      pause_button.innerHTML = newText;
    });
    return;
  });
}
