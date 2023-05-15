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
      console.log(tecla);
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
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title">Ayuda</h5>
  </div>
  <div class="modal-body">
    <p>Modal body text goes here.</p>
  </div>
</div>
</div>`