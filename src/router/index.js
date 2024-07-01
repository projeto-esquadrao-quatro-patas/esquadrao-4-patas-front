import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../views/LoginComponent.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
  {
    path: '/login',
    name: 'LoginComponent',
    component: LoginComponent
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;