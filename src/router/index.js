import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../views/LoginComponent.vue';
import CadastroOng from '../views/CadastroOng.vue';
import HomePage from '../views/HomePage.vue';
import CadastroAnimal from '../views/CadastroAnimal.vue';
import EditarAnimal from '../views/EditarAnimal.vue';
import VisualizarAnimais from '../views/VisualizarAnimais.vue';
import GerenciarOrganizacao from '../views/GerenciarOrganizacao.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginComponent',
    component: LoginComponent
  },
  {
    path: '/cadastro-ong',
    name: 'CadastroOng',
    component: CadastroOng
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
    path: '/editar-animal/:id',
    name: 'EditarAnimal',
    component: EditarAnimal,
    meta: { requiresAuth: true }
  },
  {
    path: '/gerenciar-organizacao',
    name: 'GerenciarOrganizacao',
    component: GerenciarOrganizacao,
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login');
      return;
    }
  }

  if (to.path === '/login' && isAuthenticated) {
    next('/');
    return;
  }

  next();
});

export default router;
