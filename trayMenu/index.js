'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');

//
var Menu = require('menu');
var Tray = require('tray');
var appIcon = null;


// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	var win = new BrowserWindow({
		title: 'Web App with notification icon menu',
		width: 800,
		height: 600,
		resizable: false
	});

	win.loadUrl('file://' + __dirname + '/index.html');
	win.on('closed', onClosed);

	return win;
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
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
	console.log('__dirname: ', __dirname);
	appIcon = new Tray('smile_128x128.png');
	var contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio' },
		{ label: 'Item3', type: 'radio', checked: true },
		{ label: 'Item4', type: 'radio' }
	]);
	appIcon.setToolTip('This is my application.');
	w4appIcon.setContextMenu(contextMenu);
});
