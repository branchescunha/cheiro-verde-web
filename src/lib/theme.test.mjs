import test from "node:test";
import assert from "node:assert/strict";
import {
  getNextTheme,
  getThemeToggleLabel,
  resolveTheme,
  themeInitializationScript,
} from "./theme.ts";

test("defaults to light when no manual preference exists", () => {
  assert.equal(resolveTheme(null), "light");
});

test("uses a saved dark preference", () => {
  assert.equal(resolveTheme("dark"), "dark");
});

test("uses a saved light preference", () => {
  assert.equal(resolveTheme("light"), "light");
});

test("ignores invalid stored values", () => {
  assert.equal(resolveTheme("sepia"), "light");
});

test("the pre-paint script defaults to light without consulting the system", () => {
  const document = { documentElement: { dataset: {}, style: {} } };
  const localStorage = { getItem: () => null };
  const matchMedia = () => {
    throw new Error("System preference must not be consulted");
  };

  Function(
    "localStorage",
    "document",
    "matchMedia",
    themeInitializationScript,
  )(localStorage, document, matchMedia);

  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(document.documentElement.style.colorScheme, "light");
});

test("returns the opposite theme and its accessible action label", () => {
  assert.equal(getNextTheme("light"), "dark");
  assert.equal(getNextTheme("dark"), "light");
  assert.equal(getThemeToggleLabel("light"), "Ativar tema escuro");
  assert.equal(getThemeToggleLabel("dark"), "Ativar tema claro");
});
