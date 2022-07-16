import { KEYS } from "../../constants/keyboard";
import { Key, KeyboardRoot, KeysRow } from "./Keyboard.styles";
import { KeyboardKeysActions } from '../../models/keyboard';

type KeyboardProps = {
  onKeyPress: (value: string) => void;
};

export const Keyboard = ({ onKeyPress }: KeyboardProps) => {
  return (
    <KeyboardRoot>
      {KEYS.map((keysRow, rowIndex) => (
        <KeysRow key={`keysrow-${rowIndex}`}>
          {keysRow.map((value) => (
            <Key
              key={`key-${value}`}
              css={value === KeyboardKeysActions.SEND ? { flex: 2 } : {}}
              onClick={() => onKeyPress(value)}
            >
              {value}
            </Key>
          ))}
        </KeysRow>
      ))}
    </KeyboardRoot>
  );
};
