import { z } from "zod";

export enum LetterStatus {
  NOT_CHECKED = "NOT_CHECKED",
  CORRECT = "CORRECT",
  NOT_PRESENT = "NOT_PRESENT",
  PRESENT = "PRESENT",
}

export enum LetterEmoji {
  CORRECT = "🟩",
  PRESENT = "🟨",
  NOT_PRESENT = "⬜️",
  NOT_CHECKED = "❌",
}

export const MapLetterStatusToEmoji: Record<LetterStatus, LetterEmoji> = {
  [LetterStatus.CORRECT]: LetterEmoji.CORRECT,
  [LetterStatus.NOT_PRESENT]: LetterEmoji.NOT_PRESENT,
  [LetterStatus.PRESENT]: LetterEmoji.PRESENT,
  [LetterStatus.NOT_CHECKED]: LetterEmoji.NOT_CHECKED,
};

export const StoredStatisticsSchema = z.object({
  currentStreak: z.number().nonnegative(),
  guesses: z.record(z.union([z.string(), z.number()]), z.number().nonnegative()),
  fail: z.number().nonnegative(),
  maxStreak: z.number().nonnegative(),
});

export type StoredStatistics = z.infer<typeof StoredStatisticsSchema>

export type Statistics = {
  gamesPlayed: number,
  victoryPercentage: number,
  currentStreak: number,
  maxStreak: number,
  failsPercentage: number,
  guessesPercentages: {
    [key: number]: number;
  };
};

export const Statistics = {
  generateFromLetters: (
    statistics: StoredStatistics,
    letters: Letter[][]
  ): StoredStatistics => {
    const winTry =
      letters.findIndex((lettersRow) =>
        lettersRow.every(({ status }) => status === LetterStatus.CORRECT)
      ) + 1;

    const loose = winTry === 0;

    return {
      ...statistics,
      currentStreak: !loose ? statistics.currentStreak + 1 : 0,
      fail: !loose ? statistics.fail : statistics.fail + 1,
      maxStreak: loose ? statistics.currentStreak : statistics.maxStreak + 1,
      ...(!loose && {
        guesses: {
          ...statistics.guesses,
          [winTry]: statistics.guesses[winTry] + 1,
        },
      }),
    };
  },
  totalVictories: (storedStatistics: StoredStatistics) =>
    Object.values(storedStatistics.guesses).reduce(
      (sum, currentValue) => sum + currentValue,
      0
    ),
  totalGamesPlayed: (storedStatistics: StoredStatistics) =>
    Statistics.totalVictories(storedStatistics) + storedStatistics.fail,
  victoryPercentage: (storedStatistics: StoredStatistics) =>
    Math.ceil(
      (Statistics.totalVictories(storedStatistics) /
        Statistics.totalGamesPlayed(storedStatistics)) *
        100
    ) || 0,
  failPercentage: (storedStatistics: StoredStatistics) =>
    Math.ceil(
      (storedStatistics.fail / Statistics.totalGamesPlayed(storedStatistics)) *
        100
    ) || 0,
  guessPercentage: (storedStatistics: StoredStatistics, guess: number) =>
    Math.ceil(
      (storedStatistics.guesses[guess] /
        Statistics.totalGamesPlayed(storedStatistics)) *
        100
    ) || 0,
  guessesPercentajes: (
    storedStatistics: StoredStatistics
  ): Pick<Statistics, "guessesPercentages"> =>
    Object.keys(storedStatistics.guesses).reduce(
      (percentages, key) => ({
        ...percentages,
        [key]: Statistics.guessPercentage(storedStatistics, Number(key)),
      }),
      {} as Pick<Statistics, "guessesPercentages">
    ),
  generateFromStorage: (storedStatistics: StoredStatistics): Statistics => ({
    gamesPlayed: Statistics.totalGamesPlayed(storedStatistics),
    victoryPercentage: Statistics.victoryPercentage(storedStatistics),
    currentStreak: storedStatistics.currentStreak,
    maxStreak: storedStatistics.maxStreak,
    failsPercentage: Statistics.failPercentage(storedStatistics),
    guessesPercentages: Statistics.guessesPercentajes(storedStatistics),
  }),
  emojiPercentage: (percentage: number) => {
    if (!percentage) return ''

    const numberOfEmojis = Math.floor(percentage / 10)

    return Array.from({length: numberOfEmojis}).fill('⬛️').join(' ')
  }
};

export type Letter = {
  value: string;
  status: LetterStatus;
  animate?: boolean;
};

type CheckLetterParams = {
  letter: string;
  answer: string;
  index: number;
};

export const Letters = {
  checkLetter: ({ letter, answer, index }: CheckLetterParams): Letter => {
    if (answer[index] === letter)
      return {
        value: letter,
        status: LetterStatus.CORRECT,
        animate: true,
      };

    if (answer.includes(letter))
      return {
        value: letter,
        status: LetterStatus.PRESENT,
        animate: true,
      };

    return {
      value: letter,
      status: LetterStatus.NOT_PRESENT,
      animate: true,
    };
  },
  isPokemon: (letters: Letter[], pokemonNames: string[]): boolean => {
    const pokemonGuess = letters.map((letter) => letter.value).join("");

    return pokemonNames.includes(pokemonGuess);
  },
  generateEmojis: (letters: Letter[][]) =>
    letters
      .map((word) => {
        return word
          .map(({ status }) => MapLetterStatusToEmoji[status])
          .join("")
          .concat("\n");
      })
      .join("")
      .slice(0, -1),
};

type MatrixPosition = {
  row: number;
  column: number;
};

export const LettersMatrix = {
  changeLetter: (
    letters: Letter[][],
    newLetter: Letter,
    { row, column }: MatrixPosition
  ) =>
    letters.map((lettersRow, rowIndex) => {
      if (rowIndex !== row) return lettersRow;

      return lettersRow.map((letter, index) => {
        if (index !== column) return letter;

        return newLetter;
      });
    }),
  checkLetters: (letters: Letter[][], tries: number, answer: string) =>
    letters.map((lettersRow, rowIndex) => {
      if (rowIndex !== tries) return lettersRow;

      return lettersRow.map(({ value: letter }, columnIndex) => {
        return Letters.checkLetter({ letter, answer, index: columnIndex });
      });
    }),
  win: (letters: Letter[], pokemonName: string) => {
    const userAnswer = letters.map(({ value }) => value).join("");

    const isAnswerCorrect = letters.every(
      ({ status }) => status === LetterStatus.CORRECT
    );

    return userAnswer === pokemonName && isAnswerCorrect;
  },
  getWordFromARow: (letters: Letter[][], rowIndex: number) =>
    letters[rowIndex].map((letter) => letter.value).join(""),
  getWordsFromMatrix: (letters: Letter[][]) =>
    letters
      .map((lettersRow) => lettersRow.map((letter) => letter.value).join(""))
      .filter(Boolean),
};
