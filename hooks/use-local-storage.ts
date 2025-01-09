"use client";
import { useState } from "react";

export function useLocalStorage<TData>({
  key,
  initialValue,
  dataValidator,
}: {
  key: string;
  initialValue: TData;
  dataValidator?: (data: unknown) => boolean;
}) {
  const [storedValue, setStoredValue] = useState<TData>(() => {
    try {
      const item = window.localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      if (dataValidator && !dataValidator(parsed)) {
        console.error(`Invalid data in localStorage for key: ${key}`);
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (value: TData) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}
