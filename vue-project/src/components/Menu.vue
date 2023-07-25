<template>
    <nav id="menu">
        <div class="entrada-tarea">
            <input v-model="nuevaTarea" placeholder="Nueva tarea" maxlength="35">
            <button @click="agregarTarea">+</button>
        </div>
        <p>¡Bienvenido {{usuario}}!</p>
        <button class="desconectar-button" @click="desconectar">Desconectar</button>
    </nav>
</template>

<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRouter } from 'vue-router';

    let nuevaTarea = ref('')
    const { usuario } = defineProps(['usuario']);
    const { push } = useRouter();

   
    const emit = defineEmits(['agregar-tarea'])

    const agregarTarea = () => {
        if (nuevaTarea.value.trim() === '') {
            alert('Por favor, introduce un nombre para la tarea.')
            return
        }

        emit('agregar-tarea', nuevaTarea.value)
        nuevaTarea.value = ''
    }

    const desconectar = () => {
        push('/');
    };
   

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

    .desconectar-button {
        margin-left: 1em;
        padding: 0.5em 1em;
        background-color: #f44336;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }

    .desconectar-button:hover {
        background-color: #d32f2f;
    }

    @media (max-width: 600px) {
        .entrada-tarea {
            width: 85%;
        }
    }
</style>
