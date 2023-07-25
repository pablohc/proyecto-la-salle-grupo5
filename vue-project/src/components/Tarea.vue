<template>
  <div class="tarea">
    <div class="nombre-y-botones">
      <div :class="['nombre-tarea', { 'completada': completed }]">{{ nombre }}</div>
      <div class="acciones">
        <button @click="completarTarea" class="done">Done</button>
        <button @click="alternarEdicion" class="editar">{{ modoEdicion ? 'Guardar' : 'Editar' }}</button>
        <button @click="borrarTarea" class="borrar">Borrar</button>
      </div>
    </div>
    <div v-if="modoEdicion" class="descripcion-tarea descripcion-con-margen">
      <textarea v-model="descripcionTemp" rows="10" placeholder="Descripción de la tarea" class="descripcion-editando"></textarea>
    </div>
    <div v-else-if="descripcion" class="descripcion-tarea descripcion-con-margen">
      <div class="descripcion-scroll">
        {{ descripcion }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  nombre: String,
  completed: Boolean,
  descripcion: String
})

const emit = defineEmits(['borrar-tarea', 'update:descripcion', 'completar-tarea'])

let descripcion = ref(props.descripcion);
let descripcionTemp = ref(descripcion.value);

watch(descripcion, (newDescripcion, oldDescripcion) => {
  if (newDescripcion !== oldDescripcion) {
    descripcionTemp.value = newDescripcion;
  }
});

const modoEdicion = ref(false)

const alternarEdicion = () => {
  if (modoEdicion.value && descripcionTemp.value !== descripcion.value) {
    emit('update:descripcion', descripcionTemp.value)
    descripcion.value = descripcionTemp.value
  }
  modoEdicion.value = !modoEdicion.value
}

const completarTarea = () => {
  emit('completar-tarea')
}

const borrarTarea = () => {
  emit('borrar-tarea')
}
</script>

<style scoped>

.descripcion-scroll {
  max-height: 30vh; 
  overflow-y: auto;
  word-break: break-word;
  padding-right: 10px;
}

.descripcion-scroll::-webkit-scrollbar {
  width: 8px; /* Ancho de la barra de desplazamiento */
}

.descripcion-scroll::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del pulgar de la barra de desplazamiento */
  border-radius: 4px; /* Borde redondeado del pulgar */
}

.descripcion-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color del pulgar al pasar el cursor sobre él */
}


.tarea {
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5d9ad;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 88%;
  min-width: 10em;
  max-width: 30em;
}

.nombre-y-botones {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nombre-tarea {
  flex: 1;
  font-weight: bold;
  font-size: 1em;
  margin-right: 0.8em;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

.nombre-tarea.completada {
  text-decoration: line-through;
}

.acciones {
  display: flex;
  gap: 0.5em;
}

.acciones button {
  flex: 1;
  padding: 0.5em 1em;
  font-size: 0.9em;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.done{
  background: rgb(32, 168, 82);
}
.done:hover {
  background: rgb(16, 97, 46);
}

.editar{
  background: rgb(214, 212, 51);
}
.editar:hover {
  background: rgb(141, 129, 21);
}

.borrar{
  background: #f44336;
}

.borrar:hover{
  background: #80150d;
}

.descripcion-tarea {
  margin-top: 1em;
}

.descripcion-tarea textarea {
  width: 93%;
  resize: vertical;
  border: none;
  padding: 1em;
  margin-top: 0.5em;
  font-size: 0.9em;
  color: #777;
  max-height: 30vh;
  min-height: 2vh;
}

</style>
