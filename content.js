isTabActive = false; //used for debugging in setInterval

window.onfocus = function () {
    isTabActive = true;
    chrome.storage.sync.set({ userInactive: false }, function () { });
};

window.onblur = function () {
    //TODO - track edge that user leaves the screen, if right, don't restart refreshing
    isTabActive = false;
    chrome.storage.sync.set({ userInactive: true }, function () { });
};


// setInterval(function () {
//     console.log(isTabActive ? 'Active!!' : 'Inactive');
// }, 1000)


//maybe agrigate all the seperate calls in the background and make one call here
function refreshPage() {
    console.log(`Refresh Page`);

    chrome.storage.sync.get(['userInactive'], function (result) {
        isUserInactive = result['userInactive'];
        
        // console.log(`User Inactive: ${isUserInactive}`);
        if (isUserInactive === true) {
            //if setting is on - refresh page
            chrome.storage.sync.get(['refreshOn'], function (result) {
                needRefresh = result['refreshOn'];
                // console.log(`Need Refresh: ${needRefresh}`);
                if (needRefresh) {
                    location.reload(true)
                }

            });
        }
        setTimeout(refreshPage, 2000);
    });
}

setTimeout(refreshPage, 2000);

