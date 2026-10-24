"use client";

import { useEffect, useState } from "react";
import {
  getNextTheme,
  getThemeToggleLabel,
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function getCurrentTheme() {
  const documentTheme = document.documentElement.dataset.theme;

  return isTheme(documentTheme)
    ? documentTheme
    : resolveTheme(null);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const label = theme ? getThemeToggleLabel(theme) : "Alternar tema";

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    const animationFrame = window.requestAnimationFrame(() => {
      setTheme(currentTheme);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  function handleThemeChange() {
    const nextTheme = getNextTheme(theme ?? getCurrentTheme());

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme switching still works for the current visit without storage.
    }

    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
      onClick={handleThemeChange}
    >
      <svg
        className={styles.sunIcon}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
      <svg
        className={styles.moonIcon}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.7 15.1A8.5 8.5 0 0 1 8.9 3.3 8.5 8.5 0 1 0 20.7 15.1Z" />
      </svg>
    </button>
  );
}
