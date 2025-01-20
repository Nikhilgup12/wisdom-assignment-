import React, { createContext, useState } from 'react';

// Create ThemeContext
export const ThemeContext = createContext();

// Create ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const themeStyles = {
    backgroundColor: isDarkTheme ? '#121212' : '#ffffff',
    color: isDarkTheme ? '#ffffff' : '#000000',
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
