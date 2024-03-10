import { create } from "zustand";
import { iUser } from "../types/user.types";

// zustand store for user state managment

// interface for user state
// consists of values and actions
interface UserState {
  user: iUser | undefined;
  actions: {
    logout: () => void;
    setUser: (user: iUser) => void;
  };
}

// create user store with default values
const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  actions: {
    logout: () => set(() => ({ user: undefined })),
    setUser: (user) => set(() => ({ user })),
  },
}));

// use atomic selectors to prevent access to all state
export const useUser = () => useUserStore((state) => state.user);
export const useLogout = () => useUserStore((state) => state.actions.logout);
export const useSetUser = () => useUserStore((state) => state.actions.setUser);
