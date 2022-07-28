import { Letter, Letters, LetterStatus } from "../models/pokedle";

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

export const generateLettersFromLocalStorage = (words: string[], answer: string): Letter[][] => {
  return Array.from({length: words.length}).map((_, rowIndex) => {
    const word = words[rowIndex]
    
    if (word) return word.split('').map((letter, index) => Letters.checkLetter({letter, index, answer}))

    return Array.from<Letter>({length: answer.length}).fill({
      value: "",
      status: LetterStatus.EMPTY,
      animate: false,
    })
  })
}

export const createWrapperElementAndAppendToBody = (id: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', id)
  document.body.appendChild(wrapperElement)
  return wrapperElement
};
