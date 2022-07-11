declare type ConsolidatedState<T> = {
    [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
} & {
    setState: (state: Partial<T>) => void;
} & T;
export default function useConsolidatedState<T>(initialState: T): ConsolidatedState<T>;
export {};
//# sourceMappingURL=index.d.ts.map