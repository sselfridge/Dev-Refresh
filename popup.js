'use strict';
let on_off_button = document.getElementById('on_off_button');

let on; //toggle to keep track of if the extention is activated
chrome.storage.sync.get(['on'], function (result) {
  if (result['on']) {
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
      chrome.browserAction.setBadgeText({ text: '' });
    });



    chrome.storage.sync
  }
}


//code for selecting the current tab for activating extention
