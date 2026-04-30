import { create } from "zustand";
import type { User } from "../types/user.types";

type AuthState = {
  user: Pick<User, "id" | "email" | "address" | "phone" | "role"> | null;
  actions: AuthStateActions;
};

type AuthStateActions = {
  login: (user: User) => void;
  logout: () => void;
};

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  actions: {
    login: (user: User) =>
      set({
        user: {
          id: user.id,
          email: user.email,
          address: user.address,
          phone: user.phone,
          role: user.role,
        },
      }),
    logout: () => set({ user: null }),
  },
}));
