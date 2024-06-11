<template>
  <div class="text-center mt-10">
    <img alt="Vue logo" src="./assets/logo.png" class="mx-auto w-32">
    <HelloWorld msg="TU PODE ADICIONAR OS HTML DENTRO DOS TEMPLATES. SE FOR REUTILIZAVEL AS COISAS QUE TU FOR CRIAR PODE CRIAR COMPONENTES. DAI JA DEIXEI A VIEWS CRIADA ALI E O ROUTER PARA ADICIONARMOS AS NOSSAS ROTAS(TEM MANEIRAS DE DEIXAR MAIS ORGANIZADO, MAS ESSA JA ESTA BOM PELO TAMANHO DO PROJETO) " class="text-red-500 font-bold"/>
    <h1 class="text-xl font-semibold text-gray-700">Um exemplo disso é esse cara aqui app seria a vue e o hello world um componente</h1>
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
