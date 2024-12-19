import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkTheme: false,
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));

export default useThemeStore;
