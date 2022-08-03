import { useState, useEffect } from 'react';
import {
  PokedleRoot,
  LettersContainer,
  Title,
  LettersGrid,
  LettersRow,
} from "./Pokedle.styles";
import { areWordsFromLocalStorageValid, generateLetters, generateLettersFromLocalStorage } from '../../utils/utils';
import { LettersMatrix, LetterStatus } from "../../models/pokedle";
import { Keyboard } from "../../components/Keyboard";
import { Letter } from "../../components/Letter";
import { KeyboardKeysActions } from '../../models/keyboard';

type PokedleProps = {
  answer: string
  pokemonNames: string[];
};

const MAX_TRIES = 6;
const FLIP_ANIMATION_DELAY = 100

export const Pokedle = ({ answer, pokemonNames }: PokedleProps) => {
  const pokemonNameLength = answer.length;

  const [letters, setLetters] = useState(
    generateLetters(pokemonNameLength, MAX_TRIES)
  );
  const [tries, setTries] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [win, setWin] = useState(false)

  const loose = !win && tries === MAX_TRIES
  const endGame = loose || win

  const addLetter = (value: string) => {
    if (pokemonNameLength === currentLetterIndex) return;

    const newLetters = LettersMatrix.changeLetter(
      letters,
      {
        value,
        status: LetterStatus.HAS_LETTER,
      },
      {
        row: tries,
        column: currentLetterIndex,
      }
    );

    setLetters(newLetters);
    setCurrentLetterIndex(currentLetterIndex + 1);
  };

  const removeLetter = () => {
    if (currentLetterIndex === 0) return;

    const newLetters = LettersMatrix.changeLetter(
      letters,
      {
        value: "",
        status: LetterStatus.EMPTY,
      },
      {
        row: tries,
        column: currentLetterIndex - 1,
      }
    );

    setLetters(newLetters);
    setCurrentLetterIndex(currentLetterIndex - 1);
  };

  const checkAnswer = () => {

    if (letters[tries][pokemonNameLength - 1].value === '') return

    const newLetters = LettersMatrix.checkLetters(letters, tries, answer);
    
    setLetters(newLetters);
    setTries(tries + 1);
    setCurrentLetterIndex(0);
  };

  const onKeyPress = (value: string) => {
    if (value === KeyboardKeysActions.BACK) {
      removeLetter();
      return;
    }

    if (value === KeyboardKeysActions.SEND) {
      checkAnswer();
      return;
    }

    addLetter(value);
  };

  const reset = () => {
    setLetters(generateLetters(pokemonNameLength, MAX_TRIES))
    setTries(0)
    setCurrentLetterIndex(0)
  }

  const calculateAnimationDelay = (index: number, ms: number) => index * ms

  useEffect(() => {
    const wordLength = LettersMatrix.getWordFromARow(letters, tries).length
    if (wordLength !== answer.length) return

    const words = LettersMatrix.getWordsFromMatrix(letters)
    localStorage.setItem('words', JSON.stringify(words))
  }, [letters, answer, tries])

  useEffect(() => {
    const words = JSON.parse(localStorage.getItem('words') ?? '[]')

    if (!words || !areWordsFromLocalStorageValid(words, answer.length)) return;
    
    const letters = generateLettersFromLocalStorage(words, answer)
    const tries = words.filter(Boolean).length
    setLetters(letters)
    setWin(LettersMatrix.win(letters[tries - 1], answer))
    setTries(tries)
  }, [answer])

  return (
    <PokedleRoot>
      <Title>Pokedle</Title>
      <LettersContainer>
        <LettersGrid>
          {letters.map((lettersRow, rowIndex) => (
            <LettersRow key={`letters-row-${rowIndex}`}>
              {lettersRow.map(({value, status, animate}, index) => (
                <Letter
                  key={`letter-${index}`}
                  value={value}
                  status={status}
                  animate={animate}
                  animationDelay={calculateAnimationDelay(index, FLIP_ANIMATION_DELAY)}
                />
              ))}
            </LettersRow>
          ))}
        </LettersGrid>
        {endGame && <button onClick={() => reset()}>Reset</button>}
      </LettersContainer>
      <Keyboard onKeyPress={onKeyPress} />
    </PokedleRoot>
  );
};
