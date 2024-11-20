<template>
  <div class="app-container">
    <SideBar />
    
    <div class="content-wrapper">
      <div class="sidebar-content">
        <h2>Sobre:</h2>
        <p>O Esquadrão quatro patas é um grupo de protetores animais, sem fins lucrativos, que visa o acolhimento, tratamento, resgate e castração dos animais da Aldeia Condá, em Chapecó-SC.</p>
        <p>Há cerca de 300 animais, entre cães e gatos abandonados, passando fome e frio, e constantemente em risco de vida por conta de atropelamentos, doenças e maus-tratos!</p>
      </div>

      <div class="sidebar-content other-background">
        <h3>Visando aprimorar os cuidados com mais de 300 animais abandonados na Aldeia Condá, foi criado o StrayTrack, um sistema que permite monitorar a vida desses animais, que contam apenas com os voluntários como cuidadores:</h3>
        <p>Com base nisso, o grupo considerou valioso disponibilizar esta tecnologia para que outras ONGs possam utilizá-la para proteger e cuidar dos animais de rua.</p>
      </div>

      <div class="main-content">
        <div v-for="(image, index) in images" :key="index" class="circle">
          <img :src="image" :alt="`Imagem ${index + 1}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import primeira from '@/assets/primeira.png';
import segunda from '@/assets/segunda.png';
import terceira from '@/assets/terceira.png';
import quarta from '@/assets/quarta.png';
import quinta from '@/assets/quinta.png';

export default {
  name: 'HomePage',
  components: {
    SideBar
  },
  data() {
    return {
      images: [primeira, segunda, terceira, quarta, quinta]
    }
  }
}
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content-wrapper {
  margin-left: 200px;
  padding: 20px;
}

.sidebar-content {
  padding: 20px;
  background-color: #414ab273;
  color: #ffffff;
  border-radius: 15px;
  margin-bottom: 20px;
}

.sidebar-content h2,
.sidebar-content h3 {
  color: #000000;
}

.sidebar-content.other-background {
  background-color: #ff575793;
}

.main-content {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
  flex-wrap: wrap;
}

.circle {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
