isTabActive = false; //used for debugging in setInterval

window.onfocus = function () {
    isTabActive = true;
    chrome.storage.sync.set({ userInactive: false }, function () { });
    console.log(`User Active`);
};

window.onblur = function () {
    //TODO - track edge that user leaves the screen, if right, don't restart refreshing
    isTabActive = false;
    chrome.storage.sync.set({ userInactive: true }, function () { });
    console.log(`User Inactive`);
};


// setInterval(function () {
//     console.log(isTabActive ? 'Active!!' : 'Inactive');
// }, 1000)


//maybe agrigate all the seperate calls in the background and make one call here
function refreshPage() {
    console.log(`Refresh Page`);

    chrome.storage.sync.get(['allowRefresh'], function (result) {
        allowRefresh = result['allowRefresh'];
        console.log(`AllowRefresh: ${allowRefresh}`);
        if (allowRefresh) {
            location.reload(true)
        }

    });
    setTimeout(refreshPage, 2000);
}

setTimeout(refreshPage, 2000);

