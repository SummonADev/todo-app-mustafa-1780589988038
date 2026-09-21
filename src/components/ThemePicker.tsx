import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { getThemeMeta, themes } from '../lib/themes';
import type { ThemeMeta, ThemeMode } from '../types/theme';

function ModeIcon({ mode, size = 14 }: { mode: ThemeMode; size?: number }) {
  return mode === 'light' ? <Sun size={size} /> : <Moon size={size} />;
}

function Swatch({ colors }: { colors: ThemeMeta['swatch'] }) {
  return (
    <span className="flex h-4 w-7 flex-shrink-0 overflow-hidden rounded-full border border-line shadow-sm">
      {colors.map((c) => (
        <span key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </span>
  );
}

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = getThemeMeta(theme);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const groups: { label: string; mode: ThemeMode; items: ThemeMeta[] }[] = [
    { label: 'Light', mode: 'light', items: themes.filter((t) => t.mode === 'light') },
    { label: 'Dark', mode: 'dark', items: themes.filter((t) => t.mode === 'dark') },
  ];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose theme"
        className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 shadow-sm transition-colors hover:border-acc"
      >
        <Swatch colors={current.swatch} />
        <span className="hidden text-sm font-medium text-ink sm:inline">{current.label}</span>
        <span className="text-ink-3">
          <ModeIcon mode={current.mode} />
        </span>
        <ChevronDown
          size={14}
          className={`text-ink-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Themes"
          className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-line bg-card p-2 shadow-xl"
        >
          {groups.map((group) => (
            <div key={group.mode}>
              <p className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
                <ModeIcon mode={group.mode} size={12} />
                {group.label}
              </p>
              {group.items.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="option"
                  aria-selected={theme === t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-subtle"
                >
                  <Swatch colors={t.swatch} />
                  <span className="flex-1 text-sm text-ink">{t.label}</span>
                  {theme === t.id && <Check size={14} className="text-acc" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
