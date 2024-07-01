<template>
    <div class="sidebar">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo da Minha Empresa">
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Pesquisar...">
      </div>
      <div class="sidebar-item" @click="changeMenu('Menu principal')">
        <i class="mdi mdi-home"></i>
        <span>Menu principal</span>
      </div>
      <div class="sidebar-item" @click="changeMenu('Cadastrar animais')">
        <i class="mdi mdi-paw"></i>
        <span>Cadastrar animais</span>
      </div>
      <div class="sidebar-item" @click="changeMenu('Visualizar animais')">
        <i class="mdi mdi-eye"></i>
        <span>Visualizar animais</span>
      </div>
      <div class="sidebar-item" @click="changeMenu('Emitir relatório')">
        <i class="mdi mdi-file-document-outline"></i>
        <span>Emitir relatório</span>
      </div>
      <div class="sidebar-item" @click="changeMenu('Gerenciar usuário')">
        <i class="mdi mdi-account"></i>
        <span>Gerenciar usuário</span>
      </div>
      <div class="sidebar-item" @click="changeMenu('Gerenciar organização')">
        <i class="mdi mdi-domain"></i>
        <span>Gerenciar organização</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SideBar',
    setup() {
      const currentMenu = ref('');
  
      function changeMenu(menu) {
        currentMenu.value = menu;
        console.log(`Menu atual: ${currentMenu.value}`);
      }
  
      return { changeMenu };
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
  .sidebar-item {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #555;
  }
  .sidebar-item span {
    margin-left: 10px;
  }
  .sidebar-item:hover {
    background-color: #414bb2;
    cursor: pointer;
  }
  </style>
  