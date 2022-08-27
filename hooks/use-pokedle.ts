import { useEffect, useState } from "react";
import {
  Letter,
  Letters,
  LettersMatrix,
  LetterStatus,
  Statistics,
} from "../models/pokedle";
import {
  generateLetters,
  generateLettersFromLocalStorage,
} from "../utils/utils";
import { useStatistics } from "./use-statistics";
import { useWords } from "./use-words";

type PokedleParams = {
  answer: string;
  maxTries: number;
  pokemonNames: string[];
};

type PokedleState = {
  letters: Letter[][];
  endGame: boolean;
  win: boolean;
  loose: boolean;
  tries: number;
  statistics: Statistics
  addLetter: (value: string) => void;
  removeLetter: () => void;
  checkAnswer: () => void;
  reset: () => void;
};

export const usePokedle = ({
  answer,
  maxTries,
  pokemonNames,
}: PokedleParams): PokedleState => {
  const [words, setWords] = useWords(answer);
  const [letters, setLetters] = useState(() =>
    generateLetters(answer.length, maxTries)
  );
  const [tries, setTries] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [win, setWin] = useState(false);
  const [statistics, setStatistics] = useStatistics();

  const loose = !win && tries === maxTries;
  const endGame = loose || win;

  useEffect(() => {
    if (!words.length) return;

    const letters = generateLettersFromLocalStorage(words, answer, maxTries);
    const tries = words.length;
    setLetters(letters);
    setWin(LettersMatrix.win(letters[tries - 1], answer));
    setTries(tries);
  }, [answer, maxTries, words]);

  const addLetter = (value: string) => {
    if (answer.length === currentLetterIndex) return;

    const newLetters = LettersMatrix.changeLetter(
      letters,
      {
        value,
        status: LetterStatus.NOT_CHECKED,
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
        status: LetterStatus.NOT_CHECKED,
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
    if (endGame) return;

    const rowHasAllLetters = letters[tries][answer.length - 1].value !== "";
    const isPokemon = Letters.isPokemon(letters[tries], pokemonNames);

    if (!rowHasAllLetters || !isPokemon) return;

    const newLetters = LettersMatrix.checkLetters(letters, tries, answer);
    const word = LettersMatrix.getWordFromARow(letters, tries);
    const win = LettersMatrix.win(newLetters[tries], answer);

    if (win) setStatistics(newLetters);

    setWords([...words, word]);
    setLetters(newLetters);
    setTries(tries + 1);
    setWin(win);
    setCurrentLetterIndex(0);
  };

  const reset = () => {
    setLetters(generateLetters(answer.length, maxTries));
    setTries(0);
    setCurrentLetterIndex(0);
    setWin(false);
    setWords([]);
  };

  return {
    letters,
    endGame,
    win,
    loose,
    statistics,
    tries,
    addLetter,
    removeLetter,
    checkAnswer,
    reset,
  };
};
