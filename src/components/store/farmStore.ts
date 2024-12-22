import { createStore, useStore } from "./store";

export type createFarmStoreState = {
  farmScore: number;
  accountScore: number;
};

const initialState: createFarmStoreState = {
  farmScore: 0,
  accountScore: 0,
};

export const createFarmStore = createStore<createFarmStoreState>(initialState);

export const useCreateFarmStore = () => {
  return useStore(createFarmStore);
};

export const resetCreateFarmStore = () => {
  createFarmStore.setState(() => initialState);
};

export const setFarmScore = (update: (prevScore: number) => number) => {
  createFarmStore.setState((state) => ({
    ...state,
    farmScore: update(state.farmScore),
  }));
};

export const setAccountScore = (accountScore: number) => {
  createFarmStore.setState((prev) => ({
    ...prev,
    accountScore,
  }));
};
