import { KeyboardKeys } from "../models/keyboard";

export const FLATTEN_KEYS = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "SEND",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACK",
] as const;

export const KEYS: KeyboardKeys[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["SEND", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

