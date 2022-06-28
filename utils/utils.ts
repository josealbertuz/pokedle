import { MAX_POKEMON_ID } from "../constants/pokemon";
import { Letter, LetterStatus } from "../models/pokedle";

export const generatePokemonId = () =>
  Math.ceil(Math.random() * MAX_POKEMON_ID);

export const generateLetters = (
  pokemonNameLength: number,
  tries: number
): Letter[][] =>
  Array.from<Letter[]>({ length: tries }).map(() => Array.from<Letter>({length: pokemonNameLength}).fill({
    value: '',
    status: LetterStatus.EMPTY
  }));
