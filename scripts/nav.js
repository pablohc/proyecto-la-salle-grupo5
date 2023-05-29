/*Escribir un script en vuestra página, que cuando se pulse una tecla del 1 al 5, haga
scroll a la sección correspondiente. Para hacer scroll, sólo hace falte "navegar" con
window.location = "#id-de-la-seccion"*/

document.addEventListener("keydown", function (event) {
  // Obtener el valor de la tecla presionada
  let tecla = event.key;

  // Verificar si el elemento con aria-label="navigationHelp" tiene la clase "show"
  let navigationHelp = document.querySelector('[aria-label="navigationHelp"]');
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


// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  let secciones = [ "header", "who", "services", "portfolio", "location", "emailus" ];
  let indiceActual = 0;

  // SECCION ACTUAL = BOTTOM es mayor a 0 y TOP es menor al ALTO de la sección
  function actualizarIndiceActual() {
    for (let i = 0; i < secciones.length; i++) {
      let seccion = document.getElementById(secciones[ i ]);
      let rect = seccion.getBoundingClientRect();
      if ((rect.bottom > 0) && ((rect.top * (-1)) < rect.height)) {
        indiceActual = i;
        break;
      }
    }
  }

  function irSiguienteSeccion() {
    if (indiceActual >= 0 && indiceActual < (secciones.length - 1)) {
      indiceActual++;
      let seccionSiguiente = document.getElementById(secciones[ indiceActual ]);
      seccionSiguiente.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }

  function irSeccionAnterior() {
    if (indiceActual > 0 && indiceActual < (secciones.length)) {
      indiceActual--;
      let seccionAnterior = document.getElementById(secciones[ indiceActual ]);
      seccionAnterior.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "n") {
      irSiguienteSeccion();
    } else if (event.key === "p") {
      irSeccionAnterior();
    }
  });

  document.addEventListener("scroll", function () {
    actualizarIndiceActual();
  });

  // Desplazarse a la primera sección (header) al cargar la página
  let header = document.getElementById("header");
  header.scrollIntoView({ behavior: "auto", block: "start" });
});
