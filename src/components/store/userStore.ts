import { createStore, useStore } from "./store";

export type createUserState = {
  userGender: string;
};

const initialState: createUserState = {
  userGender: "",
};

export const createUserStore = createStore<createUserState>(initialState);

export const useCreateUserStore = () => {
  return useStore(createUserStore);
};

export const resetCreateUserStore = () => {
  createUserStore.setState(() => initialState);
};

export const setUserGender = (value: string) => {
  createUserStore.setState((prev) => ({
    ...prev,
    userGender: value,
  }));
};
