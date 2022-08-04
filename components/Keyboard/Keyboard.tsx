import { KEYS } from "../../constants/keyboard";
import { Key, KeyboardRoot, KeysRow } from "./Keyboard.styles";
import { KeyboardKeys, KeyboardKeysActions } from '../../models/keyboard';
import { Letter, LetterStatus } from "../../models/pokedle";
import { useMemo } from "react";

type KeyboardProps = {
  onKeyPress: (value: string) => void;
  pressedLetters: Letter[]
};

export const Keyboard = ({ onKeyPress, pressedLetters }: KeyboardProps) => {

  const mapLetters = useMemo(() =>
    pressedLetters.reduce(
      (pressed, { value, status }) => ({
        ...pressed,
        [value]: status,
      }),
      {} as { [key in KeyboardKeys]: LetterStatus }
    ), [pressedLetters]
  );

  const getKeyColor = (key: KeyboardKeys) => mapLetters[key]

  return (
    <KeyboardRoot>
      {KEYS.map((keysRow, rowIndex) => (
        <KeysRow key={`keysrow-${rowIndex}`}>
          {keysRow.map((value) => (
            <Key
              key={`key-${value}`}
              size={value === KeyboardKeysActions.SEND ? 'large' : 'small'}
              onClick={() => onKeyPress(value)}
              color={getKeyColor(value)}
            >
              {value}
            </Key>
          ))}
        </KeysRow>
      ))}
    </KeyboardRoot>
  );
};
