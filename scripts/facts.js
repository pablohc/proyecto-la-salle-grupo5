const url = "https://catfact.ninja/fact";
const div = document.querySelector("#cats-facts");
div.parentElement.addEventListener("slid.bs.carousel", async function (evento) {
  const texto = await loadFact();
  evento.relatedTarget.parentElement.children[evento.from].innerText = texto;
  console.log(evento);
});

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
