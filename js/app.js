const nightModeBtn = document.querySelector('#dark-mode-btn');
const audioBtn = document.querySelector('.fa-music, .pause');

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
    // audioBtn.k("toggle", audioPlayer)
}
init();