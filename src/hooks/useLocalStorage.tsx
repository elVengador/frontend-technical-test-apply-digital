import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type useLocalStorageProps<T> = { key: string; initialValue?: T };

export const useLocalStorage = <T extends Record<string, any>>({
  initialValue = {} as T,
  key,
}: useLocalStorageProps<T>): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue: Dispatch<SetStateAction<T>> = (props) => {
    try {
      setStoredValue((p) => {
        const value =
          typeof props === "function" ? (props as Function)(p) : props;
        localStorage.setItem(key, JSON.stringify(value));
        return value;
      });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
};
