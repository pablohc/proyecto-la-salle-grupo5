<template>
  <main>
    <section id="frameListaTareasId" class="frameListaTareas">
      <header>
        <Menu v-if="usuarioSeleccionado" :usuario="usuarioSeleccionado" @agregar-tarea="agregarTarea" />
      </header>
      <div class="content">
        <div class="tareas-content">
          <h3 class="subtitle-buscar-tarea">Buscar Tarea</h3>
          <input v-model="busquedaTarea" @keyup="buscarTarea" placeholder="Nombre de la tarea" class="buscar-input-tarea">
          <div id="tareas" class="tareas-container">
            <div class="tarea" v-for="tarea in tareasMostradas" :key="tarea.id">
              <Tarea :nombre="tarea.nombre" :completed="tarea.completed" :descripcion="tarea.descripcion"
                :username="tarea.author" @borrar-tarea="borrarTarea(tarea.id)"
                @update:descripcion="actualizarDescripcion(tarea.id, $event)"
                @completar-tarea="completarTarea(tarea.id)" />
            </div>
            <!-- Mostrar un mensaje si no hay tareas encontradas -->
            <p v-if="!tareasMostradas.length" class="empty-message">No se obtuvieron resultados.</p>
          </div>
        </div>
        <div class="contactos-content">
          <h2 class="contactos-title">Contactos</h2>
          <button @click="generarContactosAleatorios" class="generar-button">Generar nuevos contactos aleatorios</button>
          <h3 class="subtitle-buscar-contacto">Buscar Contacto</h3>
          <input v-model="busqueda" @keyup="buscarContacto" placeholder="Nombre, apellidos, teléfono o email)"
            class="buscar-input">
          <div id="contactos" class="contactos-container">
            <div class="contacto" v-for="contacto in contactosMostrados" :key="contacto.id">
              <Contacto :contacto="contacto" />
            </div>
            <!-- Mostrar un mensaje si no hay contactos encontrados -->
            <p v-if="!contactosMostrados.length" class="empty-message">No se encontraron contactos.</p>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  </main>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue'
import Menu from './Menu.vue'
import Footer from './Footer.vue'
import Tarea from './Tarea.vue'
import Contacto from './Contacto.vue'

let tareas = ref([]);
let contactos = ref([]);
let busquedaTarea = ref('');
const props = defineProps({
  usuario: String,
});

let usuarioSeleccionado = ref(props.usuario);
const contactosMostrados = ref([]);

let busqueda = ref('');

const tareasMostradas
  = ref([]);




// Arreglos de nombres, apellidos y dominios para generar contactos aleatorios
const nombres = ["John", "Jane", "Mike", "Alice", "Bob", "Emma", "Charlie", "Sophia", "Joan", "Miquel"];
const apellidos = ["Doe", "Smith", "Johnson", "Brown", "Taylor", "Moore", "Jackson", "White", "García", "Molina"];
const dominios = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

// Función para generar un contacto aleatorio
const generarContactoAleatorio = (id) => {
  const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
  const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
  const dominioAleatorio = dominios[Math.floor(Math.random() * dominios.length)];

  const contacto = {
    id: id.toString(),
    name: `${nombreAleatorio} ${apellidoAleatorio}`,
    phone: Math.floor(Math.random() * 1000000000).toString(),
    email: `${nombreAleatorio.toLowerCase()}.${apellidoAleatorio.toLowerCase()}@${dominioAleatorio}`,
    createdAt: new Date().toISOString()
  };

  return contacto;
};

const agregarTarea = async nombre => {
  const tareaData = {
    id: Date.now().toString(),
    text: nombre,
    completed: false,
    description: '',
    author: usuarioSeleccionado.value,
    tags: [],
    createdAt: new Date().toISOString()
  };
  try {
    const tarea = await postData(`https://todos-ddy8.onrender.com/users/${usuarioSeleccionado.value}/todos`, tareaData);
    tareas.value.push({ ...tarea, nombre: tarea.text, descripcion: tarea.description }); // Utilizar 'map' para mapear el campo 'text' a 'nombre'
    filtrarTareasNoEliminadas(); // Volver a filtrar las tareas después de agregar una nueva tarea
  } catch (error) {
    console.error(`Error al agregar tarea: ${error}`);
  }
}


const borrarTarea = async tareaId => {
  try {
    await deleteData(`https://todos-ddy8.onrender.com/users/${usuarioSeleccionado.value}/todos/${tareaId}`);
    tareas.value = tareas.value.filter(tarea => tarea.id !== tareaId);
    filtrarTareasNoEliminadas(); // Volver a filtrar las tareas después de borrar una tarea
  } catch (error) {
    console.error(`Error al borrar tarea: ${error}`);
  }
}

const filtrarTareasNoEliminadas = () => {
  tareasMostradas.value = tareas.value.filter(tarea => !tarea.eliminada);
}

const actualizarDescripcion = async (tareaId, descripcion) => {
  // Verificar si la tarea existe en el estado local
  const tarea = tareas.value.find(t => t.id === tareaId);
  if (!tarea) {
    console.error('Tarea no encontrada en el estado local');
    return;
  }

  // Verificar si la descripción ha cambiado
  if (tarea.descripcion === descripcion) {
    return;
  }

  try {

    // Hacer una llamada PATCH a la API para actualizar la tarea
    await patchData(`https://todos-ddy8.onrender.com/users/${usuarioSeleccionado.value}/todos/${tareaId}`, {
      ...tarea,
      description: descripcion
    });

    // Actualizar la descripción de la tarea en el estado local
    actualizarTareaLocal(tareaId, { descripcion });
  } catch (error) {
    console.error(`Error al actualizar la descripción de la tarea: ${error}`);
  }
}

// Función para actualizar una tarea en el estado local
const actualizarTareaLocal = (tareaId, cambios) => {
  const tareaIndex = tareas.value.findIndex(t => t.id === tareaId);
  if (tareaIndex !== -1) {
    tareas.value[tareaIndex] = {
      ...tareas.value[tareaIndex],
      ...cambios
    };
  } else {
    console.error('Tarea no encontrada en el estado local al intentar actualizarla.');
  }
}

const completarTarea = async tareaId => {
  const tarea = tareas.value.find(t => t.id === tareaId)
  if (tarea) {
    try {
      tarea.completed = !tarea.completed;
      await patchData(`https://todos-ddy8.onrender.com/users/${usuarioSeleccionado.value}/todos/${tareaId}`, tarea);
    } catch (error) {
      console.error(`Error al completar tarea: ${error}`);
      tarea.completed = !tarea.completed;
    }
  }
}


const getData = async (url = '') => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error('No response text');
  }

  return JSON.parse(text);
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error('No response text');
  }

  return JSON.parse(text);
}

const patchData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error('No response text');
  }

  return JSON.parse(text);
}


const deleteData = async (url = '') => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error('No response text');
  }

  return JSON.parse(text);
}

onMounted(async () => {
  await initCargaContactos(usuarioSeleccionado.value);

  try {
    // Cargar las tareas existentes del usuario
    const tareasExistentes = await getData(`https://todos-ddy8.onrender.com/users/${usuarioSeleccionado.value}/todos`);
    tareas.value = tareasExistentes.map(tarea => ({ ...tarea, nombre: tarea.text, descripcion: tarea.description, eliminada: false }));

    // Llamar a mostrarTodasLasTareas() para mostrar todas las tareas al cargar la página
    filtrarTareasNoEliminadas();

    // Cargar los contactos existentes del usuario
    await initCargaContactos(usuarioSeleccionado.value);
  } catch (error) {
    console.error(`Error al cargar las tareas: ${error}`);
  }
});


const initCargaContactos = async usuario => {
  try {
    usuarioSeleccionado.value = usuario;

    // Intenta recuperar los contactos del usuario actual
    let contactosActuales = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`);

    if (contactosActuales && contactosActuales.length > 0) {
      // Si ya existen contactos, simplemente mostrarlos
      contactos.value = contactosActuales;
    } else {
      // Si no se encontraron contactos, crear nuevos contactos aleatorios
      const numeroContactos = Math.ceil(Math.random() * 8); // Generar un número aleatorio de 1 a 8
      const contactosAleatorios = Array.from({ length: numeroContactos }, (_, i) => generarContactoAleatorio(i + 1));

      // Primero, realizamos las operaciones de POST para crear los nuevos contactos
      await Promise.all(contactosAleatorios.map(contacto => postData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`, contacto)));

      // Después de crear los contactos, obtenemos los contactos actualizados
      let contactosResponse = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`);
      contactos.value = contactosResponse;
    }

    contactosMostrados.value = [...contactos.value]; // Hacer una copia de los contactos al cargar la página
  } catch (error) {
    console.error(`Error al cambiar de usuario: ${error}`);
  }
}

const generarContactosAleatorios = async () => {
  try {

    // Intenta recuperar los contactos del usuario actual
    let contactosActuales = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`);

    // Si se encontraron contactos, eliminarlos
    if (contactosActuales && contactosActuales.length > 0) {
      await Promise.all(contactosActuales.map(contacto =>
        deleteData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts/${contacto.id}`)
      ));
    }

    const numeroContactos = Math.ceil(Math.random() * 6); // Generar un número aleatorio de 1 a 6
    const contactosAleatorios = Array.from({ length: numeroContactos }, (_, i) => generarContactoAleatorio(i + 1));

    // Primero, realizamos las operaciones de POST para crear los nuevos contactos
    await Promise.all(contactosAleatorios.map(contacto => postData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`, contacto)));

    // Después de crear los contactos, obtenemos los contactos actualizados
    let contactosResponse = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`);
    contactos.value = contactosResponse;
    contactosMostrados.value = [...contactosResponse]; // Hacer una copia de los contactos al cargar la página
  } catch (error) {
    console.error(`Error al cambiar de usuario: ${error}`);
  }
};

const buscarContacto = async () => {
  const terminoBusqueda = busqueda.value.trim().toLowerCase();
  if (!terminoBusqueda) {
    contactosMostrados.value = contactos.value;
    return;
  }

  try {
    const contactosBuscados = contactos.value.filter(contacto =>
      contacto.name.toLowerCase().includes(terminoBusqueda) ||
      contacto.phone.includes(terminoBusqueda) ||
      contacto.email.toLowerCase().includes(terminoBusqueda)
    );
    contactosMostrados.value = contactosBuscados;
  } catch (error) {
    console.error(`Error al buscar contactos: ${error}`);
    contactosMostrados.value = [];
  }
};


watch(busqueda, () => {
  buscarContacto();
});
watch(busquedaTarea, () => {
  buscarTarea();
});

const buscarTarea = async () => {
  const terminoBusqueda = busquedaTarea.value.trim().toLowerCase();
  if (!terminoBusqueda) {
    // Si el campo de búsqueda está vacío, mostramos todas las tareas locales
    tareasMostradas.value = tareas.value;
    return;
  }

  try {
    // Filtramos las tareas locales en lugar de hacer una consulta a la API
    const tareasBuscadas = tareas.value.filter((tarea) =>
      tarea.nombre.toLowerCase().includes(terminoBusqueda) ||
      tarea.descripcion.toLowerCase().includes(terminoBusqueda)
    );
    tareasMostradas.value = tareasBuscadas;
  } catch (error) {
    console.error(`Error al buscar tareas: ${error}`);
    tareasMostradas.value = [];
  }
};

// Función para mostrar todas las tareas cuando el campo de búsqueda está vacío
const mostrarTodasLasTareas = () => {
  tareasMostradas.value = [...tareas.value];
};
</script>
  
<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.frameListaTareas {
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* 3 filas: encabezado, contenido y pie de página */
  grid-template-columns: 1fr;
  /* 1 sola columna */
  height: 97vh;
  width: 98vw;
  background-color: #eeeded;
  border-radius: 1%;
  overflow: hidden;
}

.tareas-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  width: 100%;
  min-width: 50vh;
}

.tareas-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1%;
  width: 100%;
}

.tareas-content::-webkit-scrollbar,
.contactos-content::-webkit-scrollbar {
  width: 10px;
  background-color: #f1f1f1;
}

.tareas-content::-webkit-scrollbar-track,
.contactos-content::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.tareas-content::-webkit-scrollbar-thumb,
.contactos-content::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

.tareas-content::-webkit-scrollbar-thumb:hover,
.contactos-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}


.tarea {
  flex: 0 0 15em;
  margin-right: 1em;
}

.content {
  display: flex;
  overflow: hidden;
}

.contactos-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1%;
  width: 300px;
  /* Ancho fijo */
  margin-left: 20px;
}

.contactos-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
}

.contactos-title {
  font-size: 1.5em;
  font-weight: bold;
}

.contacto {
  flex: 0 0 auto;
  width: 100%;
  max-width: 15em;
  margin: 0;
}

/* Estilos para el título "Contactos" */
.contactos-title {
  font-size: 1.8em;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 10px;
  /* Reducimos el margen inferior */
  color: #333;
}

/* Estilos para el botón "Generar nuevos contactos aleatorios" */
.generar-button {
  background-color: #d05fd2;
  color: white;
  font-size: 0.9em;
  /* Reducimos el tamaño de fuente */
  border: none;
  border-radius: 5px;
  padding: 4px 4px;
  /* Ajustamos el padding para reducir el tamaño */
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
  /* Agregamos un margen superior */
}

.generar-button:hover {
  background-color: #6c165c;
}

/* Estilos para el input de filtro */
.buscar-input {
  font-size: 1em;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 2px;
}


.buscar-input::placeholder {
  font-size: 0.8em;
}

/* Estilos para el mensaje de "No se encontraron contactos" */
.empty-message {
  font-size: 1.2em;
  color: #777;
}

.subtitle-buscar-contacto {
  font-family: 'Courier New', Courier, monospace;
}

/* Estilos para el input de filtro de tareas */
.buscar-input-tarea {
  font-size: 1em;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
  margin-bottom: 5px;
  margin-top: 2px;
}

/* Estilos para el título "Buscar Tarea" */
.subtitle-buscar-tarea {
  font-size: 1.8em;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 10px;
  /* Reducimos el margen inferior */
  color: #333;
}
</style>
  