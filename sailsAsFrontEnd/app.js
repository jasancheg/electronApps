'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

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

// init the sails app
var serverDir = '/sailsApp/app.js'
var sapp = require(__dirname + serverDir);

// check sails lifted
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
var io = sailsIOClient(socketIOClient);

// specify the host and port of the Sails
io.sails.url = 'http://localhost:1337';

// Send a GET request to `http://localhost:1337/`:
io.socket.get('/', function serverResponded (body, JWR) {
    console.log(io.socket._raw.connected);
    mainWindow.loadUrl('http://localhost:1337');
    io.socket.disconnect();
});
