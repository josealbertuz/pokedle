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
  checkLetters: (letters: Letter[][], tries: number, pokemonName: string) =>
    letters.map((lettersRow, rowIndex) => {
      if (rowIndex !== tries) return lettersRow;

      return lettersRow.map(({ value }, columnIndex) => {
        if (pokemonName[columnIndex] === value)
          return {
            value,
            status: LetterStatus.CORRECT,
          };

        if (pokemonName.includes(value))
          return {
            value,
            status: LetterStatus.PRESENT,
          };

        return {
          value,
          status: LetterStatus.NOT_PRESENT,
        };
      });
    }),
};
