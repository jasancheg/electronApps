'use strict';

var ipc = require('ipc')
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var titlebar = require('titlebar')();
var $ = require('dombo');

// create a context menu
var menu = new Menu();
menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
menu.append(new MenuItem({ type: 'separator' }));
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
menu.append(new MenuItem({ label: 'Toggle Dev Tools', click: function() { ipc.send('toggle-dev-tools'); } }));

window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
}, false);

// append custom header frame to page on PC and Mac
if (process.platform !== 'linux') {
    titlebar.appendTo('#titlebar')
}

var isFullscreen = false;

var onfullscreentoggle = function (e) {

    if (!isFullscreen && e.shiftKey) {
        ipc.send('resize', {
        //width: media.width,
        //height: media.height,
        //ratio: media.ratio
        });
        return
    }

    if (isFullscreen) {
        isFullscreen = false
        //$('#titlebar')[0].style.display = 'block';
        ipc.send('exit-full-screen');
    } else {
        isFullscreen = true;
        //$('#titlebar')[0].style.display = 'none';
        ipc.send('enter-full-screen');
    }

}

titlebar.on('close', function () {
    ipc.send('close');
});

titlebar.on('minimize', function () {
    ipc.send('minimize');
});

titlebar.on('maximize', function () {
    ipc.send('maximize');
});

titlebar.on('fullscreen', onfullscreentoggle);

// send message to show window when page is done (dummy simulate for page load)
setTimeout(function () {
    ipc.send('ready')
}, 500);