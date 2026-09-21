import type { ThemeId, ThemeMeta } from '../types/theme';

export const THEME_STORAGE_KEY = 'todo-app-theme';

export const DEFAULT_THEME: ThemeId = 'light';

export const themes: ThemeMeta[] = [
  { id: 'light', label: 'Light', mode: 'light', swatch: ['#f3f4f6', '#4f46e5', '#ffffff'] },
  { id: 'ocean-light', label: 'Ocean', mode: 'light', swatch: ['#eef6fb', '#0284c7', '#ffffff'] },
  { id: 'forest-light', label: 'Forest', mode: 'light', swatch: ['#f0faf2', '#16a34a', '#ffffff'] },
  { id: 'sunset-light', label: 'Sunset', mode: 'light', swatch: ['#fdf6ef', '#ea580c', '#ffffff'] },
  { id: 'dark', label: 'Dark', mode: 'dark', swatch: ['#0f172a', '#6366f1', '#1e293b'] },
  { id: 'ocean-dark', label: 'Ocean', mode: 'dark', swatch: ['#06283e', '#38bdf8', '#0a3753'] },
  { id: 'forest-dark', label: 'Forest', mode: 'dark', swatch: ['#041f10', '#4ade80', '#0a301b'] },
  { id: 'sunset-dark', label: 'Sunset', mode: 'dark', swatch: ['#1d1109', '#fb923c', '#2b1a0e'] },
];

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && themes.some((t) => t.id === value);
}

export function loadTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeId(raw)) return raw;
  } catch {
    // ignore — fall back to default
  }
  return DEFAULT_THEME;
}

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
}

export function getThemeMeta(id: ThemeId): ThemeMeta {
  return themes.find((t) => t.id === id) ?? themes[0];
}
