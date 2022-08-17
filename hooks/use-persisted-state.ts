import { useState, useCallback, useEffect } from 'react';

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

  const [state, setState] = useState<T>(initialState);

  const setLocalStorageState = useCallback((newState: T) => {
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }, [])

  useEffect(() => {
    setState(getItemFromLocalStorage(key, initialState));
  }, [])

  return [state, setLocalStorageState];
};
