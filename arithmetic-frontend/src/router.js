// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import CalculatePage from './components/CalculatePage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/calculate', component: CalculatePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
