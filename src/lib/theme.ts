export const THEME_STORAGE_KEY = "paladar-theme";

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(storedTheme: string | null): Theme {
  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return "light";
}

export function getNextTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

export function getThemeToggleLabel(theme: Theme) {
  return theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
}

export const themeInitializationScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
})();
`;
