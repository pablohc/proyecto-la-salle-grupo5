const url = "https://catfact.ninja/fact";
const div = document.querySelector("#cats-facts");

async function loadFact() {
    const resp = await fetch(url);
    const json = await resp.json();
    return json.fact;
}

async function showFact() {
    const fact = await loadFact();
    const article = document.createElement("article");
    article.innerText = fact;
    div.appendChild(article);
}

async function cleanupOne() {
    div.removeChild(div.firstChild);
}

setInterval(showFact, 5000);
setTimeout(() => setInterval(cleanupOne, 5000), 10000);
