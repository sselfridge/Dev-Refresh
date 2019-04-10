
window.onfocus = function () {
    chrome.storage.sync.set({ userInactive: false }, function () { });
    // console.log(`User Active`);
};

window.onblur = function () {
    // //TODO - track edge that user leaves the screen, if right, don't restart refreshing
    chrome.storage.sync.set({ userInactive: true }, function () { });
    // console.log(`User Inactive`);
};


