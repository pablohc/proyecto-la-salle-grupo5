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
  // Colocar todos los títulos h2 en un array
  let titles = Array.from(document.querySelectorAll('section h2'));
  let currentTitleIndex = 0;
  let pageLoaded = false;

  // Detectar los títulos en el viewport
  function getVisibleTitles() {
    return titles.filter((title) => {
      let rect = title.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    });
  }

  // Función para ir al siguiente título
  function nextTitle() {
    let visibleTitles = getVisibleTitles();
    let currentVisibleTitle = visibleTitles.find(title => title === titles[currentTitleIndex]);

    // Si el título actual está alineado con la parte superior del viewport y hay un segundo título visible
    if (currentVisibleTitle && currentVisibleTitle.getBoundingClientRect().top === 0 && visibleTitles.length > 1) {
      let nextVisibleTitleIndex = visibleTitles.findIndex(title => title !== currentVisibleTitle);
      if (nextVisibleTitleIndex !== -1) {
        let nextVisibleTitle = visibleTitles[nextVisibleTitleIndex];
        nextVisibleTitle.scrollIntoView({ block: 'start', behavior: 'smooth' });
        currentTitleIndex = titles.indexOf(nextVisibleTitle);
        return;
      }
    }

    // Alinear el título actual al principio del viewport
    titles[currentTitleIndex].scrollIntoView({ block: 'start', behavior: 'smooth' });

    // Si no se cumple la condición anterior, pasamos al siguiente título en el array
    let nextTitleIndex = currentTitleIndex + 1;
    if (nextTitleIndex < titles.length) {
      currentTitleIndex = nextTitleIndex;
    } else {
      currentTitleIndex = 0; // Volvemos al primer título si estamos en el último
    }
  }

  // Función para ir al título anterior
  function prevTitle() {
    let prevTitleIndex = currentTitleIndex - 1;
    if (prevTitleIndex >= 0) {
      currentTitleIndex = prevTitleIndex;
      titles[currentTitleIndex].scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else {
      currentTitleIndex = titles.length - 1; // Saltamos al último título si estamos en el primero
      titles[currentTitleIndex].scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  // Escuchar las teclas 'N' y 'P'
  document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
      case 'n':
        nextTitle();
        break;
      case 'p':
        prevTitle();
        break;
    }
  });

  // Alinear el primer título visible al cargar la página
  window.addEventListener('load', () => {
    pageLoaded = true;
    let visibleTitles = getVisibleTitles();
    if (visibleTitles.length > 0) {
      let firstVisibleTitle = visibleTitles[0];
      if (firstVisibleTitle.getBoundingClientRect().top === 0) {
        currentTitleIndex = titles.indexOf(firstVisibleTitle);
      }
    }
  });

  // Actualizar el título actual basándose en los títulos visibles
  function updateCurrentTitle() {
    if (!pageLoaded) {
      return;
    }

    let visibleTitles = getVisibleTitles();
    if (visibleTitles.length > 0) {
      let currentVisibleTitle = visibleTitles.find(title => title === titles[currentTitleIndex]);
      if (!currentVisibleTitle) {
        currentTitleIndex = titles.indexOf(visibleTitles[0]);
      }
    }
  }

  // Escuchar el evento de scroll y actualizar el título actual
  window.addEventListener('scroll', updateCurrentTitle);

  // Escuchar el evento de resize y actualizar el título actual
  window.addEventListener('resize', updateCurrentTitle);
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