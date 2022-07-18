import { Letter, LetterStatus } from "../models/pokedle";

export const getRandomItemFromArray = <T>(array: T[]) =>
  array[Math.ceil(Math.random() * array.length)];

export const getRandomPokemonName = (
  pokemonNames: string[],
  maxLength: number
): string => {
  const pokemonName = getRandomItemFromArray(pokemonNames);

  if (pokemonName.length === maxLength) return pokemonName;

  const filteredPokemonNames = pokemonNames.filter(
    (pokemon) => pokemon !== pokemonName
  );

  return getRandomPokemonName(filteredPokemonNames, maxLength);
};

export const generateLetters = (
  pokemonNameLength: number,
  tries: number
): Letter[][] =>
  Array.from<Letter[]>({ length: tries }).map(() =>
    Array.from<Letter>({ length: pokemonNameLength }).fill({
      value: "",
      status: LetterStatus.EMPTY,
      animate: false,
    })
  );

export const createWrapperElementAndAppendToBody = (id: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', id)
  document.body.appendChild(wrapperElement)
  return wrapperElement
};
