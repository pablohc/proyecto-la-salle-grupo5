  document.addEventListener("keyup", function(event) {
    const targetElement = event.target;
    const isInputOrTextArea = targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA";
   //    if (targetElement instanceof HTMLInputElement || targetElement instanceof HTMLTextAreaElement) {

    if (isInputOrTextArea) {
        event.stopPropagation();
        return;
    }
    const maybeLink = document.querySelector(`a.nav-link[data-key='${event.key}']`);
    if (maybeLink) {
        maybeLink.click();
    }
});


/*for(let input of document.querySelectorAll("input, textarea")){
    input.addEventListener("keyup",  function(event) {event.stopPropagation()});
}*/

for(let input of document.querySelectorAll('input[type=tel]')){
    input.addEventListener("keydown", function(event){
        if(isNaN(parseInt(event.key))){
            event.preventDefault();
        }
    });
}


function moveImagesRandom() {
    let imageContainer = document.querySelector(".image-container");
    let images = Array.from(imageContainer.children);
  
    setInterval(() => {
      let randomIndex1 = Math.floor(Math.random() * images.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * images.length);
      } while (randomIndex2 === randomIndex1);
      [images[randomIndex1], images[randomIndex2]] = [images[randomIndex2], images[randomIndex1]];
      images.forEach((image) => {
        imageContainer.appendChild(image);
      });
    }, 2000);
  }
  
  moveImagesRandom();
