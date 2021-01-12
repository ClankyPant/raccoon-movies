const { ipcRenderer } = require('electron');

// Enviando Mensagem para Main Process
const btnExit = document.querySelector('.btn-exit')
btnExit.addEventListener('click', () => {
    ipcRenderer.send('close-main-window');
});

// Enviando Mensagem para Main Process
const btnMini = document.querySelector('.btn-minimizate');
btnMini.addEventListener('click', () => {
    ipcRenderer.send('minimizate-main-window');
});

const btnNovoFilme = document.querySelector('.container-btn');
btnNovoFilme.addEventListener('click', () => {
    if (!btnNovoFilme.getAttribute('class').includes('readOnly') ) {
        ipcRenderer.send('open-cad-window');
        btnNovoFilme.setAttribute('class', 'container-btn readOnly');
    }
});

ipcRenderer.on('cad-window-close', () => {
    btnNovoFilme.setAttribute('class', 'container-btn'); 
});