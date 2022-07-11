# use-consolidated-state
A state hook which combines multiple states into a single object with explicit setters and values for each of the values tracked in the object.

## Motivation
Often in a component we want to track more than one value as state, which leads us to multiple lines like this:
```typescript
const [someState, setSomeState] = useState();
const [anotherState, setAnotherState] = useState();
const [lastState, setLastState] = useState();
```
To organize the state a bit better, it's good to create an object which will track all of the state values in one:
```typescript
interface State {
  some: string;
  another: string;
  last: string;
}

const [state, setState] = useState<State>

const setSomeState = (value) => setState((previous) => ({
  ...previous,
  some: value
}));

const setAnotherState = (value) => setState((previous) => ({
  ...previous,
  some: value
}));
...
```
This works, but requires us to write more boilerplate.

## Solution
```useConsolidatedState``` helps us by exporting all the properties of the object as state, along with setters and a 'global' set for partial/bulk updates.
## Usage
```javascript
import React from "react";
import useConsolidatedState from "use-consolidated-state";

interface DemoState {
  name: string;
  isSquare: boolean;
}

export default () => {
  const { isSquare, name, setIsSquare, setName, setState } =
    useConsolidatedState<DemoState>({
      height: 1,
      isSquare: undefined,
      name: undefined,
    });

  return (
    <div>
      <div>
        <span>{String(isSquare)}</span>
        <button onClick={() => setIsSquare(true)}>Set height</button>
      </div>
      <div>
        <span>{name}</span>
        <button onClick={() => setName("Square")}>Set height</button>
      </div>
      <div>
        <button
          onClick={() =>
            setState({
              name: "multiple",
              isSquare: false,
            }) 
          }
        >
          Set multiple
        </button>
      </div>
    </div>
  );
};

```