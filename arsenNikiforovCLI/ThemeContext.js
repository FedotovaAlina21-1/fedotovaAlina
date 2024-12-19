// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#F3F4F6',
  text: '#2E3338',
  primary: '#7289DA',
  secondary: '#FFFFFF',
  accent: '#5865F2',
  card: '#FFFFFF',
  border: '#D1D5DB',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
  background: '#36393F',
  text: '#FFFFFF',
  primary: '#7289DA',
  secondary: '#2F3136',
  accent: '#5865F2',
  card: '#2F3136',
  border: '#202225',
  shadow: 'rgba(0, 0, 0, 0.7)',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Светлая тема по умолчанию

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};