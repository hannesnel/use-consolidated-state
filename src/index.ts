import { useState } from "react";

type ConsolidatedState<T, R = Required<T>> = {
  [P in keyof R as `set${Capitalize<string & P>}`]: (value: R[P] | ((state: R[P]) => R[P])) => void;
} & {
  setState: (state: Partial<T> | ((state: T) => T)) => void;
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
            if (typeof value === 'function') {
              return {
                ...prev,
                [key]: value(prev[key])
              }
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

  const setState = (state: Partial<T> | ((state: T) => T)) => {
    if (typeof state === 'function') {
      setConsolidatedState((prev) => ({
        ...prev,
        ...state(prev)
      }))
    }
    setConsolidatedState((prev) => ({
      ...prev,
      ...state,
    }));
  };

  return {
    ...consolidatedState,
    ...setters,
    setState,
  };
}
