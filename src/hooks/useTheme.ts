import { useEffect, useState } from 'react';
import type { ThemeId } from '../types/theme';
import { applyTheme, loadTheme, THEME_STORAGE_KEY } from '../lib/themes';

export function useTheme() {
  // The inline script in index.html already applied the saved theme before
  // first paint; this hook just keeps React in sync and persists changes.
  const [theme, setTheme] = useState<ThemeId>(loadTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore — theme still applies for this session
    }
  }, [theme]);

  return { theme, setTheme };
}
