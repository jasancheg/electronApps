# Rendered/Main process comunications (Chromium Inter Process Communication (Chromium IPC))

> Message sent from a renderer process (web page).

Asynchronous and synchronous message sent from a renderer process. The messages sent from the renderer are emitted to main module, the event name is the `channel` (online-status-changed on this case) when sending message. 


## Dev

```
$ npm install
```

### Dev Tools

Toggle Dev Tools. Debug features using [electron-debug](https://github.com/sindresorhus/electron-debug).

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd>

### Reload

Force reload the window.

- OS X: <kbd>Cmd</kbd> <kbd>R</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>R</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>R</kbd>

### Run

```
$ npm start
```

### Build

- Build all bundles: `$ npm run build`
- Build Mac os bundle: `$ npm run build-mac`
- Build Windows 32: `$ npm run build-win32`
- Build Windows 64: `$ npm run build-win64`
- Build linux 32: `$ npm run build-linux32`
- Build linux 64: `$ npm run build-linux64`

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/maxogden/electron-packager).


## License

MIT © [Jose Antonio Sanchez](https://github.com/jasancheg)
