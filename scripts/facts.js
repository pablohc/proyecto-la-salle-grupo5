const url = "https://catfact.ninja/fact";
const div = document.querySelector('#cats-facts');
const arrowLeft = document.querySelector('#arrow-left');
const arrowRight = document.querySelector('#arrow-right');
div.parentElement.addEventListener('slid.bs.carousel', async function (evento) {
    const texto = await loadFact();
    evento.relatedTarget.parentElement.children[evento.from].innerText = texto;
    console.log(evento)
  })
  
async function loadFact() {
    const resp = await fetch(url);
    const json = await resp.json();
    return json.fact;
}

async function showFact() {
    const fact = await loadFact();
    const article = document.createElement("article");
    article.classList.add(`carousel-item`);
    article.innerText = fact;
    div.appendChild(article);
}

async function cleanupOne() {
    div.removeChild(div.firstChild);
}

arrowLeft.addEventListener('click', () => {
    changeArticle("left");
});

arrowRight.addEventListener('click', () => {
    changeArticle("right");
});

async function changeArticle(direction) {
    if (direction === "left") {
        if (div.firstChild) {
            div.insertBefore(div.lastChild, div.firstChild);
        }
    } else if (direction === "right") {
        if (div.lastChild) {
            div.appendChild(div.firstChild);
        }
    }
}

