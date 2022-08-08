import { KEYS_ARRAY } from '../constants/keyboard';

export type Keys = typeof KEYS_ARRAY[number]

export type KeboardKey = {
  label: string;
  value: Keys;
};

export type KeyboardKeys = KeboardKey[][];

export enum KeyboardKeysActions {
  BACKSPACE = "BACKSPACE",
  ENTER = "ENTER",
  LETTER = "LETTER",
}
