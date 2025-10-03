import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type useLocalStorageProps = { key: string; initialValue?: string };

export const useLocalStorage = ({
  key,
  initialValue = "",
}: useLocalStorageProps): [string, Dispatch<SetStateAction<string>>] => {
  const [storedValue, setStoredValue] = useState<string>(initialValue);

  const setValue: Dispatch<SetStateAction<string>> = (props) => {
    try {
      setStoredValue((p) => {
        const value = typeof props === "function" ? props(p) : props;
        localStorage.setItem(key, value);
        return value;
      });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    setStoredValue(localStorage.getItem(key) ?? initialValue);
  }, [initialValue, key]);

  return [storedValue, setValue];
};
