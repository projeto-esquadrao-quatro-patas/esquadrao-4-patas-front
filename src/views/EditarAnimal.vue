<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />

    <div class="flex-1 ml-[200px]">
      <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center gap-3">
            <button @click="$router.go(-1)" class="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Editar Animal</h1>
              <p class="mt-1 text-sm text-gray-500">Altere as informações do animal</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">

        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span class="ml-3 text-gray-600">Carregando dados do animal...</span>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Erro ao carregar animal</h3>
              <div class="mt-1 text-sm text-red-700">{{ error }}</div>
            </div>
          </div>
        </div>

        <div v-else class="bg-white shadow-sm rounded-lg border border-gray-200">
          <form @submit.prevent="submitForm" class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">N° do chip</label>
                <input type="text" v-model="formData.nrChip" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o número do chip" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Nome/Apelido *</label>
                <input type="text" v-model="formData.nmAnimal" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o nome/apelido" required />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Cor *</label>
                <select v-model="formData.idCor" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" required>
                  <option value="" disabled>Selecione a cor</option>
                  <option value="1">Caramelo</option>
                  <option value="2">Branco(a)</option>
                  <option value="3">Preto(a)</option>
                  <option value="4">Bege</option>
                  <option value="5">Marrom</option>
                  <option value="6">Cinza</option>
                </select>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Sexo *</label>
                <select v-model="formData.sxAnimal" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" required>
                  <option value="" disabled>Selecione o sexo</option>
                  <option value="M">Macho</option>
                  <option value="F">Fêmea</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Chip pai</label>
                <input type="text" v-model="formData.nrChipPai" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o chip do pai" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Tutor *</label>
                <input type="text" v-model="formData.nmTutor" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o tutor" required />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Porte *</label>
                <select v-model="formData.idPorte" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" required>
                  <option value="" disabled>Selecione o porte</option>
                  <option value="1">Gato</option>
                  <option value="2">Pequeno</option>
                  <option value="3">Médio</option>
                  <option value="4">Grande</option>
                </select>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Ano de Nascimento</label>
                <input type="number" v-model="formData.nrAnoNascimento" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2024" min="1990" max="2030" required />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Chip da mãe</label>
                <input type="text" v-model="formData.nrChipMae" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o chip da mãe" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Observações</label>
                <textarea v-model="formData.observations" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Digite observações sobre o animal" rows="4"></textarea>
              </div>
            </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200">
              <label class="text-sm mb-3 font-medium text-gray-700 block">Foto do Animal:</label>
              <div class="border border-dashed border-gray-300 rounded p-4 text-center">
                <div v-if="previewImage" class="mb-4">
                  <img :src="previewImage" alt="Preview" class="max-w-xs max-h-48 mx-auto rounded" />
                  <div class="mt-2 space-x-2">
                    <button @click="removeImage" type="button" class="text-red-500 text-sm hover:underline">
                      Remover foto
                    </button>
                    <button @click="triggerFileInput" type="button" class="text-blue-500 text-sm hover:underline">
                      Trocar foto
                    </button>
                  </div>
                </div>
                <div v-else class="py-8">
                  <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*"
                    class="hidden" />
                  <div @click="triggerFileInput" 
                    class="bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer">
                    <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span class="text-gray-600 font-medium">Clique para adicionar uma foto</span>
                    <span class="text-gray-400 text-sm mt-1">PNG, JPG, JPEG até 10MB</span>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mt-2">
                  {{ previewImage ? 'Foto atual/selecionada' : 'Adicione uma foto do animal' }}
                </p>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <button type="submit" :disabled="submitting"
                class="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors">
                <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submitting ? 'Salvando...' : 'Salvar Alterações' }}
              </button>
              
              <button type="button" @click="$router.go(-1)"
                class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Cancelar
              </button>
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
  name: 'EditarAnimal',
  components: {
    SideBar
  },
  data() {
    return {
      animalId: null,
      loading: true,
      submitting: false,
      error: null,
      formData: {
        nrChip: '',
        nmAnimal: '',
        sxAnimal: '',
        nrChipPai: '',
        nrChipMae: '',
        nrAnoNascimento: 2024,
        nmTutor: '',
        idCor: '',
        idPorte: '',
        foto: null
      },
      previewImage: null,
      originalFoto: null
    }
  },
  async mounted() {
    this.animalId = this.$route.params.id
    if (this.animalId) {
      await this.carregarAnimal()
    } else {
      this.error = 'ID do animal não fornecido'
      this.loading = false
    }
  },
  methods: {
    async carregarAnimal() {
      try {
        this.loading = true
        this.error = null

        const response = await fetchWithAuth(`${API_BASE_URL}/api/animais/${this.animalId}`)
        
        if (!response.ok) {
          throw new Error('Animal não encontrado')
        }

        const animal = await response.json()
        
        this.formData = {
          nrChip: animal.nrChip || '',
          nmAnimal: animal.nmAnimal || '',
          sxAnimal: animal.sxAnimal || '',
          nrChipPai: animal.nrChipPai || '',
          nrChipMae: animal.nrChipMae || '',
          nrAnoNascimento: animal.nrAnoNascimento || 2024,
          nmTutor: animal.nmTutor || '',
          idCor: animal.idCor?.toString() || '',
          idPorte: animal.idPorte?.toString() || '',
          foto: animal.foto || null
        }

        if (animal.foto) {
          this.previewImage = animal.foto
          this.originalFoto = animal.foto
        }

      } catch (error) {
        console.error('Erro ao carregar animal:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    triggerFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click()
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      
      if (!file) {
        return
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      
      if (!allowedTypes.includes(file.type)) {
        alert('Por favor, selecione apenas arquivos de imagem (PNG, JPG, JPEG, GIF, WEBP).')
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande! Máximo 10MB.')
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.formData.foto = e.target.result
        this.previewImage = e.target.result
      }
      reader.onerror = () => {
        alert('Erro ao ler o arquivo. Tente novamente.')
      }
      reader.readAsDataURL(file)
    },

    removeImage() {
      this.formData.foto = null
      this.previewImage = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },

    async submitForm() {
      try {
        this.submitting = true

        const payload = {
          nrChip: this.formData.nrChip || null,
          nmAnimal: this.formData.nmAnimal,
          sxAnimal: this.formData.sxAnimal,
          nrChipPai: this.formData.nrChipPai || null,
          nrChipMae: this.formData.nrChipMae || null,
          nrAnoNascimento: parseInt(this.formData.nrAnoNascimento),
          nmTutor: this.formData.nmTutor,
          idCor: parseInt(this.formData.idCor),
          idPorte: parseInt(this.formData.idPorte),
          foto: this.formData.foto
        }

        const response = await fetchWithAuth(`${API_BASE_URL}/api/animais/${this.animalId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (!response.ok) {
          throw {
            status: response.status,
            data: data
          }
        }

        alert('Animal editado com sucesso!')
        this.$router.push('/visualizar-animais')

      } catch (error) {
        console.error('Erro ao editar animal:', error)

        if (error.status === 422 && error.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat().join('\n')
          alert(`Erros de validação:\n${errorMessages}`)
        } else if (error.data?.message) {
          alert(error.data.message)
        } else {
          alert('Erro ao editar animal. Tente novamente.')
        }
      } finally {
        this.submitting = false
      }
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