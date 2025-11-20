<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />
    
    <div class="flex-1 ml-[200px]">
      <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-black p-3 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 class="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
            </div>
            
            <button 
              @click="novoUsuario"
              class="inline-flex items-center px-4 py-2 border border-black rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span class="ml-3 text-gray-600">Carregando usuários...</span>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Erro ao carregar dados</h3>
              <div class="mt-1 text-sm text-red-700">{{ error }}</div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ONG Associada
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Função
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ativo | Inativo
                  </th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-4">
                    <div class="text-sm text-gray-900">{{ user.name }}</div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="text-sm text-gray-900">{{ formatCPF(user.nrCPF) }}</div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="text-sm text-gray-900">{{ user.ong?.nmOng || '-' }}</div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="text-sm text-gray-900">{{ user.funcao?.fudescricao || '-' }}</div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="text-sm text-gray-900">{{ formatTelefone(user.nrTelefone) }}</div>
                  </td>
                  <td class="px-4 py-4">
                    <span :class="user.flAtivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ user.flAtivo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-right text-sm">
                    <div class="flex space-x-2 justify-end">
                      <button @click="editarUsuario(user.id)" 
                              class="inline-flex items-center px-2 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button @click="confirmarExclusao(user)" 
                              class="inline-flex items-center px-2 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="users.length === 0 && !loading" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum usuário encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">Comece cadastrando seu primeiro usuário.</p>
            <div class="mt-6">
              <button @click="novoUsuario" 
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Cadastrar Usuário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import { fetchWithAuth } from '@/utils/fetchInterceptor'
import { API_BASE_URL } from '@/utils/apiConfig'

export default {
  name: 'GerenciarUsuarios',
  components: {
    SideBar
  },
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },
  methods: {
    formatCPF(cpf) {
      if (!cpf) return '-'
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    },
    formatTelefone(telefone) {
      if (!telefone) return '-'
      // Remove caracteres não numéricos
      const cleaned = telefone.replace(/\D/g, '')
      // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
      if (cleaned.length === 11) {
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
      } else if (cleaned.length === 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
      }
      return telefone
    },
    novoUsuario() {
      this.$router.push('/cadastro-usuario')
    },
    editarUsuario(id) {
      this.$router.push(`/editar-usuario/${id}`)
    },
    confirmarExclusao(user) {
      const confirmacao = confirm(
        `Tem certeza que deseja excluir o usuário "${user.name}"?\n\n` +
        `Esta ação não pode ser desfeita!`
      )
      
      if (confirmacao) {
        this.deleteUsuario(user.id)
      }
    },
    async deleteUsuario(id) {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/usuarios/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erro ao deletar usuário');
        
        this.users = this.users.filter(user => user.id !== id);
        
        this.showNotification('Usuário excluído com sucesso!')
        
      } catch (error) {
        this.showNotification(`Erro ao excluir usuário: ${error.message}`, 'error')
      }
    },
    async fetchUsers() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/usuarios`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar usuários')
        }
        
        this.users = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    showNotification(message, type = 'success') {
      const notification = document.createElement('div')
      const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'
      notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300`
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)'
      }, 100)
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          notification.remove()
        }, 300)
      }, 3000)
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

