import React, { useEffect, createContext, useState } from "react";

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  } else { return theme; }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
  };

  useEffect(() => {
    const refreshTheme = () => { localStorage.setItem("theme", theme); };
    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };