# Pause Refresh

The purpose of this extention is to save switching-programs-time when creating HTML projects and still allowing the developer to interact with the project without being interrupted by an unexpected refresh, but still able to watch their progress while working in their text editor.

## Usage

Click the extention icon and click 'Start' to activate on the curruent tab.  

Refresh can be paused by clicking the pause button in the extention menu or hitting Alt + S.  This is useful if you need to inspect the webpage in chrome dev tools but don't want to stop refreshing this page.

#Extention has 3 states:

1. Refreshing - Green Badge: Page will refresh every 2 seconds on the active tab
2. Stopped - Red Badge: Refreshing stopped until focus shifts from the active tab
3. Paused - Orange Badge: Refreshing paused.  Toggle pause with shortcut Alt + S or in extention menu.

### Usage Notes:
Will only refresh 1 tab at a time.

If you have multiple chrome windows open the icon badge will appear on all of them but will on refresh on the tab that the extention was activated on.


### Troubleshooting

If a tab isn't refreshing as expected click on it and check that the status goes to stopped then switch to another application.

Behavior can be funky if switching between different Chrome windows.
