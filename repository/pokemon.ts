import axios from "axios";
import { PokemonPaginatedResponse } from "../models/pokemon"

const pokemonClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export const PokemonRepository = {
  getAllPokemonNames: async (): Promise<string[]> => {
    const { data } = await pokemonClient.get<PokemonPaginatedResponse>(
      `?limit=${Number.MAX_SAFE_INTEGER}`
    );

    return data.results.map(pokemon => pokemon.name.toUpperCase())
  },
};
