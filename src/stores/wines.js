// stores/wines.js
import { defineStore } from 'pinia'
import api from '../services/api'

export const useWineStore = defineStore('wines', {
  state: () => ({
    wines: [],
    selectedWine: null,
  }),

  persist: {
    paths: ['wines', 'selectedWine'],
  },

  actions: {
    async fetchWines({ force = false } = {}) {
      if (this.wines.length > 0 && !force) {
        // Ya hay datos, no volver a llamar a la API
        return
      }

      try {
        const response = await api.get('/wines')
        console.log('Fetched wines:', response.data)
        this.wines = response.data
      } catch (error) {
        console.error('Failed to fetch wines:', error)
        throw error
      }
    },

    async addWine(wine) {
      try {
        const response = await api.post('/wines', wine)
        this.wines.push(response.data)
      } catch (error) {
        console.error('Error adding wine:', error)
        throw error
      }
    },

    selectWine(wine) {
      this.selectedWine = wine ? { ...wine } : null
    },

    async updateWine(updatedWine) {
      try {
        const response = await api.put(`/wines/${updatedWine.id}`, updatedWine)
        const index = this.wines.findIndex(w => w.id === updatedWine.id)
        if (index !== -1) this.wines[index] = response.data
      } catch (error) {
        console.error('Error updating wine:', error)
        throw error
      }
    },

    async deleteWine(id) {
      try {
        await api.delete(`/wines/${id}`)
        this.wines = this.wines.filter(w => w.id !== id)
      } catch (error) {
        console.error('Error deleting wine:', error)
        throw error
      }
    },
    setSelectedWine(wine) {
      this.selectedWine = wine
    },
    clearSelectedWine() {
      this.selectedWine = null
    }
  }
})
