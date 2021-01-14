const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const _ = require('underscore');
const sqlite3 = require('sqlite3').verbose();

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

    mainWindow.on('close', () => {
        app.quit();    
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

        // cadWindow.openDevTools();
    });

    ipcMain.on('close-cad-window', (event, args) => {
        cadWindow.close();
    });

    ipcMain.on('minimizate-cad-window', (event, args) => {
        cadWindow.minimize();
    });

    ipcMain.on('send-messenge', (event, args) => {
        dialog.showMessageBox(cadWindow, {
            type: args[0],
            title: args[1],
            message: args[2]
        })
    });

    ipcMain.on('cad-filme-novo', (event, args) => {
        let db = new sqlite3.Database(path.join(__dirname, 'src', 'database', 'db.db'));

        db.serialize(() => {
            db.run(` CREATE TABLE IF NOT EXISTS filmes (
                nome_filme VARCHAR(100) NOT NULL,
                generos VARCHAR(100)
            ); `);
            
            let generosToArray = _.toArray(args[1]).join(', ');
            
            db.run(' INSERT INTO filmes (nome_filme, generos) VALUES (?, ?); ', [args[0], generosToArray], (error) => {

                if (error) {
                    console.log(error.message);
                }
            });

            db.close();
        });

        cadWindow.close();
    })
});