import useThemeStore from "../store/themeStore";

const useTheme = () => {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const backgroundColor = isDarkTheme ? "#333333" : "#ffffff";
  const textColor = isDarkTheme ? "#ffffff" : "#000000";

  return { toggleTheme, backgroundColor, textColor };
};

export default useTheme;
