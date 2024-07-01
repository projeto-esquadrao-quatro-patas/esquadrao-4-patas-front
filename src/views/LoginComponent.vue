<template>
    <div class="login-container">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo">
      </div>
      <form @submit.prevent="login">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="senha" placeholder="Senha" required>
        </div>
        <button type="submit">Entrar</button>
        <div class="links">
          <a href="#">Esqueceu a senha? Clique aqui!</a>
          <a href="#">Cadastre sua conta!</a>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'LoginComponent',
    data() {
      return {
        email: '',
        senha: ''
      }
    },
    methods: {
        async login() {
            const payload = {
                deEmail: this.email,
                deSenha: this.senha
            };
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', payload);
                const token = response.data.token.token;
                console.log("Token recebido:", token);
                localStorage.setItem('userToken', token);
                this.$router.push('/');
            } catch (error) {
                console.error("Erro no login:", error.response.data);
            }
        }

    }
  }
  </script>
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .logo img {
    display: block;
    margin: 0 auto 20px;
    width: 80%;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  input[type="email"], input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #004494;
  }
  
  .links a {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  