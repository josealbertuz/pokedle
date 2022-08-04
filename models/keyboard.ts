import { FLATTEN_KEYS } from "../constants/keyboard"

export enum KeyboardKeysActions {
    BACK = 'BACK',
    SEND = 'SEND',
    LETTER = 'LETTER'
}

export type KeyboardKeys = typeof FLATTEN_KEYS[number]

