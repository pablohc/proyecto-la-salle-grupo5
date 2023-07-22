<template>
    <nav id="menu">
        <div class="entrada-tarea">
            <input v-model="nuevaTarea" placeholder="Nueva tarea" maxlength="42">
            <button @click="agregarTarea">+</button>
        </div>
        <select v-model="usuarioSeleccionado">
            <option v-for="usuario in usuarios" :value="usuario" :key="usuario">{{ usuario }}</option>
        </select>
    </nav>
</template>

<script setup>
    import { ref, watch, defineEmits } from 'vue'

    let nuevaTarea = ref('')
    
    let usuarios = ref(['Marc', 'Elionor', 'Isabel', 'Pablo', 'Marta'])
    let usuarioSeleccionado = ref(usuarios.value[0])

    const emit = defineEmits(['agregar-tarea', 'cambio-usuario'])

    const agregarTarea = () => {
        if (nuevaTarea.value.trim() === '') {
            alert('Por favor, introduce un nombre para la tarea.')
            return
        }

        emit('agregar-tarea', nuevaTarea.value)
        nuevaTarea.value = ''
    }

    watch(usuarioSeleccionado, (newUser) => {
        emit('cambio-usuario', newUser)
    })

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
    }

    .entrada-tarea {
        display: flex;
        align-items: center;
        width: 45%;
        margin-right: 1em;
    }

    .entrada-tarea input {
        flex: 1;
        margin: 1em 0 1em 1em;
        border: none;
        padding: 10px;
        border-radius: 5px 5px 5px 5px;
        outline: none;
    }

    .entrada-tarea button {
        padding: 0.7em 1em;
        background: rgb(32, 168, 82);
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
    }

    .entrada-tarea button:hover {
        background: rgb(11, 111, 0);
    }

    @media (max-width: 600px) {
        .entrada-tarea {
            width: 85%;
        }
    }
</style>
