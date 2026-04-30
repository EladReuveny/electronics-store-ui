import { create } from "zustand";

type ThemeState = {
  theme: Theme;
  actions: ThemeStateActions;
};

type Theme = "dark" | "light";

type ThemeStateActions = {
  toggleTheme: () => void;
};

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : "dark";
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  actions: {
    toggleTheme: () =>
      set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  },
}));
