import { useState } from "react";

type ConsolidatedState<T> = {
  [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
} & {
  setState: (state: Partial<T>) => void;
} & T;

export default function useConsolidatedState<T extends Record<string, any>>(
  initialState: T
): ConsolidatedState<T> {
  const [consolidatedState, setConsolidatedState] = useState<T>(initialState);

  function functionCase(key: string) {
    return "set" + key[0].toUpperCase() + key.slice(1);
  }

  const setters = Object.keys(consolidatedState).reduce<ConsolidatedState<T>>(
    (acc, key) => {
      return {
        ...acc,
        [functionCase(key)]: (value: any) =>
          setConsolidatedState((prev) => {
            if (prev[key] === value) {
              return prev;
            }
            return {
              ...prev,
              [key]: value,
            };
          }),
      };
    },
    {} as ConsolidatedState<T>
  );

  const setState = (state: Partial<T>) =>
    setConsolidatedState((prev) => ({
      ...prev,
      ...state,
    }));

  return {
    ...consolidatedState,
    ...setters,
    setState,
  };
}
