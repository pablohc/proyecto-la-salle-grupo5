<template>
    <div class="tarea">
      <div :class="['nombre-tarea', { 'completada': completada }]">{{ nombre }}</div>
      <div class="acciones">
        <button @click="completarTarea" class="done">Done</button>
        <button class="editar">Editar</button>
        <button @click="borrarTarea" class="borrar">Borrar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue'
  
  // Declaramos que este componente tiene una prop llamada 'nombre'
  const props = defineProps({
    nombre: String
  })

  const emit = defineEmits(['borrar-tarea'])

  let completada = ref(false)

  const completarTarea = () => {
    completada.value = !completada.value
  }

  const borrarTarea = () => {
    emit('borrar-tarea')
  }
  </script>
  
  <style scoped>
  .tarea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: 1em 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: darkkhaki;
  }
  
  .nombre-tarea {
    flex: 1;
  }
  
  .acciones button {
    margin-left: 1em;
  }

  .nombre-tarea.completada {
    text-decoration: line-through;
  }

  </style>
  