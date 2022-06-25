import { MAX_POKEMON_ID } from '../constants/pokemon';

export const generatePokemonId = () => Math.ceil(Math.random() * MAX_POKEMON_ID)
