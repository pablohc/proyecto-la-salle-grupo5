<template>
    <nav id="menu">
        <div class="entrada-tarea">
            <input v-model="nuevaTarea" placeholder="Nueva tarea">
            <button @click="agregarTarea">+</button>
        </div>
    </nav>
  </template>
  
<script setup>
    import { ref, defineEmits } from 'vue'

    let nuevaTarea = ref('')

    const emit = defineEmits(['agregar-tarea'])

    const agregarTarea = () => {
        if (nuevaTarea.value.trim() === '') {
            alert('Por favor, introduce un nombre para la tarea.')
            return
        }

        emit('agregar-tarea', nuevaTarea.value)
        nuevaTarea.value = ''
    }
</script>
  
<style scoped>
    #menu {
        background: rgb(147, 198, 243);
        font-family: sans-serif;
        width: 98vw;
        height: 6vh;
        position: sticky;
        top: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        display: flex;
    }

.entrada-tarea {
    display: flex;
    align-items: center;
    width: 45%;
}

.entrada-tarea input {
    flex: 1;
    margin: 1em;
}

.entrada-tarea button {
    padding: 0.5em 1em;
}
</style>