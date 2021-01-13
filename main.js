const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let cadWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1150,
        height: 850,
        minWidth: 650,
        minHeight: 750,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        minimizable: true
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index', 'index.html'));

    ipcMain.on('close-main-window', (event, args) => {
        mainWindow.close();
    });

    ipcMain.on('minimizate-main-window', (event, args) => {
        mainWindow.minimize();
    });

    ipcMain.on('open-cad-window', (event, args) => {
        cadWindow = new BrowserWindow({
            width: 650,
            height: 750,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            minimizable: true
        });

        cadWindow.loadFile(path.join(__dirname, 'src', 'cadView', 'cadView.html'));

        cadWindow.on('close', () => {
            mainWindow.webContents.send('cad-window-close');
        });
    });

    ipcMain.on('close-cad-window', (event, args) => {
        cadWindow.close();
    });

    ipcMain.on('minimizate-cad-window', (event, args) => {
        cadWindow.minimize();
    });
});