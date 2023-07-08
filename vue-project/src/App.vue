<template>
  <main>
    <section id="frameListaTareasId" class="frameListaTareas">
      <header>
        <Menu @agregar-tarea="agregarTarea" />
      </header>
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
      <Footer />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Menu from './Menu.vue'
import Footer from './Footer.vue'
import Tarea from './Tarea.vue'

let tareas = ref([])

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
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.frameListaTareas {
  width: 98vw;
  height: 96vh;
  background-color: #eeeded;
  margin-bottom: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
}

.tareas-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1%;
  width: 100%;
}

.tareas-content::-webkit-scrollbar {
  width: 10px;
  background-color: #f1f1f1;
}

.tareas-content::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.tareas-content::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

.tareas-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.tarea {
  flex: 0 0 15em;
  margin-right: 0.5em;
}
</style>
