<template>
    <div class="tarea">
      <div class="nombre-tarea">{{ nombre }}</div>
      <div class="acciones">
        <button class="done">Done</button>
        <button class="editar">Editar</button>
        <button class="borrar">Borrar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  // Declaramos que este componente tiene una prop llamada 'nombre'
  const props = defineProps({
    nombre: String
  })
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
  </style>
  