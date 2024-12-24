import { createStore, useStore } from "./store";

export type createUserStoreState = {
  farmScore: number;
  accountScore: number;
};

const initialState: createUserStoreState = {
  farmScore: 0,
  accountScore: 0,
};

export const createFarmStore = createStore<createUserStoreState>(initialState);

export const useCreateFarmStore = () => {
  return useStore(createFarmStore);
};

export const resetCreateFarmStore = () => {
  createFarmStore.setState(() => initialState);
};

export const setAccountScore = (accountScore: number) => {
  createFarmStore.setState((prev) => ({
    ...prev,
    accountScore,
  }));
};
