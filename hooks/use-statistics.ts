import { useCallback, useMemo } from "react";
import {
  Letter,
  Statistics,
  StoredStatistics,
  StoredStatisticsSchema,
} from "../models/pokedle";
import { usePersistedState } from "./use-persisted-state";

const initialState: StoredStatistics = {
  currentStreak: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  fail: 0,
  maxStreak: 0,
};

type StatisticsState = [Statistics, (letters: Letter[][]) => void];

export const useStatistics = (): StatisticsState => {
  const [storedStatistics, setStoredStatistics] =
    usePersistedState<StoredStatistics>("statistics", initialState);

  const statistics = useMemo(() => {
    const { success } = StoredStatisticsSchema.safeParse(storedStatistics);

    return Statistics.generateFromStorage(
      success ? storedStatistics : initialState
    );
  }, [storedStatistics]);

  const setStatistics = useCallback(
    (letters: Letter[][]) => {
      setStoredStatistics(
        Statistics.generateFromLetters(storedStatistics, letters)
      );
    },
    [setStoredStatistics, storedStatistics]
  );

  return [statistics, setStatistics];
};
