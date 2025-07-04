<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
        <img class="mx-auto w-48" src="../assets/logo.png" alt="Logo">
      </div>

      <form @submit.prevent="login" class="mt-8 space-y-6">
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {{ errorMessage }}
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input id="email" type="email" v-model="formData.email" :disabled="loading"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Email" required>
          </div>

          <div>
            <label for="password" class="sr-only">Senha</label>
            <input id="password" type="password" v-model="formData.senha" :disabled="loading"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Senha" required>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>

        <div class="text-sm text-center space-y-2">
          <a href="#" class="font-medium text-red-600 hover:text-red-500 block">
            Esqueceu a senha? Clique aqui!
          </a>
          <router-link to="/cadastro-ong" class="font-medium text-red-600 hover:text-red-500 block">
            Cadastre sua conta!
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/utils/apiConfig'

export default {
  name: 'LoginComponent',
  data() {
    return {
      loading: false,
      errorMessage: '',
      formData: {
        email: '',
        senha: ''
      }
    }
  },
  methods: {
    async login() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            deEmail: this.formData.email,
            deSenha: this.formData.senha
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw {
            status: response.status,
            data: data
          };
        }

        localStorage.setItem('token', data.token.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));

        this.$router.push('/');

      } catch (error) {
        console.error('Erro no login:', error);

        if (error.status === 401) {
          this.errorMessage = 'Email ou senha incorretos';
        } else if (error.data?.message) {
          this.errorMessage = error.data.message;
        } else {
          this.errorMessage = 'Erro ao realizar login. Tente novamente.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>