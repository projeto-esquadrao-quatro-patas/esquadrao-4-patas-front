<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo Stray Track">
    </div>
    
    <div class="search-bar">
      <input type="text" placeholder="Pesquisar...">
    </div>

    <router-link 
      to="/" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-home"></i>
        <span>Menu principal</span>
      </div>
    </router-link>

    <router-link 
      to="/cadastro-animal" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-paw"></i>
        <span>Cadastrar animais</span>
      </div>
    </router-link>

    <router-link 
      to="/visualizar-animais" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-eye"></i>
        <span>Visualizar animais</span>
      </div>
    </router-link>

    <router-link 
      to="/relatorios" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-file-document-outline"></i>
        <span>Emitir relatório</span>
      </div>
    </router-link>

    <router-link 
      to="/gerenciar-usuario" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-account"></i>
        <span>Gerenciar usuário</span>
      </div>
    </router-link>

    <router-link 
      to="/gerenciar-organizacao" 
      custom
      v-slot="{ navigate }"
    >
      <div class="sidebar-item" @click="navigate" role="link">
        <i class="mdi mdi-domain"></i>
        <span>Gerenciar organização</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  setup() {
    const router = useRouter();
    
    return { router };
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background-color: #ff575793;
  color: #ffffff;
  z-index: 50;
}

.logo {
  text-align: center;
  padding: 20px 0;
}

.logo img {
  width: 120px;
}

.search-bar {
  padding: 10px;
  text-align: center;
}

.search-bar input {
  width: 90%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: rgba(255, 255, 255, 0.9);
}

.sidebar-item {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar-item i {
  margin-right: 10px;
  font-size: 1.2em;
}

.sidebar-item:hover {
  background-color: #414bb2;
  cursor: pointer;
}

.router-link-active .sidebar-item {
  background-color: rgba(65, 75, 178, 0.8);
}
</style>