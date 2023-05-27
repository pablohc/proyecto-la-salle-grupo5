/*Escribir un script en vuestra página, que cuando se pulse una tecla del 1 al 5, haga
scroll a la sección correspondiente. Para hacer scroll, sólo hace falte "navegar" con
window.location = "#id-de-la-seccion"*/

document.addEventListener("keydown", function (event) {
  // Obtener el valor de la tecla presionada
  var tecla = event.key;

  // Verificar si el elemento con aria-label="navigationHelp" tiene la clase "show"
  var navigationHelp = document.querySelector('[aria-label="navigationHelp"]');
  if ((navigationHelp && navigationHelp.classList.contains('show')) && tecla != "Escape") {
    return; // Si está presente y tiene la clase "show", se detiene la ejecución del evento keydown
  }

  // Determinar a qué sección se debe desplazar la página
  switch (tecla) {
    case "1":
      window.location = "#who";
      break;
    case "2":
      window.location = "#services";
      break;
    case "3":
      window.location = "#portfolio";
      break;
    case "4":
      window.location = "#location";
      break;
    case "5":
      window.location = "#emailus";
      break;
    case "?":
      showModal();
      break;
    case "Escape":
      hideModal();
      console.log(tecla);
      break;
    default:
      console.log("nav", tecla);
      break;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Colocar todas las secciones en un array
  let sections = Array.from(document.getElementsByTagName('section'));
  let currentSectionIndex = 0;

  // Detectar las secciones en el viewport
  function getVisibleSections() {
    let visibleSections = sections.filter((section, i) => {
        let rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    });
    return visibleSections;
  }

  // Función para ir a la siguiente sección
  function nextSection() {
    let nextSectionIndex = currentSectionIndex + 1;
    if(nextSectionIndex < sections.length){
        sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth' });
        currentSectionIndex = nextSectionIndex;
    }
  }

  // Función para ir a la sección anterior
  function prevSection() {
    let prevSectionIndex = currentSectionIndex - 1;
    if(prevSectionIndex >= 0){
        sections[prevSectionIndex].scrollIntoView({ behavior: 'smooth' });
        currentSectionIndex = prevSectionIndex;
    }
  }

  // Escuchar las teclas 'N' y 'P'
  document.addEventListener('keydown', (e) => {
      switch(e.key.toLowerCase()) {
          case 'n':
              nextSection();
              break;
          case 'p':
              prevSection();
              break;
      }
  });

  // Actualizar la sección actual basándose en las secciones visibles
  function updateCurrentSection() {
    let visibleSections = getVisibleSections();
    if(visibleSections.length > 0){
        // Aquí se asume que la sección más relevante es la primera visible, pero puedes ajustarlo a tus necesidades
        let mostRelevantSection = visibleSections[0];
        currentSectionIndex = sections.indexOf(mostRelevantSection);
    }
  }

  // Escuchar el evento de scroll y actualizar la sección actual
  window.addEventListener('scroll', updateCurrentSection);

  // Escuchar el evento de resize y actualizar la sección actual
  window.addEventListener('resize', updateCurrentSection);
});

let showModal = function () {
  let modal = document.querySelector(`[aria-label=navigationHelp]`);
  modal.classList.add(`show`, `block`);
  modal.innerHTML = modalContent;
}

let hideModal = function () {
  let modal = document.querySelector(`[aria-label=navigationHelp]`);
  modal.classList.remove(`show`, `block`);
}

let modalContent = `<div class="modal-dialog">
  <div class="modal-content d-flex flex-auto flex-column">
    <div class="modal-header justify-content-center">
      <h1 class="modal-title">Keyboard shortcuts</h1>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <ul class="col-9 list-inline justify-content-center align-items-center">
        <li class="d-flex justify-content-between align-items-center">
          <div>Bring up this help dialog</div>
          <div>
            <kbd>
              <span>
                ?
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Who We are?" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                1
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Services" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                2
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Portfolio" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                3
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Location" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                4
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Go to "Email Us" section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                5
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Move to Next section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                n
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Move to Previous section</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                p
              </span>
            </kbd>
          </div>
        </li>
        <li class="d-flex justify-content-between">
          <div class="flex-auto">Close this help dialog</div>
          <div class="ml-2 no-wrap">
            <kbd>
              <span>
                Esc
              </span>
            </kbd>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>`