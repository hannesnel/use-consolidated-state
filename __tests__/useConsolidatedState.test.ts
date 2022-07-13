import { renderHook, act } from '@testing-library/react-hooks';
import useConsolidatedState from '../src';

describe("useConsolidatedState", () => {
  it("should update state for a single key", () => {
    const name = "Albert";
    const { result } = renderHook(() => useConsolidatedState<{ name: string, age?: number }>({
      name,
      age: undefined
    }));
    act(() => {
      result.current.setAge(12);
      result.current.setName(name);
    });
    expect(result.current.name).toBe(name);
    expect(result.current.age).toBe(12);
  });

  it("should update state for a single key with callback", () => {
    const name = "Albert";
    const { result } = renderHook(() => useConsolidatedState({
      name: "Leonardo"
    }));
    act(() => {
      result.current.setName(prev => {
        if (prev === 'Leonardo') {
          return name;
        }
        return prev;
      });
    });
    expect(result.current.name).toBe(name);
  });

  it("should not update state for a single key with callback logic", () => {
    const name = "Albert";
    const { result } = renderHook(() => useConsolidatedState({
      name: "Isaac"
    }));
    act(() => {
      result.current.setName(prev => {
        if (prev === 'Leonardo') {
          return name;
        }
        return prev;
      });
    });
    expect(result.current.name).toBe("Isaac");
  });

  it("should update state for multiple keys", () => {
    const { result } = renderHook(() => useConsolidatedState({
      name: "Isaac",
      age: 50,
      invention: "laws of physics"
    }));
    act(() => {
      result.current.setState({
        age: 51,
        invention: "gravity boots"
      });
    })
    expect(result.current.age).toBe(51);
    expect(result.current.invention).toBe("gravity boots");
  });

  it("should update state for multiple keys with callback", () => {
    const { result } = renderHook(() => useConsolidatedState({
      name: "Isaac",
      age: 50,
      invention: "laws of physics"
    }));
    act(() => {
      result.current.setState((prev) => {
        if (prev.age && prev.age > 40) {
          return {
            ...prev,
            invention: "apple tree"
          }
        }
        return prev;
      });
    })
    expect(result.current.invention).toBe("apple tree")
  });
})