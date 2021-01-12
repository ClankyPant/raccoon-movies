const { ipcRenderer } = require('electron');

// Enviando Mensagem para Main Process
const btnExit = document.querySelector('.btn-exit')
btnExit.addEventListener('click', () => {
    ipcRenderer.send('close-cad-window');
});

// Enviando Mensagem para Main Process
const btnMini = document.querySelector('.btn-minimizate');
btnMini.addEventListener('click', () => {
    ipcRenderer.send('minimizate-cad-window');
});