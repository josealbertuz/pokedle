import { Key, KeyboardRoot, KeysRow } from "./Keyboard.styles";
import { KeyboardKeysActions, Keys } from '../../models/keyboard';
import { Letter, LetterStatus } from "../../models/pokedle";
import { useMemo } from "react";
import { useEventListener } from '../../hooks/use-event-listener';
import { KEYS, KEYS_ARRAY } from '../../constants/keyboard';

type KeyboardProps = {
  onKeyPress: (value: string) => void;
  pressedLetters: Letter[]
};

export const Keyboard = ({ onKeyPress, pressedLetters }: KeyboardProps) => {

  useEventListener('keydown', ({key}) => {
    const uppercaseKey = key.toUpperCase()

    if (!KEYS_ARRAY.includes(uppercaseKey)) return

    onKeyPress(uppercaseKey)
  })

  const mapLettersToColor = useMemo(() =>
    pressedLetters.reduce(
      (pressed, { value, status }) => ({
        ...pressed,
        [value]: status,
      }),
      {} as { [key in Keys]: LetterStatus }
    ), [pressedLetters]
  );

  const getKeyColor = (key: Keys) => mapLettersToColor[key]

  return (
    <KeyboardRoot>
      {KEYS.map((keysRow, rowIndex) => (
        <KeysRow key={`keysrow-${rowIndex}`}>
          {keysRow.map(({label, value}) => (
            <Key
              key={`key-${value}`}
              size={label === KeyboardKeysActions.ENTER ? 'large' : 'small'}
              onClick={() => onKeyPress(value)}
              color={getKeyColor(value)}
            >
              {label}
            </Key>
          ))}
        </KeysRow>
      ))}
    </KeyboardRoot>
  );
};
