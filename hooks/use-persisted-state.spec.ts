import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { usePersistedState } from "./use-persisted-state";

const key = "user";
const userInfo = {
  name: "Jose A.",
  age: 27,
};

describe("usePersistedState", () => {

  afterEach(() => {
    window.localStorage.clear()
  })  

  it("Should return initial state in case of item not found", () => {
    const { result } = renderHook(() => usePersistedState(key, userInfo));

    expect(result.current[0]).toMatchObject(userInfo);
  });

  it('Should get persisted state from localStorage', () => {
    localStorage.setItem(key, JSON.stringify(userInfo))
    const { result } = renderHook(() => usePersistedState(key, {}));

    expect(result.current[0]).toMatchObject(userInfo)
  })

  it('Should change state and localStorage on call setState', () => {
    const newUser = {name: 'Fran', age: 27}
    const { result } = renderHook(() => usePersistedState(key, userInfo));

    act(() => {
        result.current[1](newUser)
    })

    expect(result.current[0]).toMatchObject(newUser)
    expect(localStorage.getItem('user')).toBe(JSON.stringify({name: 'Fran', age: 27}))
  })
  
});
