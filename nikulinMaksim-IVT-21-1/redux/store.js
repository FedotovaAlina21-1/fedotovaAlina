import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeChange";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
