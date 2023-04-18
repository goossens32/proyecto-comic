const nightModeBtn = document.querySelector('#dark-mode-btn');
const audioBtn = document.querySelector('.fa-music, .pause');
const languageSelector = document.querySelector('#lan-selector');
const comicContanier = document.querySelector('#comic-container');
const pageSelector = document.querySelector('#page-number');

let comicText = [];

const getData = () => {
    console.log(languageSelector.value);
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
    comicContanier.innerHTML = "";
    pagesList.forEach(page => {
        // console.log(page.paginaID);
        pageSelector.innerHTML += `
            <div>${page.paginaID}</div>
        `;
        page.imagenes.forEach(box => {
            comicContanier.innerHTML += `
                <div class="page">
                    <img src="${box.img}">
                    <p class="${box.posicion}">${box.texto}</p>
                </div> 
            `;
        });
        // console.log(e.imagenes[3].texto);
    });
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
    languageSelector.addEventListener('change', getData)
    getData();
}
init();