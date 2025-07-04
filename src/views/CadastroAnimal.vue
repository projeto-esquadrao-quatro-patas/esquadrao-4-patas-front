<template>
  <div class="flex min-h-screen bg-gray-50">
    <SideBar />

    <div class="flex-1 ml-[200px]">
      <div class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="bg-red-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Cadastrar Animal</h1>
              <p class="mt-1 text-sm text-gray-500">Preencha as informações do animal</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 sm:px-6 lg:px-8 py-6">

        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <form @submit.prevent="submitForm" class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">N° do chip</label>
                <input type="text" v-model="formData.nrChip" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o número do chip" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Chip MSD</label>
                <input type="text" v-model="formData.chipMsd" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o chip MSD" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Nome/Apelido *</label>
                <input type="text" v-model="formData.nmAnimal" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o nome/apelido" required />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Cor *</label>
                <select v-model="formData.idCor" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white" required>
                  <option value="" disabled selected>Selecione a cor</option>
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
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white" required>
                  <option value="" disabled selected>Selecione o sexo</option>
                  <option value="M">Macho</option>
                  <option value="F">Fêmea</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Chip pai</label>
                <input type="text" v-model="formData.nrChipPai" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o chip do pai" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Tutor *</label>
                <input type="text" v-model="formData.nmTutor" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o tutor" required />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Porte *</label>
                <select v-model="formData.idPorte" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white" required>
                  <option value="" disabled selected>Selecione o porte</option>
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
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="2024" min="1990" max="2030" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Chip da mãe</label>
                <input type="text" v-model="formData.nrChipMae" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o chip da mãe" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1 font-medium text-gray-700">Observações</label>
                <textarea v-model="formData.observations" 
                  class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  placeholder="Digite observações sobre o animal" rows="4"></textarea>
              </div>
            </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200">
              <label class="text-sm mb-3 font-medium text-gray-700 block">Foto do Animal:</label>
              <div class="border border-dashed border-gray-300 rounded p-4 text-center">
                <div v-if="previewImage" class="mb-4">
                  <img :src="previewImage" alt="Preview" class="max-w-xs max-h-48 mx-auto rounded" />
                  <button @click="removeImage" type="button" class="mt-2 text-red-500 text-sm hover:underline">
                    Remover foto
                  </button>
                </div>
                <div v-else class="py-8">
                  <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*"
                    class="hidden" />
                  <div @click="triggerFileInput" 
                    class="bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer">
                    <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span class="text-gray-600 font-medium">Clique para selecionar uma foto</span>
                    <span class="text-gray-400 text-sm mt-1">PNG, JPG, JPEG até 10MB</span>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mt-2">
                  {{ previewImage ? 'Foto selecionada com sucesso!' : 'Adicione uma foto do animal' }}
                </p>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <button type="submit" :disabled="loading"
                class="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors">
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Salvando...' : 'Salvar Animal' }}
              </button>
              
              <button type="button" @click="clearForm"
                class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                Limpar Formulário
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
  name: 'CadastroAnimal',
  components: {
    SideBar
  },
  data() {
    return {
      loading: false,
      errorMessage: '',
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
        idOngCadastro: 1,   
        dtOngCadastro: new Date().toISOString().split('T')[0],
        foto: null
      },
      previewImage: null
    }
  },
  methods: {
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
    async submitForm() {
      try {
        this.loading = true
        this.errorMessage = ''

        const payload = {
          nrChip: this.formData.nrChip,
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

        const response = await fetchWithAuth(`${API_BASE_URL}/api/cadastrarAnimais`, {
          method: 'POST',
          body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (!response.ok) {
          throw {
            status: response.status,
            data: data
          }
        }

        alert('Animal cadastrado com sucesso!')
        this.clearForm()

      } catch (error) {
        console.error('Erro ao cadastrar animal:', error)

        if (error.status === 422 && error.data?.errors) {
          this.errorMessage = Object.values(error.data.errors).flat().join('\n')
        } else if (error.data?.message) {
          this.errorMessage = error.data.message
        } else {
          this.errorMessage = 'Erro ao cadastrar animal. Tente novamente.'
        }

        alert(this.errorMessage)
      } finally {
        this.loading = false
      }
    },
    removeImage() {
      this.formData.foto = null
      this.previewImage = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    clearForm() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = ''
      })
      this.formData.nrAnoNascimento = 2024
      this.formData.foto = null
      this.previewImage = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
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
