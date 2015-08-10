'use strict';
const app = require('app');
const ipc = require('ipc');
const BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	const win = new BrowserWindow({
		title: 'Web App',
		width: 800,
		height: 600,
		resizable: true
	});

	win.loadUrl('file://' + __dirname + '/index.html');
	win.on('closed', onClosed);

	return win;
}

function onClosed () {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function onlineOfflineStatus () {
	ipc.on('online-status-changed', function(event, status) {
  		console.log('main process: ', status);
	});
}

// prevent window being GC'd
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  	// On OS X it is common for applications and their menu bar
  	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();

	// ipc comunication - activate notifications for online / offline status
	onlineOfflineStatus();
	// Open the devtools.
  	mainWindow.openDevTools();
});
