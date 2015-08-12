'use strict';
const app = require('app');
const ipc = require('ipc');
const BrowserWindow = require('browser-window');

const globalShortcut = require('global-shortcut');


// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// set frame false for Mac OS and windows
const frame = process.platform !== 'win32' && process.platform !== 'darwin';

function createMainWindow () {
    const win = new BrowserWindow({
        title: 'Web App',
        width: 800,
        height: 600,
        center: true,
        transparent: true,
        frame: false,
        resizable: true,
        show: false,
        'min-width': 600,
        'min-height': 500,
        'web-preferences': {
            'overlay-scrollbars': true
        }
    });

    win.loadUrl('file://' + __dirname + '/index.html');
    win.on('closed', onClosed);

    ipc.on('ready', function () {
        win.show();
    });

    ipc.on('toggle-dev-tools', function () {
        win.toggleDevTools();
    });

    if(process.platform !== 'linux') {

        // close app on windows and to hide on Mac OS
        ipc.on('close', function () {
            console.log("window close");
            if(process.platform !== 'darwin') {
                app.quit();
            } else {
                win.hide();
                win.minimize();
            }

        });

        ipc.on('minimize', function () {
            console.log("window minimize");
            win.minimize();
        });

        ipc.on('maximize', function () {
            console.log("window maximize");
            win.maximize();
        });

        ipc.on('resize', function (e, message) {
            console.log("window resize");
            if (win.isMaximized()) return;
            var wid = win.getSize()[0];
            var hei = (wid / message.ratio) | 0;
            win.setSize(wid, hei);
        });

        ipc.on('enter-full-screen', function () {
            console.log("window enter-full-screen");
            win.setFullScreen(true);
        });

        ipc.on('exit-full-screen', function () {
            console.log("window exit-full-screen");
            win.setFullScreen(false);
            win.show();
        });

    }

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

app.on('before-quit', function (event) {
    console.log("before quit", app.getAppPath());
    //event.preventDefault();
});

app.on('will-quit', function() {
    // Unregister a shortcut.
    globalShortcut.unregister('ctrl+x');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});
