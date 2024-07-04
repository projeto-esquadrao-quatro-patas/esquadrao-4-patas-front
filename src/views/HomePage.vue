<template>
    <div>
        <SideBar></SideBar> <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial com Vue.js</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/mdi@5.9.55/css/materialdesignicons.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 200px;
            background-color: #ff575793; /* Cor de fundo da barra lateral */
            color: #ffffff;
        }
        .logo {
            text-align: center;
            padding: 30px 0;
        }
        .logo img {
            width: 170px; /* Defina o tamanho da sua logo conforme necessário */
            height: auto
            ;
        }
        .sidebar-item {
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #555;
        }
        .sidebar-item span {
            margin-left: 10px; /* Espaçamento entre o ícone e o texto */
        }
        .sidebar-item:hover {
            background-color: #414bb2;
            cursor: pointer;
        }
        /* Estilo para o conteúdo ao lado da barra lateral - Fundo roxo */
        .sidebar-content {
            margin-left: 220px; /* Margem à esquerda para deixar espaço para o menu lateral */
            padding: 20px;
            background-color: #414ab273; /* Cor de fundo roxo claro */
            color: #ffffff;
            border-radius: 15px; /* Bordas arredondadas */
        }
        .sidebar-content h2,
        .sidebar-content h3 {
            color: #000000; /* Título em preto */
        }
        /* Estilo para o conteúdo ao lado da barra lateral - Fundo verde */
        .sidebar-content.other-background {
            background-color: #ff575793; /* Cor de fundo verde */
        }
        .sidebar-content.green-background h2,
        .sidebar-content.green-background h3 {
            color: #000000; /* Título em preto */
        }
        .main-content {
            display: flex;
            justify-content: center ; /* Centraliza horizontalmente */
            gap: 30px; /* Espaçamento entre as imagens */
            z-index: 0; /* Para garantir que o conteúdo esteja atrás da barra lateral */
            padding-left: 220px;
        
        }
        .circle {
            width: 170px; /* Tamanho do círculo */
            height: 170px; /* Tamanho do círculo */
            border-radius: 50%; /* Tornar o elemento circular */
            overflow: hidden; /* Garantir que a imagem seja cortada em um círculo */
            position: relative;
        }
        .circle img {
            width: 100%; /* Preencher o círculo com a imagem */
            height: 100%; /* Preencher o círculo com a imagem */
            object-fit: cover; /* Manter a proporção da imagem */
            border-radius: 50%; /* Ajustar borda para o círculo */
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo">
            <img src="../src/assets/logo.png" alt="Logo da Minha Empresa" width="300" height="150">
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Pesquisar...">
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-home"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Menu principal')">Menu principal</span>
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-paw"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Cadastrar animais')">Cadastrar animais</span>
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-eye"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Visualizar animais')">Visualizar animais</span>
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-file-document-outline"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Emitir relatório')">Emitir relatório</span>
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-account"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Gerenciar usuário')">Gerenciar usuário</span>
        </div>
        <div class="sidebar-item">
            <i class="mdi mdi-domain"></i> <!-- Ícone do Material Design Icons -->
            <span @click="changeMenu('Gerenciar organização')">Gerenciar organização</span>
        </div>
    </div>
    <div class="sidebar-content">
        <h2>Sobre:</h2>
        <p>O Esquadrão quatro patas é um grupo de protetores animais, sem fins lucrativos, que visa o acolhimento, tratamento, resgate e castração dos animais da Aldeia Condá, em Chapecó-SC.</p>
        <p>Há cerca de 300 animais, entre cães e gatos abandonados, passando fome e frio, e constantemente em risco de vida por conta de atropelamentos, doenças e maus-tratos!</p>
    </div>
    <div class="sidebar-content other-background">
        <h3>Visando aprimorar os cuidados com mais de 300 animais abandonados na Aldeia Condá, foi criado o StrayTrack, um sistema que permite monitorar a vida desses animais, que contam apenas com os voluntários como cuidadores:</h3>
        <p>Com base nisso, o grupo considerou valioso disponibilizar esta tecnologia para que outras ONGs possam utilizá-la para proteger e cuidar dos animais de rua.</p>
    </div>
    <br>
    <div class="main-content">
        <div class="circle">
            <img src="../src/assets/primeira.PNG" alt="Primeira Imagem">
        </div>
        <div class="circle">
            <img src="../src/assets/segunda.PNG" alt="Segunda Imagem">
        </div>
        <div class="circle">
            <img src="../src/assets/terceira.PNG" alt="Terceira Imagem">
        </div>
        <div class="circle">
            <img src="../src/assets/quarta.PNG" alt="Quarta Imagem">
            </div>
            <div class="circle">
                <img src="../src/assets/quinta.PNG" alt="Quinta Imagem">
    
        </div>
    </div>    
</body>
</html>


    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
    name: 'HomePage',
    components: {
        SideBar
    },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>
