<script setup>
  import { ref } from 'vue'
  import Menu from './Menu.vue'
  import Footer from './Footer.vue'
  import Tarea from './Tarea.vue'

  let tareas = ref([])

  const agregarTarea = nombre => {
    tareas.value.push({ id: Date.now(), nombre })
  }

</script>

<template>

  <main>
    <section id="frameListaTareasId" class="frameListaTareas">
      <header>
        <Menu @agregar-tarea="agregarTarea" />
      </header>
      <div id="tareas">
        <Tarea v-for="tarea in tareas" :key="tarea.id" :nombre="tarea.nombre" />
      </div>
      <Footer />
    </section>
  </main>


</template>

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
  }
  
</style>
