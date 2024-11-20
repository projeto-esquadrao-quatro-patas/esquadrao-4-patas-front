<template>
    <div class="flex">
      <SideBar />
      
      <div class="flex-1 p-8 ml-[200px]">
        <div class="max-w-6xl">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl">Animais Cadastrados</h1>
            <div class="flex gap-4">
              <input 
                type="text"
                v-model="searchTerm"
                placeholder="Buscar animal..."
                class="p-2 border rounded"
              />
            </div>
          </div>
  
          <div v-if="loading" class="text-center py-4">
            Carregando...
          </div>
  
          <div v-else-if="error" class="text-red-500 text-center py-4">
            {{ error }}
          </div>
  
          <div v-else class="grid gap-4">
            <table class="min-w-full bg-white border">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-3 text-left">ID</th>
                  <th class="p-3 text-left">Chip</th>
                  <th class="p-3 text-left">Nome</th>
                  <th class="p-3 text-left">Sexo</th>
                  <th class="p-3 text-left">Tutor</th>
                  <th class="p-3 text-left">Cor</th>
                  <th class="p-3 text-left">Porte</th>
                  <th class="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="animal in filteredAnimals" :key="animal.idAnimal" class="border-t">
                  <td class="p-3">{{ animal.idAnimal }}</td>
                  <td class="p-3">{{ animal.nrChip }}</td>
                  <td class="p-3">{{ animal.nmAnimal }}</td>
                  <td class="p-3">{{ formatSexo(animal.sxAnimal) }}</td>
                  <td class="p-3">{{ animal.nmTutor }}</td>
                  <td class="p-3">{{ getCor(animal.idCor) }}</td>
                  <td class="p-3">{{ getPorte(animal.idPorte) }}</td>
                  <td class="p-3">
                    <button class="text-blue-500 mr-2">Editar</button>
                    <button @click="deleteAnimal(animal.idAnimal)" class="text-red-500">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from '@/components/SideBar.vue'
  
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
      async deleteAnimal(id) {
        if (!confirm('Tem certeza que deseja deletar este animal?')) return;
        
        try {
          // const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:8000/api/animais/${id}`, {
            method: 'DELETE',
            headers: {
              // 'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          
          if (!response.ok) throw new Error('Erro ao deletar animal');
          
          this.animals = this.animals.filter(animal => animal.idAnimal !== id);
          alert('Animal deletado com sucesso');
        } catch (error) {
          alert(error.message);
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
          // const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:8000/api/animais', {
            headers: {
              // 'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
          
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
  