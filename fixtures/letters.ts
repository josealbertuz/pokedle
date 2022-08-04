import { Letter, LetterStatus } from "../models/pokedle";

export const createLettersArrayFixture = (): Letter[] => [
  {
    value: "P",
    status: LetterStatus.CORRECT,
  },
  {
    value: "O",
    status: LetterStatus.NOT_PRESENT,
  },
  {
    value: "K",
    status: LetterStatus.CORRECT,
  },
  {
    value: "I",
    status: LetterStatus.PRESENT,
  },
  {
    value: "C",
    status: LetterStatus.CORRECT,
  },
  {
    value: "H",
    status: LetterStatus.CORRECT,
  },
  {
    value: "A",
    status: LetterStatus.PRESENT,
  },
];
