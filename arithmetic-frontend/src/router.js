
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import CalculatePage from './components/CalculatePage.vue';
import CreateUser from './components/CreateUser.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/calculate', component: CalculatePage },
  {path: '/createUser', component: CreateUser}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
