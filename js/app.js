const nightModeBtn = document.querySelector('#dark-mode-btn');

const init = async() => {
}
init();

const nightMode = () => {
    if (nightModeBtn.classList.contains("fa-sun")) nightModeBtn.classList.replace("fa-sun", "fa-moon");
    else nightModeBtn.classList.replace("fa-moon", "fa-sun");

    const domElements = document.querySelectorAll('body');
    domElements.forEach(e => {
        e.classList.toggle("dark");
    });
}