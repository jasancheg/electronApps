'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// init the sails app
var serverDir = '/sailsApp/app.js'
var sapp = require(__dirname + serverDir);

function createMainWindow () {

    var win = new BrowserWindow({
        title: 'Web App',
        width: 800,
        height: 600,
        center: true,
        resizable: true,
        'min-width': 600,
        'min-height': 500,
        'web-preferences': {
            'overlay-scrollbars': true,
            'web-security': false
        }
    });

    win.loadUrl('file://' + __dirname + '/index.html');
    //win.openDevTools({detach: true});

    win.on('closed', onClosed);

    ipc.on('sails-lifted', function (e, msg) {
        // Is not working yet, the application crashes after loading on the window
        win.loadUrl('file://' + __dirname + '/loaded.html');
    });

    return win;
}

function onClosed() {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
}

// prevent window being GC'd
let mainWindow;

app.on('ready', function () {
    mainWindow = createMainWindow();
});

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

// check sails lifted
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';

// Send a GET request to `http://localhost:1337/`:
io.socket.get('/', function serverResponded (body, JWR) {
    console.log(io.socket._raw.connected);
    mainWindow.loadUrl('http://localhost:1337');
    io.socket.disconnect();
});
