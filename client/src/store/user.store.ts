import { create } from "zustand";
import { iUser } from "../types/user.types";

interface UserState {
  user: iUser | undefined;
  actions: {
    logout: () => void;
    setUser: (user: iUser) => void;
  };
}

const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  actions: {
    logout: () => set(() => ({ user: undefined })),
    setUser: (user) => set(() => ({ user })),
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useLogout = () => useUserStore((state) => state.actions.logout);
export const useSetUser = () => useUserStore((state) => state.actions.setUser);
