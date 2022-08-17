import {
  PokedleRoot,
  LettersContainer,
  Title,
  LettersGrid,
  LettersRow,
} from "./Pokedle.styles";
import { Keyboard } from "../../components/Keyboard";
import { Letter } from "../../components/Letter";
import { KeyboardKeysActions } from "../../models/keyboard";
import { FLIP_ANIMATION_DELAY, MAX_TRIES } from "../../constants/pokedle";
import { usePokedle } from "../../hooks/use-pokedle";

type PokedleProps = {
  answer: string;
  pokemonNames: string[];
};

export const Pokedle = ({ answer, pokemonNames }: PokedleProps) => {
  const { letters, endGame, pressedLetters, addLetter, removeLetter, checkAnswer, reset } =
    usePokedle({
      answer,
      maxTries: MAX_TRIES,
      pokemonNames,
    });

  const onKeyPress = (value: string) => {
    if (value === KeyboardKeysActions.BACKSPACE) {
      removeLetter();
      return;
    }

    if (value === KeyboardKeysActions.ENTER) {
      checkAnswer();
      return;
    }

    addLetter(value);
  };

  const calculateAnimationDelay = (index: number, ms: number) => index * ms;

  return (
    <PokedleRoot>
      <Title>Pokedle</Title>
      <LettersContainer>
        <LettersGrid>
          {letters.map((lettersRow, rowIndex) => (
            <LettersRow key={`letters-row-${rowIndex}`}>
              {lettersRow.map(({ value, status, animate }, index) => (
                <Letter
                  key={`letter-${index}`}
                  value={value}
                  status={status}
                  animate={animate}
                  animationDelay={calculateAnimationDelay(
                    index,
                    FLIP_ANIMATION_DELAY
                  )}
                />
              ))}
            </LettersRow>
          ))}
        </LettersGrid>
        {endGame && <button onClick={() => reset()}>Reset</button>}
      </LettersContainer>
      <Keyboard onKeyPress={onKeyPress} pressedLetters={pressedLetters} />
    </PokedleRoot>
  );
};
