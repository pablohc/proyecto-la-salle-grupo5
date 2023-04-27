/*Escribir un script en vuestra página, que cuando se pulse una tecla del 1 al 5, haga
scroll a la sección correspondiente. Para hacer scroll, sólo hace falte "navegar" con
window.location = "#id-de-la-seccion"*/

document.addEventListener("keydown", function(event) {
    // Obtener el valor de la tecla presionada
    var tecla = event.key;
    
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
      default:
        // No hacer nada si se presiona otra tecla
        break;
    }
  });