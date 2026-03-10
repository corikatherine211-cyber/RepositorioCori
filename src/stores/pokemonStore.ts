import { defineStore } from "pinia"
import axios from "axios"

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [] as any[],
    gatos: [] as any[]
  }),

  actions: {
    async cargarPokemons() {
      const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
      this.pokemons = respuesta.data.results
    },

    async cargarGatos() {
      const respuesta = await axios.get("https://api.thecatapi.com/v1/images/search?limit=5")
      this.gatos = respuesta.data
    }
  }
})