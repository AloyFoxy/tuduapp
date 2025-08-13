import { useState, useEffect } from 'react';
import { ThemeContext } from './theme';

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Verificar si hay una preferencia guardada en localStorage
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Si no hay preferencia guardada, usar la preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark;
  });

  useEffect(() => {
    // Guardar la preferencia en localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Aplicar la clase al documento
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
