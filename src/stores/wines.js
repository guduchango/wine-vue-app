import { defineStore } from 'pinia'

export const useWineStore = defineStore('wines', {
  state: () => ({
    wines: [
      { id: 1, name: "Malbec Reserva 2021", winery: "Catena Zapata", variety: "Malbec", vintage: 2021, country: "Mendoza, Argentina" },
      { id: 2, name: "Cabernet Sauvignon Gran Cuvée", winery: "Concha y Toro", variety: "Cabernet Sauvignon", vintage: 2020, country: "Maipo Valley, Chile" },
      { id: 3, name: "Pinot Noir Rosé", winery: "Bodegas Garzón", variety: "Pinot Noir", vintage: 2022, country: "Maldonado, Uruguay" },
      { id: 4, name: "Chardonnay Clásico", winery: "Trapiche", variety: "Chardonnay", vintage: 2021, country: "Mendoza, Argentina" },
      { id: 5, name: "Syrah Selección", winery: "Viña Montes", variety: "Syrah", vintage: 2019, country: "Colchagua Valley, Chile" },
      { id: 6, name: "Merlot Elegante", winery: "Doña Paula", variety: "Merlot", vintage: 2020, country: "Uco Valley, Argentina" },
      { id: 7, name: "Tempranillo Crianza", winery: "Marqués de Cáceres", variety: "Tempranillo", vintage: 2018, country: "Rioja, Spain" },
      { id: 8, name: "Sauvignon Blanc Fresco", winery: "Casillero del Diablo", variety: "Sauvignon Blanc", vintage: 2022, country: "Casablanca Valley, Chile" },
      { id: 9, name: "Bonarda Tradicional", winery: "Nieto Senetiner", variety: "Bonarda", vintage: 2020, country: "Mendoza, Argentina" },
      { id: 10, name: "Torrontés Aromático", winery: "El Esteco", variety: "Torrontés", vintage: 2023, country: "Salta, Argentina" },
      { id: 11, name: "Petit Verdot Intenso", winery: "Kaiken", variety: "Petit Verdot", vintage: 2019, country: "Mendoza, Argentina" },
      { id: 12, name: "Zinfandel Ruby", winery: "Ravenswood", variety: "Zinfandel", vintage: 2021, country: "California, USA" },
      { id: 13, name: "Garnacha Dulce", winery: "Torres", variety: "Garnacha", vintage: 2020, country: "Catalonia, Spain" },
      { id: 14, name: "Barbera Antico", winery: "Marchesi di Barolo", variety: "Barbera", vintage: 2018, country: "Piedmont, Italy" },
      { id: 15, name: "Carmenere Reserva Especial", winery: "Montes Alpha", variety: "Carmenere", vintage: 2020, country: "Colchagua Valley, Chile" },
      { id: 16, name: "Riesling Floral", winery: "Dr. Loosen", variety: "Riesling", vintage: 2022, country: "Mosel, Germany" },
      { id: 17, name: "Nebbiolo di Langhe", winery: "Gaja", variety: "Nebbiolo", vintage: 2019, country: "Langhe, Italy" },
      { id: 18, name: "Rosado Mediterráneo", winery: "Freixenet", variety: "Rosé Blend", vintage: 2023, country: "Catalonia, Spain" },
      { id: 19, name: "Cabernet Franc Silvestre", winery: "Zuccardi", variety: "Cabernet Franc", vintage: 2021, country: "Valle de Uco, Argentina" },
      { id: 20, name: "Grenache Rosé", winery: "Château Miraval", variety: "Grenache", vintage: 2022, country: "Provence, France" },
    ]
  }),
  persist: true,
  actions: {
    addWine(wine) {
      // evitar duplicados
      const exists = this.wines.some(w => w.name === wine.name && w.vintage === wine.vintage)
      if (!exists) this.wines.push({ ...wine })
    },
    selectWine(wine) {
      this.selectedWine = { ...wine }
    },
    updateWine(updatedWine) {
      const index = this.wines.findIndex(w => w.name === updatedWine.name && w.vintage === updatedWine.vintage)
      if (index !== -1) this.wines[index] = { ...updatedWine }
    }
  }
})