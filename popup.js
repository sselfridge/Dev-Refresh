'use strict';
let on_off_button = document.getElementById('on_off_button');


let toggle = false; //toggle to keep track of if the extention is activated
chrome.storage.sync.get(['refreshOn'], function (result) {
  if (result['refreshOn']) {
    on_off_button.innerHTML = 'STOP'
    toggle = true;
  } else {
    on_off_button.innerHTML = 'START'
    toggle = false;
  }
});


on_off_button.onclick = function (element) {

  if (toggle) {
    chrome.storage.sync.set({ refreshOn: false }, function () {
      on_off_button.innerHTML = 'START'
      toggle = false;      
    });
  } else {
    chrome.storage.sync.set({ refreshOn: true }, function () {
      on_off_button.innerHTML = 'STOP'
      toggle = true;
      chrome.browserAction.setBadgeText({text: ''});
    });
  }
}


//code for selecting the current tab for activating extention
