<template>
  <div class="flex">
    <SideBar />

    <div class="flex-1 p-8 ml-[200px]">
      <div class="max-w-6xl">
        <div class="flex items-center gap-2 mb-6">
          <span class="text-3xl">+</span>
          <h1 class="text-xl">Cadastrar animal</h1>
        </div>

        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-3 gap-x-6">
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm mb-1">N° do chip</label>
                <input type="text" v-model="formData.nrChip" class="w-full p-2 rounded border border-gray-200"
                  placeholder="Digite o número do chip" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Chip MSD</label>
                <input type="text" v-model="formData.chipMsd" class="w-full p-2 rounded border border-gray-200"
                  placeholder="Digite o chip MSD" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Nome/Apelido</label>
                <input type="text" v-model="formData.nmAnimal" class="w-full p-2 rounded border border-gray-200"
                  placeholder="Digite o nome/apelido" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Cor</label>
                <select v-model="formData.idCor" class="w-full p-2 rounded border border-gray-200 bg-white">
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
                <label class="text-sm mb-1">Sexo</label>
                <select v-model="formData.sxAnimal" class="w-full p-2 rounded border border-gray-200 bg-white">
                  <option value="" disabled selected>Selecione o sexo</option>
                  <option value="M">Macho</option>
                  <option value="F">Fêmea</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Chip pai</label>
                <input type="text" v-model="formData.nrChipPai" class="w-full p-2 rounded border border-gray-200"
                  placeholder="Digite o chip do pai" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Tutor</label>
                <input type="text" v-model="formData.nmTutor" class="w-full p-2 rounded border border-gray-200"
                  placeholder="Digite o tutor" />
              </div>

              <div class="flex flex-col">
                <label class="text-sm mb-1">Porte</label>
                <select v-model="formData.idPorte" class="w-full p-2 rounded border border-gray-200 bg-white">
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
                <label class="text-sm mb-1">Observações</label>
                <textarea v-model="formData.observations" class="w-full p-2 rounded border border-gray-200 resize-none"
                  placeholder="Digite as observações" rows="5"></textarea>

                <button type="submit"
                  class="w-full bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors mt-4">
                  Salvar
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <label class="text-sm mb-1">Adicionar Imagens:</label>
            <div class="border border-dashed border-gray-300 rounded p-8 text-center">
              <div class="flex justify-center items-center">
                <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept="image/*"
                  class="hidden" />
                <button type="button" @click="$refs.fileInput.click()" class="flex items-center justify-center">
                  <i class="mdi mdi-download text-2xl"></i>
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-2">Clique para fazer upload das imagens</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'CadastroAnimal',
  components: {
    SideBar
  },
  data() {
    return {
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
        dtOngCadastro: new Date().toISOString().split('T')[0]
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files
      this.formData.images = [...files]
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
          idPorte: parseInt(this.formData.idPorte)
        }

        const token = localStorage.getItem('token')

        const response = await fetch('http://localhost:8000/api/cadastrarAnimais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
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
    clearForm() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = ''
      })
      this.formData.nrAnoNascimento = 2024
    }
  }
}
</script>
