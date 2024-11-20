import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../views/LoginComponent.vue';
import HomePage from '../views/HomePage.vue';
import CadastroAnimal from '../views/CadastroAnimal.vue';
import VisualizarAnimais from '../views/VisualizarAnimais.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginComponent',
    component: LoginComponent
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/cadastro-animal',
    name: 'CadastroAnimal',
    component: CadastroAnimal,
    meta: { requiresAuth: true }
  },
  {
    path: '/visualizar-animais',
    name: 'VisualizarAnimais',
    component: VisualizarAnimais,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
//TODO precisamos lembrar de descomentar isso quando a autenticacao estiver 100% ok 
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   const isAuthenticated = !!token;

//   if (to.meta.requiresAuth) {
//     if (!isAuthenticated) {
//       next('/login');
//       return;
//     }
//   }

//   if (to.path === '/login' && isAuthenticated) {
//     next('/');
//     return;
//   }

//   next();
// });

export default router;
