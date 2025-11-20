<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />

    <div class="flex-1 ml-[200px]">
      <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="bg-black p-3 rounded-full">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
              <p class="mt-1 text-sm text-gray-500">{{ isEditMode ? 'Editar informações do usuário' : 'Cadastrar novo usuário' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <form @submit.prevent="submitForm" class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Coluna Esquerda -->
              <div class="space-y-4">
                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Nome:</label>
                  <input type="text" v-model="formData.name" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Digite o nome completo" required />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">CPF:</label>
                  <input type="text" v-model="formData.nrCPF" 
                    @input="formatCPFInput"
                    maxlength="14"
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="000.000.000-00" />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Nascimento:</label>
                  <input type="date" v-model="formData.dtNascimento" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Mês/Ano" />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Telefone:</label>
                  <input type="text" v-model="formData.nrTelefone" 
                    @input="formatTelefoneInput"
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="(00) 00000-0000" />
                </div>
              </div>

              <!-- Coluna Meio -->
              <div class="space-y-4">
                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">ONG Associada:</label>
                  <select v-model="formData.idOng" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white">
                    <option value="" disabled selected>Selecione a ONG</option>
                    <option v-for="ong in ongs" :key="ong.idOng" :value="ong.idOng">
                      {{ ong.nmOng }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Função:</label>
                  <select v-model="formData.usufuncao" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white">
                    <option value="" disabled selected>Selecione a função</option>
                    <option v-for="funcao in funcoes" :key="funcao.fucodigo" :value="funcao.fucodigo">
                      {{ funcao.fudescricao }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Ativo | Inativo</label>
                  <select v-model="formData.flAtivo" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white">
                    <option :value="true">Ativo</option>
                    <option :value="false">Inativo</option>
                  </select>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Email:</label>
                  <input type="email" v-model="formData.email" 
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="usuario@exemplo.com" required />
                </div>
              </div>

              <!-- Coluna Direita -->
              <div class="space-y-4">
                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Observação:</label>
                  <textarea v-model="formData.deObservacao" 
                    rows="5"
                    class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Digite observações sobre o usuário"></textarea>
                </div>
                
                <div class="flex justify-center mt-4">
                  <button type="submit" 
                    class="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </form>
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
  name: 'CadastroUsuario',
  components: {
    SideBar
  },
  data() {
    return {
      isEditMode: false,
      loading: false,
      ongs: [],
      funcoes: [],
      formData: {
        name: '',
        email: '',
        password: '',
        nrCPF: '',
        dtNascimento: '',
        nrTelefone: '',
        idOng: '',
        usufuncao: '',
        flAtivo: true,
        deObservacao: ''
      }
    }
  },
  async mounted() {
    await Promise.all([
      this.loadOngs(),
      this.loadFuncoes()
    ])
    
    const userId = this.$route.params.id
    if (userId) {
      this.isEditMode = true
      await this.loadUser(userId)
    }
  },
  methods: {
    formatCPFInput(event) {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length <= 11) {
        if (value.length <= 11) {
          value = value.replace(/^(\d{3})(\d)/, '$1.$2')
          value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
          value = value.replace(/\.(\d{3})(\d)/, '.$1-$2')
        }
        this.formData.nrCPF = value
      }
    },
    formatTelefoneInput(event) {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/^(\d{2})(\d)/, '($1) $2')
          value = value.replace(/(\d{4})(\d)/, '$1-$2')
        } else {
          value = value.replace(/^(\d{2})(\d)/, '($1) $2')
          value = value.replace(/(\d{5})(\d)/, '$1-$2')
        }
        this.formData.nrTelefone = value
      }
    },
    async loadOngs() {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/ongs`)
        if (response.ok) {
          this.ongs = await response.json()
        } else {
          // Fallback: tenta buscar a organização atual
          const orgResponse = await fetchWithAuth(`${API_BASE_URL}/api/organizacao`)
          if (orgResponse.ok) {
            const ong = await orgResponse.json()
            this.ongs = [ong]
          }
        }
      } catch (error) {
        console.error('Erro ao carregar ONGs:', error)
        // Se não conseguir carregar, deixa vazio
        this.ongs = []
      }
    },
    async loadFuncoes() {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/funcoes`)
        if (response.ok) {
          this.funcoes = await response.json()
        } else {
          console.error('Erro ao carregar funções')
          this.funcoes = []
        }
      } catch (error) {
        console.error('Erro ao carregar funções:', error)
        this.funcoes = []
      }
    },
    async loadUser(id) {
      try {
        this.loading = true
        const response = await fetchWithAuth(`${API_BASE_URL}/api/usuarios/${id}`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar usuário')
        }
        
        const user = await response.json()
        this.formData = {
          name: user.name || '',
          email: user.email || '',
          password: '',
          nrCPF: user.nrCPF || '',
          dtNascimento: user.dtNascimento || '',
          nrTelefone: user.nrTelefone || '',
          idOng: user.idOng || '',
          usufuncao: user.usufuncao || '',
          flAtivo: user.flAtivo !== undefined ? user.flAtivo : true,
          deObservacao: user.deObservacao || ''
        }
      } catch (error) {
        this.showNotification(`Erro ao carregar usuário: ${error.message}`, 'error')
        this.$router.push('/gerenciar-usuarios')
      } finally {
        this.loading = false
      }
    },
    async submitForm() {
      try {
        this.loading = true
        
        const data = { ...this.formData }
        
        // Define senha padrão se não estiver em modo de edição
        if (!this.isEditMode && !data.password) {
          data.password = 'password123' // Senha padrão temporária
        }
        
        // Remove senha se estiver vazia na edição
        if (this.isEditMode) {
          delete data.password
        }
        
        // Remove formatação do CPF e telefone antes de enviar
        if (data.nrCPF) {
          data.nrCPF = data.nrCPF.replace(/\D/g, '')
        }
        if (data.nrTelefone) {
          data.nrTelefone = data.nrTelefone.replace(/\D/g, '')
        }
        
        // Converte idOng para número ou null
        if (data.idOng === '') {
          data.idOng = null
        } else {
          data.idOng = parseInt(data.idOng)
        }
        
        // Converte usufuncao para número ou null
        if (data.usufuncao === '') {
          data.usufuncao = null
        } else {
          data.usufuncao = parseInt(data.usufuncao)
        }
        
        const url = this.isEditMode 
          ? `${API_BASE_URL}/api/usuarios/${this.$route.params.id}`
          : `${API_BASE_URL}/api/usuarios`
        
        const method = this.isEditMode ? 'PUT' : 'POST'
        
        const response = await fetchWithAuth(url, {
          method,
          body: JSON.stringify(data)
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erro ao salvar usuário')
        }
        
        this.showNotification(
          this.isEditMode ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!'
        )
        
        setTimeout(() => {
          this.$router.push('/gerenciar-usuarios')
        }, 1000)
        
      } catch (error) {
        this.showNotification(`Erro ao salvar: ${error.message}`, 'error')
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

