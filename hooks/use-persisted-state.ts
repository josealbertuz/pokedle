import { useState, useCallback } from 'react';

const getItemFromLocalStorage = <T>(key: string, fallback: T) => {
  const item = localStorage.getItem(key);

  if (!item){
    localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }

  return (JSON.parse(item) as T);
};

type PersistedState<T> = [T, (newState: T) => void]

export const usePersistedState = <T>(
  key: string,
  initialState: T
): PersistedState<T> => {

  const [state, setState] = useState(() =>
    getItemFromLocalStorage(key, initialState)
  );

  const setLocalStorageState = useCallback((newState: T) => {
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }, [key])

  return [state, setLocalStorageState];
};
