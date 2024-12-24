import { createStore, useStore } from "./store";

export type createUserStoreState = {
  firstName: string;
  username: string;
  languageCode: string;
  userID: string;
};

const initialState: createUserStoreState = {
  firstName: "",
  username: "",
  languageCode: "",
  userID: "",
};

export const createUserStore = createStore<createUserStoreState>(initialState);

export const useCreateUserStore = () => {
  return useStore(createUserStore);
};

export const resetCreateUserStore = () => {
  createUserStore.setState(() => initialState);
};

export const setFirstName = (firstName: string) => {
  createUserStore.setState((prev) => ({
    ...prev,
    firstName,
  }));
};

export const setUsername = (username: string) => {
  createUserStore.setState((prev) => ({
    ...prev,
    username,
  }));
};

export const setLanguageCode = (languageCode: string) => {
  createUserStore.setState((prev) => ({
    ...prev,
    languageCode,
  }));
};

export const setUserID = (userID: string) => {
  createUserStore.setState((prev) => ({
    ...prev,
    userID,
  }));
};
