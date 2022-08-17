import { areWordsFromLocalStorageValid } from "../utils/utils";
import { usePersistedState } from "./use-persisted-state";

type WordsState = [string[], (newState: string[]) => void];

export const useWords = (answer: string): WordsState => {
  const [words, setWords] = usePersistedState<string[]>("words", []);

  const validatedWords =
    areWordsFromLocalStorageValid(words, answer.length)
      ? words
      : [];

  return [validatedWords, setWords];
};
