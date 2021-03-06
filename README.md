# To Access Local Files:

Extensions by default aren't allowed to access the locals files at all.  To enable this on local files you must allow it in the chrome extension settings.

1. Right Click the Dev Refresh extension icon then click 'Manage Extensions'

![manage](https://user-images.githubusercontent.com/44272343/62403406-c25eb880-b541-11e9-8ea0-bd7c91dbe632.png)

2. Ensure 'Allow Access to file URL's is enabled

![allowaccess](https://user-images.githubusercontent.com/44272343/62403408-c25eb880-b541-11e9-98ee-c419cc110339.png)


# Dev Refresh

The purpose of this extension is to save switching-programs-time when creating HTML projects and still allowing the developer to interact with the project without being interrupted by an unexpected refresh, but still able to watch their progress while working in their text editor.

## Usage

Click the extension icon and click 'Start' to activate on the current tab.  

Refresh can be paused by clicking the pause button in the extension menu or hitting Alt + S.  This is useful if you need to inspect the webpage in chrome dev tools but don't want to stop refreshing this page.

### extension has 3 states:

1. Refreshing - Green Badge: Page will refresh every 2 seconds on the active tab

      ![refreshing](https://user-images.githubusercontent.com/44272343/56481116-3f25c500-6472-11e9-84c4-c49a25fd497c.png)

2. Stopped - Red Badge: Refreshing stopped until focus shifts from the active tab

      ![stopped](https://user-images.githubusercontent.com/44272343/56481118-3f25c500-6472-11e9-8025-46b189bf0d3a.png)

3. Paused - Orange Badge: Refreshing paused.  Toggle pause with shortcut Alt + S or in extension menu

      ![paused](https://user-images.githubusercontent.com/44272343/56481115-3e8d2e80-6472-11e9-86db-6620ed419ea5.png)

### Usage Notes:
Will only refresh 1 tab at a time.  It must be the top tab in the most recently used chrome windows.

If you have multiple chrome windows open the icon badge will appear on all of them but will on refresh on the tab that the extension was activated on.

## Troubleshooting

If a tab isn't refreshing as expected click on it and check that the status goes to stopped then switch to another application.

Behavior can be funky if switching between different Chrome windows


Any issues can be sumitted here: https://github.com/sselfridge/Dev-Refresh/issues
