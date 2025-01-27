let card = document.querySelector(".card");
let container = document.querySelector('.container');
let attac = document.querySelector(".attac");
let comment = document.querySelector(".comment_hide");
let terminal = document.querySelector("footer");
let hackerTextElements = document.querySelectorAll(".hacker-text");
let attackElement = document.querySelector(".attack");
let delay = 0;

hackerTextElements.forEach((element, index) => {
    setTimeout(() => {
        element.classList.add("show");
    }, delay);
    delay += 5000;
});

setTimeout(() => {
    attackElement.classList.add("show");
    card.style.display = "block";
    container.style.display = 'none';
    attac.style.color = "#ff0000";
    comment.style.display = "block";
}, delay);

function hide() {
    terminal.style.display = "none";
    container.style.display = 'none';
    card.style.marginTop = "200px";
    card.style.fontSize = "18px";
    card.style.width = "500px";
}

window.onload = function () {
    setTimeout(function () {
        container.style.display = 'block';
    }, 10000);
};