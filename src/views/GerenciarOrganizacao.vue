<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />

      <div class="flex-1 ml-[200px]">
    <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Gerenciar Organização</h1>
              <p class="mt-1 text-sm text-gray-500">Informações institucionais da ONG</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <div class="p-6">
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
                Dados da Organização
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Nome da ONG *</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.nmOng" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formData.nmOng || 'Não informado' }}</span>
                    </div>
                    <input v-else type="text" v-model="tempData.nmOng" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Ex: Esquadrão Quatro Patas" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.nmOng" @click="startEdit('nmOng')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('nmOng')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('nmOng')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">CNPJ *</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.nrCNPJ" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formatCNPJDisplay(formData.nrCNPJ) || 'Não informado' }}</span>
                    </div>
                    <input v-else type="text" v-model="tempData.nrCNPJ" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="12345678000199" maxlength="14" @input="formatCNPJ" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.nrCNPJ" @click="startEdit('nrCNPJ')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('nrCNPJ')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('nrCNPJ')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Nome do Presidente *</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.nmPresidente" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formData.nmPresidente || 'Não informado' }}</span>
                    </div>
                    <input v-else type="text" v-model="tempData.nmPresidente" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Nome completo do presidente" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.nmPresidente" @click="startEdit('nmPresidente')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('nmPresidente')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('nmPresidente')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">CPF do Presidente *</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.nrCPFPresidente" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formatCPFDisplay(formData.nrCPFPresidente) || 'Não informado' }}</span>
                    </div>
                    <input v-else type="text" v-model="tempData.nrCPFPresidente" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="12345678901" maxlength="11" @input="formatCPF" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.nrCPFPresidente" @click="startEdit('nrCPFPresidente')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('nrCPFPresidente')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('nrCPFPresidente')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Email *</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.deEmail" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formData.deEmail || 'Não informado' }}</span>
                    </div>
                    <input v-else type="email" v-model="tempData.deEmail" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="contato@esquadraoquatropatas.org.br" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.deEmail" @click="startEdit('deEmail')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('deEmail')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('deEmail')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm mb-2 font-medium text-gray-700">Site</label>
                  <div class="flex items-center gap-3">
                    <div v-if="!editMode.deUrlSite" class="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span class="text-gray-900">{{ formData.deUrlSite || 'Não informado' }}</span>
                    </div>
                    <input v-else type="url" v-model="tempData.deUrlSite" 
                      class="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="https://www.esquadraoquatropatas.org.br" />
                    
                    <div class="flex gap-1">
                      <button v-if="!editMode.deUrlSite" @click="startEdit('deUrlSite')" 
                        class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <template v-else>
                        <button @click="saveField('deUrlSite')" 
                          class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button @click="cancelEdit('deUrlSite')" 
                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
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
  name: 'GerenciarOrganizacao',
  components: {
    SideBar
  },
  data() {
    return {
      loading: false,
      formData: {
        nmOng: '',
        nrCNPJ: '',
        nmPresidente: '',
        nrCPFPresidente: '',
        deEmail: '',
        deUrlSite: ''
      },
      tempData: {},
      editMode: {
        nmOng: false,
        nrCNPJ: false,
        nmPresidente: false,
        nrCPFPresidente: false,
        deEmail: false,
        deUrlSite: false
      }
    }
  },
  async mounted() {
    await this.loadOrganizationData()
  },
  methods: {
    async loadOrganizationData() {
      try {
        this.loading = true
        
        const response = await fetchWithAuth(`${API_BASE_URL}/api/organizacao`)
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados da organização')
        }
        
        this.formData = await response.json()
        console.log('Dados carregados:', this.formData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        this.showNotification('Erro ao carregar dados da organização', 'error')
      } finally {
        this.loading = false
      }
    },

    startEdit(field) {
      this.editMode[field] = true
      this.tempData[field] = this.formData[field]
      
      this.$nextTick(() => {
        const input = document.querySelector(`input[v-model="tempData.${field}"]`)
        if (input) input.focus()
      })
    },

    async saveField(field) {
      try {
        if ((field === 'nmOng' || field === 'nmPresidente' || field === 'deEmail') && !this.tempData[field]) {
          this.showNotification('Este campo é obrigatório', 'error')
          return
        }

        if (field === 'deEmail' && !this.isValidEmail(this.tempData[field])) {
          this.showNotification('Email inválido', 'error')
          return
        }

        const updateData = {
          [field]: this.tempData[field]
        }

        console.log(`Salvando ${field}:`, updateData)
        
        const response = await fetchWithAuth(`${API_BASE_URL}/api/organizacao`, {
          method: 'PUT',
          body: JSON.stringify(updateData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erro ao salvar')
        }

        this.formData[field] = this.tempData[field]
        this.editMode[field] = false
        
        this.showNotification(`${this.getFieldLabel(field)} atualizado com sucesso!`)

      } catch (error) {
        console.error('Erro ao salvar:', error)
        this.showNotification(`Erro ao salvar: ${error.message}`, 'error')
      }
    },

    cancelEdit(field) {
      this.editMode[field] = false
      this.tempData[field] = this.formData[field]
    },

    formatCNPJ(event) {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length <= 14) {
        this.tempData.nrCNPJ = value
      }
    },

    formatCPF(event) {
      let value = event.target.value.replace(/\D/g, '')
      if (value.length <= 11) {
        this.tempData.nrCPFPresidente = value
      }
    },

    formatCNPJDisplay(cnpj) {
      if (!cnpj) return ''
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    },

    formatCPFDisplay(cpf) {
      if (!cpf) return ''
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },

    getFieldLabel(field) {
      const labels = {
        nmOng: 'Nome da ONG',
        nrCNPJ: 'CNPJ',
        nmPresidente: 'Nome do Presidente',
        nrCPFPresidente: 'CPF do Presidente',
        deEmail: 'Email',
        deUrlSite: 'Site'
      }
      return labels[field]
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