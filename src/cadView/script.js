const { ipcRenderer } = require('electron');
const _ = require('underscore');

// Enviando Mensagem para Main Process
const btnExit = document.querySelector('.btn-exit')
btnExit.addEventListener('click', () => {
    ipcRenderer.send('close-cad-window');
});

const btnMini = document.querySelector('.btn-minimizate');
btnMini.addEventListener('click', () => {
    ipcRenderer.send('minimizate-cad-window');
});

// Realizando Event Listener para Drop Box
let spanGenero = document.querySelector('.drop-box');
let body = document.body;

spanGenero.addEventListener('click', () => {
    let dropDown = document.querySelector('.container-options');
    if (dropDown.style.opacity === "0" || dropDown.style.opacity === "") {
        dropDown.style.opacity = "1"
    } else {
        dropDown.style.opacity = "0"
    }
});

let options = _.toArray(document.getElementsByClassName('option'));

options.forEach(element => {
    element.addEventListener('click', (e) => {
        
    });
});

// Configuração para fechar drop down caso seja clicado fora dele.
body.addEventListener('click', (e) => {
    console.log(spanGenero);
    console.log(e.target);
    if (!spanGenero.contains(e.target)) {
        document.querySelector('.container-options').style.opacity = "0";
    }
});