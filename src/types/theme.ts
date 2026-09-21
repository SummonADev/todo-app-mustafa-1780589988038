export type ThemeId =
  | 'light'
  | 'dark'
  | 'ocean-light'
  | 'ocean-dark'
  | 'forest-light'
  | 'forest-dark'
  | 'sunset-light'
  | 'sunset-dark';

export type ThemeMode = 'light' | 'dark';

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  mode: ThemeMode;
  /** [page, accent, surface] colors used for the picker swatch preview */
  swatch: [string, string, string];
}
