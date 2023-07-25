<template>
  <div id="home">
    <header>
      <h1 class="title">Bienvenido</h1>
      <!-- Dropdown para seleccionar usuario -->
      <div class="dropdown">
        <select v-model="usuarioSeleccionado">
          <option v-for="usuario in usuarios" :value="usuario" :key="usuario">{{ usuario }}</option>
        </select>
      </div>
    </header>

    <main>
      <section id="loginSection">
        <router-link :to="{ name: 'lista-tareas', params: { usuario: usuarioSeleccionado } }" class="button">Iniciar sesión</router-link>
      </section>
    </main>

    <footer id="footer">
        Grupo 5: Pablo, Isabel, Marta, Elionor, Marc
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let usuarioSeleccionado = ref('Marc');
const usuarios = ['Marc', 'Elionor', 'Isabel', 'Pablo', 'Marta'];

</script>

<style>
.dropdown {
  text-align: center;
  margin-top: 20px;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-family: Arial, sans-serif; 
  color: #333; 
}

html, body, #app {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin-bottom: 20px;
  font-family: 'Helvetica Neue', sans-serif; 
  color: #007BFF; 
  font-size: 36px;
  text-align: center; /* Añadido para centrar el texto */
}

#loginSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Estilos para el enlace */
.button {
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  margin-bottom: 50vh;
}

/* Estilos para el enlace cuando se hace hover */
.button:hover {
  background-color: #0056b3;
}
</style>
