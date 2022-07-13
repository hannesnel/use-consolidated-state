# use-consolidated-state
A state hook which combines multiple states into a single object with explicit setters and values for each of the values tracked in the object.

## Installation
```bash
npm install use-consolidated-state
```
React 16.9.0 is specified as a peer dependency, make sure you have at least this version for you project.

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
This works, but requires us to write more boilerplate code.

## Solution
```useConsolidatedState``` helps us by exporting all the properties of the object as state, along with setters and a setState setter for partial/bulk updates, which is similar to the legacy setState of react class components.
## Usage
```javascript
import React from "react";
import useConsolidatedState from "use-consolidated-state";

interface DemoState {
  name: string;
  isSquare: boolean;
  height: number;
}

export default () => {
  // Note each of the keys and associated setters, along with setState
  const { 
    isSquare,    // individually use tracked isSquare
    setIsSquare, // individually set isSquare
    name,        // individually use tracked name
    setName,     // individually set name
    setState     // set partial/multiple keys in the state object
  } = useConsolidatedState<DemoState>({
      height: 1,
      isSquare: undefined,
      name: undefined,
    });

  // or: note that initial state should not contain keys with undefined values if no type is specified
  const { isSquare, name, setIsSquare, setName, setState } =
    useConsolidatedState({
      height: 1,
      isSquare: true,
      name: "Imposter",
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

This is still a young project, feel free to get in touch for any feature requests or issues.
Happy coding