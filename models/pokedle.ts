export enum LetterStatus {
  NOT_CHECKED = "NOT_CHECKED",
  CORRECT = "CORRECT",
  NOT_PRESENT = "NOT_PRESENT",
  PRESENT = "PRESENT",
}

export enum LetterEmoji {
  CORRECT = '🟩',
  PRESENT = '🟨',
  NOT_PRESENT = '⬜️',
  NOT_CHECKED = '❌'
}

export const MapLetterStatusToEmoji: Record<LetterStatus, LetterEmoji> = {
  [LetterStatus.CORRECT]: LetterEmoji.CORRECT,
  [LetterStatus.NOT_PRESENT]: LetterEmoji.NOT_PRESENT,
  [LetterStatus.PRESENT]: LetterEmoji.PRESENT,
  [LetterStatus.NOT_CHECKED]: LetterEmoji.NOT_CHECKED
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
  isPokemon: (letters: Letter[], pokemonNames: string[]): boolean => {
    const pokemonGuess = letters.map(letter => letter.value).join('')

    return pokemonNames.includes(pokemonGuess)
  },
  generateEmojis: (letters: Letter[][]) => letters.map(word => {
    return word.map(({status}) => MapLetterStatusToEmoji[status]).join('').concat('\n')
   }).join('').slice(0, -1)
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
  getWordFromARow: (letters: Letter[][], rowIndex: number) => {
    console.log(letters[rowIndex])
    return letters[rowIndex].map((letter) => letter.value).join("");
  },
  getWordsFromMatrix: (letters: Letter[][]) =>
    letters
      .map((lettersRow) => lettersRow.map((letter) => letter.value).join(""))
      .filter(Boolean),
};
