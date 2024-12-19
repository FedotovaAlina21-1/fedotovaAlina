const initialState = {
  isDarkMode: false,
};

//Action
export const toggleTheme = () => ({ type: "TOGGLE_THEME" });

//Reducer
export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
}
