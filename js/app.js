const nightModeBtn = document.querySelector('#dark-mode-btn');
const audioBtn = document.querySelector('.fa-music, .pause');
const languageSelector = document.querySelector('#lan-selector');
const comicContanier = document.querySelector('#comic-container');

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

const renderComic = (text) => {
    comicContanier.innerHTML = "";
    text.forEach(e => {
        comicContanier.innerHTML += `
            <div>${e.imagenes[2].texto}</div>
            <div><img src="${e.imagenes[2].img}" alt=""></div>
        `;
        console.log(e.imagenes[3].texto);
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
    console.log(comicText);
}
init();