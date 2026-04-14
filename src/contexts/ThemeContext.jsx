import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (!saved) return false;
    try {
      const parsed = JSON.parse(saved);
      return typeof parsed === 'boolean' ? parsed : false;
    } catch (e) {

      return saved === 'dark' || saved === 'true';
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
