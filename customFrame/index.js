'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

const globalShortcut = require('global-shortcut');


// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	const win = new BrowserWindow({
		title: 'Web App',
		width: 800,
		height: 600,
		x: 0,
		y: 0,
		//center: true,
		//transparent: true, 
		//frame: false,
		//resizable: true,
		show: false,
		//'min-width': 600,
		'min-height': 500,
		'web-preferences': {
			'overlay-scrollbars': true
		}
		//'auto-hide-menu-bar': false,
		//'accept-first-mouse': false
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

	// Open the devtools.
  	// mainWindow.openDevTools();

	setTimeout(function(){
		mainWindow.show();
	}, 500);

	app.on('before-quit', function (event) {
		console.log("before quit", app.getAppPath());
		//event.preventDefault();
	});

	// Register a 'ctrl+x' shortcut listener.
	var ret = globalShortcut.register('ctrl+x', function() {
		console.log('ctrl+x is pressed');
	})

	if (!ret) {
		console.log('registration failed');
	}

	// Check whether a shortcut is registered.
	console.log(globalShortcut.isRegistered('ctrl+x'));

});

app.on('will-quit', function() {
  // Unregister a shortcut.
  globalShortcut.unregister('ctrl+x');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
