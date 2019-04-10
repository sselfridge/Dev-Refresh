
window.onfocus = function () {
    // isTabActive = true;
    chrome.storage.sync.set({ userInactive: false }, function () { });
    console.log(`User Active`);
};

window.onblur = function () {
    // //TODO - track edge that user leaves the screen, if right, don't restart refreshing
    // isTabActive = false;
    chrome.storage.sync.set({ userInactive: true }, function () { });
    console.log(`User Inactive`);
};


// setInterval(function () {
//     console.log(isTabActive ? 'Active!!' : 'Inactive');
// }, 1000)

//maybe agrigate all the seperate calls in the background and make one call here
// function refreshPage() {
//     console.log(`Refresh Page`);
//     chrome.storage.onChanged.addListener(function (obj) {
//         console.log(`new value for somethign!`);
//         console.log(obj);
//         if (obj.allowRefresh) {
//             allowRefresh = obj.allowRefresh.newValue;
//         }
//     })

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

//         // since only one tab should be active and in the current window at once
//         // the return variable should only have one entry
//         var activeTab = tabs[0];
//         var activeTabId = activeTab.id; // or do whatever you need
//         console.log(`ActiveTab: ${activeTabId}`);
//      });

//     chrome.storage.sync.get(['allowRefresh'], function (result) {
//         allowRefresh = result['allowRefresh'];
//         console.log(`AllowRefresh: ${allowRefresh}`);
//         if (allowRefresh) {
//             location.reload(true)
//         }

//     });
//     setTimeout(refreshPage, 2000);
// }

// setTimeout(refreshPage, 2000);

