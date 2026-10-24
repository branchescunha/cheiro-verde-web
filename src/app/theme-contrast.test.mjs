import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globalsCss = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
const footerCss = readFileSync(
  new URL("../components/Footer/Footer.module.css", import.meta.url),
  "utf8",
);

function getRule(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`));

  assert.ok(match, `Expected CSS rule ${selector}`);
  return match[1];
}

function getDeclarations(cssBlock) {
  return new Map(
    [...cssBlock.matchAll(/(--[\w-]+|[\w-]+)\s*:\s*([^;]+);/g)].map(
      ([, property, value]) => [property, value.trim()],
    ),
  );
}

function resolveColor(value, tokens) {
  const variable = value.match(/^var\((--[\w-]+)\)$/)?.[1];
  return variable ? resolveColor(tokens.get(variable), tokens) : value;
}

function relativeLuminance(hexColor) {
  const channels = [1, 3, 5]
    .map((index) => Number.parseInt(hexColor.slice(index, index + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground, background) {
  const luminances = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((a, b) => b - a);

  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

const lightTokens = getDeclarations(getRule(globalsCss, ":root"));

test("brand text meets WCAG AA on both light cream surfaces", () => {
  const brandOnLight = resolveColor(
    lightTokens.get("--color-brand-on-light"),
    lightTokens,
  );

  for (const backgroundToken of ["--color-cream-50", "--color-cream-100"]) {
    const background = resolveColor(
      lightTokens.get(backgroundToken),
      lightTokens,
    );
    assert.ok(
      contrastRatio(brandOnLight, background) >= 4.5,
      `${brandOnLight} on ${background} must reach 4.5:1`,
    );
  }
});

test("footer section titles meet WCAG AA in the light theme", () => {
  const footerDeclarations = getDeclarations(getRule(footerCss, ".footer"));
  const titleDeclarations = getDeclarations(getRule(footerCss, ".sectionTitle"));
  const foreground = resolveColor(titleDeclarations.get("color"), lightTokens);
  const background = resolveColor(
    footerDeclarations.get("background"),
    lightTokens,
  );

  assert.ok(
    contrastRatio(foreground, background) >= 4.5,
    `${foreground} on ${background} must reach 4.5:1`,
  );
});
