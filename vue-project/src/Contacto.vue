<template>
    <div class="contacto">
      <h2>{{ contacto.name }}</h2>
      <p>Teléfono: {{ contacto.phone }}</p>
      <p>Email: {{ contacto.email }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    contacto: Object
  })
  </script>
  
  <style scoped>
  .contacto {
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 1em 1em;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 88%;
    min-width: 10em;
    max-width: 30em;
  }
  
  .contacto h2 {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 0.5em;
  }
  
  .contacto p {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 0.2em;
  }
  </style>
  