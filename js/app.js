const nightModeBtn = document.querySelector('#dark-mode-btn');
const audioBtn = document.querySelector('.fa-music, .pause');
const languageSelector = document.querySelector('#lan-selector');
const comicContanier = document.querySelector('#comic-container');
const pageSelector = document.querySelector('#page-selector');
const pageContainer = document.querySelector('#page-container');

let comicText = [];
let currentPage = 1;

const getData = () => {
    if (languageSelector.value === "es") {
        fetch('../data/ES.json')
            .then (response => response.json())
            .then (data => {
                comicText = data;
                renderComic(comicText);
            })
    } else if (languageSelector.value === "en") {
        fetch('../data/EN.json')
            .then (response => response.json())
            .then (data => {
                comicText = data;
                renderComic(comicText);
            })
    } else if (languageSelector.value === "cat") {
        fetch('../data/CAT.json')
            .then (response => response.json())
            .then (data => {
                comicText = data;
                renderComic(comicText);
            })
    } 
}

const renderComic = (pagesList) => {
    // Inicialización de container en vacío
    comicContanier.innerHTML = "";
    pageSelector.innerHTML = "";
    // Foreach de cada página
    pagesList.forEach(page => {
        // Div dinámico con numeración de páginas
        pageSelector.innerHTML += `<div onclick="nextPrevPage(event)" value="${page.paginaID}">${page.paginaID}</div>`
        // Div de página que contiene todas las viñetas por página
        comicContanier.innerHTML += `
            <div class="comic-page block" data-id="${page.paginaID}">
    
        ${page.imagenes.map(box => {
            return  `
                <div class="box${box.boxID}">
                    <img src="${box.img}">
                    <p class="${box.posicion}">${box.texto}</p>
                </div> 
            `
        }).join('')}
        </div> 
        `
    });
    comicPagination(currentPage);
}

const comicPagination = (currentPage) => {
    // Se consigue el dataset de los divs de página generados en renderComic()
    // El valor del dataset es el mismo que el número de página
    // data-id = 1 --> Página 1 | data-id = 2 --> Página 2 ...
    const comicPage = document.querySelectorAll('[data-id]');
    comicPage.forEach(e => {
        // Por defecto currentPage = 1, si el dataset no coincide con este, pasa de display block a none
      if (e.dataset.id != currentPage) {
        e.classList.replace("block", "hidden");
      } else {
        e.classList.replace("hidden", "block");
      }
    });
}

const nextPrevPage = (event) => {
    // Se genera evento
    const divPage = event.target;
    // Al generar numeración de página en renderComic() establezco por cada div un value="" con valor
    // de la página. EJ: <div value="1"> Es página 1 (Mirar código desde buscador web para verlo mejor)
    const currentPage = divPage.getAttribute('value');
    // Valor de value="" equivale a currentPage y se pasa a comicPagination()
    comicPagination(currentPage);
    // Cada vez que se cambia de página vuelve al principio del documento
    // https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
    window.scrollTo({top:0, behavior: "smooth"})
}

const audioPlayer = () => {
    // Selector de audio en index.html
    const audio = document.querySelector('#audio');
        // Si el audio está pausado (por defecto lo está) se reproduce y cambia de estilo de pause a play
        if (audio.paused) {
            audioBtn.classList.replace("pause", "play");
            audio.play();
        }
        // Si está en play lo pausa y cambia el estilo de play a pause
        else{
            audioBtn.classList.replace("play", "pause");
            audio.pause();
            audio.currentTime = 0
        }
}

const nightMode = () => {
    if (nightModeBtn.classList.contains("fa-sun")) nightModeBtn.classList.replace("fa-sun", "fa-moon");
    else nightModeBtn.classList.replace("fa-moon", "fa-sun");

    const domElements = document.querySelectorAll('body');
    domElements.forEach(e => {
        e.classList.toggle("dark");
    });
}

const init = () => {
    // Cada vez que se cambia idioma aplica el evento change a la función getData
    // con change recarga la página cada vez que se selecciona una opción en select
    languageSelector.addEventListener('change', getData);
    getData();
}
init();