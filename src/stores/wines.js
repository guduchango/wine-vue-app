// stores/wines.js
import { defineStore } from 'pinia'
import api from '../services/api' // axios con token preconfigurado

export const useWineStore = defineStore('wines', {
  state: () => ({
    wines: [],
    selectedWine: null,
  }),

  persist: true,

  actions: {
    async fetchWines() {
      try {
        const response = await api.get('/wines') // Laravel route: api/wines
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
      this.selectedWine = { ...wine }
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
    }
  }
})
