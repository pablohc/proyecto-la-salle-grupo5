<template>
  <main>
    <section id="frameListaTareasId" class="frameListaTareas">
      <header>
        <Menu @agregar-tarea="agregarTarea" @cambio-usuario="cambioUsuario"/>
      </header>
      <div class="content">
        <div class="tareas-content">
          <div id="tareas" class="tareas-container">
            <div class="tarea" v-for="tarea in tareas" :key="tarea.id">
              <Tarea
                :nombre="tarea.nombre"
                :completada="tarea.completada"
                :descripcion="tarea.descripcion"
                @borrar-tarea="borrarTarea(tarea.id)"
                @update:descripcion="actualizarDescripcion(tarea.id, $event)"
                @completar-tarea="completarTarea(tarea.id)"
              />
            </div>
          </div>
        </div>
        <div class="contactos-content">
          <h2 class="contactos-title">Contactos</h2>
          <div id="contactos" class="contactos-container">
            <div class="contacto" v-for="contacto in contactos" :key="contacto.id">
              <Contacto
                :contacto="contacto"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Menu from './Menu.vue'
import Footer from './Footer.vue'
import Tarea from './Tarea.vue'
import Contacto from './Contacto.vue'

let tareas = ref([])
let contactos = ref([])

let usuarioSeleccionado = ref('Marc')

const agregarTarea = nombre => {
  tareas.value.push({ id: Date.now(), nombre, completada: false, descripcion: '' })
}

const borrarTarea = tareaId => {
  tareas.value = tareas.value.filter(tarea => tarea.id !== tareaId)
}

const actualizarDescripcion = (tareaId, descripcion) => {
  const tarea = tareas.value.find(t => t.id === tareaId)
  if (tarea) {
    tarea.descripcion = descripcion
  }
}

const completarTarea = tareaId => {
  const tarea = tareas.value.find(t => t.id === tareaId)
  if (tarea) {
    tarea.completada = !tarea.completada
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

const generarContactoAleatorio = (id) => {
  const nombres = ["John", "Jane", "Mike", "Alice", "Bob", "Emma", "Charlie", "Sophia"];
  const apellidos = ["Doe", "Smith", "Johnson", "Brown", "Taylor", "Moore", "Jackson", "White"];
  const dominios = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

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
}

onMounted(async () => {
  await cambioUsuario(usuarioSeleccionado.value);
});

const cambioUsuario = async usuario => {
  try {
    usuarioSeleccionado.value = usuario;

    // Intenta recuperar los contactos del usuario actual
    let contactosActuales = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts`);
    
    // Si se encontraron contactos, eliminarlos
    if (contactosActuales && contactosActuales.length > 0) {
      await Promise.all(contactosActuales.map(contacto =>
        deleteData(`https://contacts-api-yy1b.onrender.com/users/${usuarioSeleccionado.value}/contacts/${contacto.id}`)
      ));
    }

    const numeroContactos = Math.ceil(Math.random() * 6); // Generar un número aleatorio de 1 a 6
    const contactosAleatorios = Array.from({length: numeroContactos}, (_, i) => generarContactoAleatorio(i+1));
    await Promise.all(contactosAleatorios.map(contacto => postData(`https://contacts-api-yy1b.onrender.com/users/${usuario}/contacts`, contacto)));

    let contactosResponse = await getData(`https://contacts-api-yy1b.onrender.com/users/${usuario}/contacts`);
    contactos.value = contactosResponse;
  } catch (error) {
    console.error(`Error al cambiar de usuario: ${error}`);
  }
}

</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.frameListaTareas {
  display: grid;
  grid-template-rows: auto 1fr auto; /* 3 filas: encabezado, contenido y pie de página */
  grid-template-columns: 1fr; /* 1 sola columna */
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
  width: 300px; /* Ancho fijo */
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
</style>
