import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import ListaTareas from './components/ListaTareas.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/lista-tareas/:usuario', component: ListaTareas, name: 'lista-tareas', props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
