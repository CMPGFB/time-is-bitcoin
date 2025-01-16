import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="text-2xl hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🟧' : '⬜️'}
    </button>
  );
}