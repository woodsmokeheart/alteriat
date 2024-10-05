import { useEffect, useState } from 'react';

type Callback = VoidFunction;
type Dispatch<T> = (state: T) => T;

export interface Store<T> {
  getState(): T;
  setState(dispatch: Dispatch<T>): void;
  subscribe(callback: Callback): VoidFunction;
}

export const createStore = <T>(initialState: T) => {
  let state = initialState;
  let subscribers: Callback[] = [];

  const getState = () => {
    return state;
  };

  const setState = (dispatch: Dispatch<T>) => {
    state = dispatch(state);
    subscribers.forEach((callback) => callback());
  };

  const subscribe = (callback: Callback) => {
    callback();
    subscribers.push(callback);

    return () => {
      subscribers = subscribers.filter((cb) => cb != callback);
    };
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

export const useStore = <T>(store: Store<T>) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return () => unsubscribe();
  }, []);

  return state;
};
