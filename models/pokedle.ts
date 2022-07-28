export enum LetterStatus {
  EMPTY = "EMTPY",
  HAS_LETTER = "HAS_LETTER",
  CORRECT = "CORRECT",
  NOT_PRESENT = "NOT_PRESENT",
  PRESENT = "PRESENT",
}

export type Letter = {
  value: string;
  status: LetterStatus;
  animate?: boolean;
};

type MatrixPosition = {
  row: number;
  column: number;
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
    letters.map((lettersRow) =>
      lettersRow.map((letter) => letter.value).join("")
    ),
};
