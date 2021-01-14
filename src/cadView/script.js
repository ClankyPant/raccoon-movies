const { ipcRenderer } = require('electron');
const _ = require('underscore');

let generosArray = [];
let divGeneros = [];
let spanGeneros = [];
let imgGeneros = [];

let options = _.toArray(document.getElementsByClassName('option'));

let spanGenero = document.querySelector('.drop-box');
let body = document.body;

let btnCadastrar = document.querySelector('.container-btn');

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
spanGenero.addEventListener('click', () => {
    let dropDown = document.querySelector('.container-options');
    if (dropDown.style.display === "none" || dropDown.style.display === "") {
        dropDown.style.display = "flex"
    } else {
        dropDown.style.display = "none"
    }
});

options.forEach(element => {
    element.addEventListener('click', (e) => {
        let index = e.target.id;
        let containerGenero = document.querySelector('.container-genero');

        if (!generosArray.includes(e.target.innerHTML)) {
            divGeneros[index] = document.createElement('div');
            divGeneros[index].setAttribute('class', 'genero');
            containerGenero.appendChild(divGeneros[index]);

            spanGeneros[index] = document.createElement('span');
            spanGeneros[index].innerHTML = e.target.innerHTML;
            divGeneros[index].appendChild(spanGeneros[index])

            imgGeneros[index] = document.createElement('img');
            imgGeneros[index].setAttribute('src', '../img/remove-img.svg');
            imgGeneros[index].addEventListener('click', () => {
                divGeneros[index].remove();
                generosArray.splice(generosArray.indexOf(e.target.innerHTML), 1);
            });
            divGeneros[index].appendChild(imgGeneros[index]);
            generosArray.push(e.target.innerHTML);
        }
    });
});

// Configuração para fechar drop down caso seja clicado fora dele.
body.addEventListener('click', (e) => {
    if (!spanGenero.contains(e.target)) {
        document.querySelector('.container-options').style.display = "none"
    }
});

btnCadastrar.addEventListener('click', (e) => {
    let nomeFilme = document.querySelector('.input-text');
    
    if (nomeFilme.value.length === 0) {
        ipcRenderer.send('send-messenge', ['warning', 'Aviso!', 'Preencha o nome do filme!']);
        return
    }

    if (_.isEmpty(generosArray)) {
        ipcRenderer.send('send-messenge', ['warning', 'Aviso!', 'Escolha ao menos um gênero!']);
        return
    }

    ipcRenderer.send('cad-filme-novo', [nomeFilme.value, generosArray]);
});