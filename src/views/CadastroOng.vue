<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
        <img class="mx-auto w-48" src="../assets/logo.png" alt="Logo">
        <h1 class="text-2xl font-bold text-gray-900 mt-4">Cadastrar ONG</h1>
        <p class="text-gray-600">Preencha os dados para criar sua conta</p>
      </div>

      <form @submit.prevent="cadastrarOng" class="mt-8 space-y-6">
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {{ successMessage }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="nmOng" class="block text-sm font-medium text-gray-700">Nome da ONG *</label>
            <input 
              id="nmOng" 
              type="text" 
              v-model="formData.nmOng" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Digite o nome da ONG" 
              required
              maxlength="250">
          </div>

          <div>
            <label for="nrCNPJ" class="block text-sm font-medium text-gray-700">CNPJ *</label>
            <input 
              id="nrCNPJ" 
              type="text" 
              v-model="formData.nrCNPJ" 
              :disabled="loading"
              @input="formatCNPJ"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="00.000.000/0000-00" 
              required
              maxlength="18">
          </div>

          <div>
            <label for="nmPresidente" class="block text-sm font-medium text-gray-700">Nome do Presidente *</label>
            <input 
              id="nmPresidente" 
              type="text" 
              v-model="formData.nmPresidente" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Digite o nome do presidente" 
              required
              maxlength="250">
          </div>

          <div>
            <label for="nrCPFPresidente" class="block text-sm font-medium text-gray-700">CPF do Presidente *</label>
            <input 
              id="nrCPFPresidente" 
              type="text" 
              v-model="formData.nrCPFPresidente" 
              :disabled="loading"
              @input="formatCPF"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="000.000.000-00" 
              required
              maxlength="14">
          </div>

          <div>
            <label for="deEmail" class="block text-sm font-medium text-gray-700">Email *</label>
            <input 
              id="deEmail" 
              type="email" 
              v-model="formData.deEmail" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="email@exemplo.com" 
              required
              maxlength="200">
          </div>

          <div>
            <label for="deUrlSite" class="block text-sm font-medium text-gray-700">Site da ONG</label>
            <input 
              id="deUrlSite" 
              type="url" 
              v-model="formData.deUrlSite" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="https://exemplo.com" 
              maxlength="200">
          </div>

          <div>
            <label for="deSenha" class="block text-sm font-medium text-gray-700">Senha *</label>
            <input 
              id="deSenha" 
              type="password" 
              v-model="formData.deSenha" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Mínimo 6 caracteres" 
              required
              minlength="6"
              maxlength="100">
          </div>

          <div>
            <label for="confirmSenha" class="block text-sm font-medium text-gray-700">Confirmar Senha *</label>
            <input 
              id="confirmSenha" 
              type="password" 
              v-model="formData.confirmSenha" 
              :disabled="loading"
              class="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Confirme sua senha" 
              required>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
            {{ loading ? 'Cadastrando...' : 'Cadastrar ONG' }}
          </button>

          <div class="text-center">
            <router-link 
              to="/login" 
              class="font-medium text-red-600 hover:text-red-500">
              Já tem uma conta? Faça login
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/utils/apiConfig'

export default {
  name: 'CadastroOng',
  data() {
    return {
      loading: false,
      errorMessage: '',
      successMessage: '',
      formData: {
        nmOng: '',
        nrCNPJ: '',
        nmPresidente: '',
        nrCPFPresidente: '',
        deEmail: '',
        deUrlSite: '',
        deSenha: '',
        confirmSenha: ''
      }
    }
  },
  methods: {
    formatCNPJ() {
      let value = this.formData.nrCNPJ.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      this.formData.nrCNPJ = value;
    },

    formatCPF() {
      let value = this.formData.nrCPFPresidente.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d{2})$/, '.$1-$2');
      this.formData.nrCPFPresidente = value;
    },

    validateForm() {
      if (this.formData.deSenha !== this.formData.confirmSenha) {
        this.errorMessage = 'As senhas não coincidem';
        return false;
      }

      const cnpjNumbers = this.formData.nrCNPJ.replace(/\D/g, '');
      if (cnpjNumbers.length !== 14) {
        this.errorMessage = 'CNPJ deve ter 14 dígitos';
        return false;
      }

      const cpfNumbers = this.formData.nrCPFPresidente.replace(/\D/g, '');
      if (cpfNumbers.length !== 11) {
        this.errorMessage = 'CPF deve ter 11 dígitos';
        return false;
      }

      return true;
    },

    async cadastrarOng() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.validateForm()) {
        this.loading = false;
        return;
      }

      try {
        const payload = {
          nmOng: this.formData.nmOng,
          nrCNPJ: this.formData.nrCNPJ.replace(/\D/g, ''),
          nmPresidente: this.formData.nmPresidente,
          nrCPFPresidente: this.formData.nrCPFPresidente.replace(/\D/g, ''),
          deEmail: this.formData.deEmail,
          deUrlSite: this.formData.deUrlSite || null,
          deSenha: this.formData.deSenha
        };

        const response = await fetch(`${API_BASE_URL}/api/ongs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw {
            status: response.status,
            data: data
          };
        }

        this.successMessage = 'ONG cadastrada com sucesso! Redirecionando para o login...';
        this.clearForm();
        
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);

      } catch (error) {
        console.error('Erro ao cadastrar ONG:', error);

        if (error.data?.error) {
          this.errorMessage = error.data.error;
        } else if (error.status === 422) {
          this.errorMessage = 'Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.';
        } else {
          this.errorMessage = 'Erro ao cadastrar ONG. Tente novamente.';
        }
      } finally {
        this.loading = false;
      }
    },

    clearForm() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = '';
      });
    }
  }
}
</script>

<style scoped>
</style> 