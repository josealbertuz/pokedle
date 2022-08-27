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
import {
  FLIP_ANIMATION_DELAY,
  MAX_TRIES,
  WIN_ANIMATION_DELAY,
} from "../../constants/pokedle";
import { usePokedle } from "../../hooks/use-pokedle";
import { Navbar } from "../../components/Navbar";
import { usePokedleDialogs } from "../../hooks/use-pokedle-dialogs";

type PokedleProps = {
  answer: string;
  pokemonNames: string[];
};

export const Pokedle = ({ answer, pokemonNames }: PokedleProps) => {
  const {
    letters,
    endGame,
    win,
    tries,
    pressedLetters,
    addLetter,
    removeLetter,
    checkAnswer,
    reset,
  } = usePokedle({
    answer,
    maxTries: MAX_TRIES,
    pokemonNames,
  });

  const { activeDialog, closeDialog, openHelpDialog, openStatisticsDialog } =
    usePokedleDialogs();

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

  const calculateFlipAnimationDelay = (index: number, seconds: number) =>
    index * seconds;

  const calculateWinAnimationDelay = ({
    totalLetters,
    index,
    flipAnimationDelay,
    delay,
  }: {
    totalLetters: number;
    index: number;
    flipAnimationDelay: number;
    delay: number;
  }) =>
    calculateFlipAnimationDelay(totalLetters, flipAnimationDelay) +
    delay * index;

  return (
    <PokedleRoot>
      <Navbar onHelpClick={openHelpDialog} onStatisticsClick={openHelpDialog} />
      <LettersContainer>
        <LettersGrid>
          {letters.map((lettersRow, rowIndex) => (
            <LettersRow key={`letters-row-${rowIndex}`}>
              {lettersRow.map(({ value, status, animate }, index, array) => (
                <Letter
                  key={`letter-${index}`}
                  value={value}
                  status={status}
                  animate={animate}
                  flipAnimationDelay={calculateFlipAnimationDelay(
                    index,
                    FLIP_ANIMATION_DELAY
                  )}
                  winAnimationDelay={calculateWinAnimationDelay({
                    totalLetters: array.length,
                    index,
                    flipAnimationDelay: FLIP_ANIMATION_DELAY,
                    delay: WIN_ANIMATION_DELAY,
                  })}
                  win={win && tries === rowIndex + 1}
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
