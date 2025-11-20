<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />
    
    <div class="flex-1 ml-[200px]">
      <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Animais Cadastrados</h1>
              <p class="mt-1 text-sm text-gray-500">
                {{ filteredAnimals.length }} animal(is) encontrado(s)
              </p>
            </div>
            
            <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text"
                  v-model="searchTerm"
                  placeholder="Buscar por nome, tutor ou chip..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              
              <button 
                @click="fetchAnimals"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span class="ml-3 text-gray-600">Carregando animais...</span>
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
          <div class="lg:hidden space-y-4">
            <div v-for="animal in filteredAnimals" :key="animal.idAnimal" 
                 class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16">
                    <img v-if="animal.foto" :src="animal.foto" :alt="animal.nmAnimal" 
                         class="w-full h-full object-cover rounded-full border-2 border-gray-200" />
                    <div v-else class="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 truncate">{{ animal.nmAnimal }}</h3>
                      <p class="text-sm text-gray-500">{{ formatSexo(animal.sxAnimal) }} • {{ getPorte(animal.idPorte) }}</p>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      ID: {{ animal.idAnimal }}
                    </span>
                  </div>
                  
                  <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="font-medium text-gray-700">Chip:</span>
                      <span class="text-gray-600">{{ animal.nrChip || 'N/A' }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700">Cor:</span>
                      <span class="text-gray-600">{{ getCor(animal.idCor) }}</span>
                    </div>
                    <div class="col-span-2">
                      <span class="font-medium text-gray-700">Tutor:</span>
                      <span class="text-gray-600">{{ animal.nmTutor }}</span>
                    </div>
                  </div>
                  
                  <div class="mt-4 flex space-x-2">
                    <button @click="editarAnimal(animal.idAnimal)" 
                            class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button @click="confirmarExclusao(animal)" 
                            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Animal
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Informações
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutor
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Características
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="animal in filteredAnimals" :key="animal.idAnimal" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-20 w-20">
                            <img v-if="animal.foto" :src="animal.foto" :alt="animal.nmAnimal" 
                                 class="h-20 w-20 object-cover rounded-lg border-2 border-gray-200" />
                            <div v-else class="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-lg font-medium text-gray-900">{{ animal.nmAnimal }}</div>
                            <div class="text-sm text-gray-500">ID: {{ animal.idAnimal }}</div>
                          </div>
                        </div>
                      </td>

                      <td class="px-6 py-4">
                        <div class="space-y-1">
                          <div class="text-sm text-gray-900">
                            <span class="font-medium">Chip:</span> {{ animal.nrChip || 'N/A' }}
                          </div>
                          <div class="text-sm text-gray-900">
                            <span class="font-medium">Sexo:</span> {{ formatSexo(animal.sxAnimal) }}
                          </div>
                        </div>
                      </td>

                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-900 font-medium">{{ animal.nmTutor }}</div>
                      </td>

                      <td class="px-6 py-4">
                        <div class="space-y-1">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {{ getCor(animal.idCor) }}
                          </span>
                          <br>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {{ getPorte(animal.idPorte) }}
                          </span>
                        </div>
                      </td>

                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex space-x-2 justify-end">
                          <button @click="editarAnimal(animal.idAnimal)" 
                                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button @click="confirmarExclusao(animal)" 
                                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            </div>
          </div>

          <div v-if="filteredAnimals.length === 0 && !loading" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum animal encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece cadastrando seu primeiro animal.' }}
            </p>
            <div class="mt-6">
              <router-link to="/cadastro-animal" 
                          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Cadastrar Animal
              </router-link>
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
  name: 'VisualizarAnimais',
  components: {
    SideBar
  },
  data() {
    return {
      animals: [],
      loading: false,
      error: null,
      searchTerm: '',
      cores: {
        1: 'Caramelo',
        2: 'Branco(a)',
        3: 'Preto(a)',
        4: 'Bege',
        5: 'Marrom',
        6: 'Cinza'
      },
      portes: {
        1: 'Gato',
        2: 'Pequeno',
        3: 'Médio',
        4: 'Grande'
      }
    }
  },
  computed: {
    filteredAnimals() {
      if (!this.searchTerm) return this.animals
      
      const search = this.searchTerm.toLowerCase()
      return this.animals.filter(animal => 
        animal.nmAnimal.toLowerCase().includes(search) ||
        animal.nmTutor.toLowerCase().includes(search) ||
        animal.nrChip?.toLowerCase().includes(search)
      )
    }
  },
  methods: {
    getCor(id) {
      return this.cores[id] || '-'
    },
    editarAnimal(id) {
      this.$router.push(`/editar-animal/${id}`)
    },
    confirmarExclusao(animal) {
      const confirmacao = confirm(
        `Tem certeza que deseja excluir o animal "${animal.nmAnimal}"?\n\n` +
        `Esta ação não pode ser desfeita!`
      )
      
      if (confirmacao) {
        this.deleteAnimal(animal.idAnimal)
      }
    },
    async deleteAnimal(id) {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/animais/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erro ao deletar animal');
        
        this.animals = this.animals.filter(animal => animal.idAnimal !== id);
        
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
        notification.textContent = 'Animal excluído com sucesso!'
        document.body.appendChild(notification)
        
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 3000)
        
      } catch (error) {
        alert(`Erro ao excluir animal: ${error.message}`)
      }
    },
    getPorte(id) {
      return this.portes[id] || '-'
    },
    formatSexo(sexo) {
      return sexo === 'M' ? 'Masculino' : 'Feminino';
    },
    async fetchAnimals() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/animais`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar animais')
        }
        
        this.animals = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchAnimals()
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
  