import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeChange";

export const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  const backgroundColor = isDarkMode ? "#333333" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return {
    backgroundColor,
    textColor,
    toggleThemeMode,
  };
};
