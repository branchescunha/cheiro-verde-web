import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const header = readFileSync(new URL("Header/Header.tsx", import.meta.url), "utf8");
const headerCss = readFileSync(
  new URL("Header/Header.module.css", import.meta.url),
  "utf8",
);
const footer = readFileSync(new URL("Footer/Footer.tsx", import.meta.url), "utf8");
const footerCss = readFileSync(
  new URL("Footer/Footer.module.css", import.meta.url),
  "utf8",
);
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const contact = readFileSync(
  new URL("../app/contato/page.tsx", import.meta.url),
  "utf8",
);

const logoPaths = [
  "public/media/brand/cheiro-verde-logo-light.png",
  "public/media/brand/cheiro-verde-logo-dark.png",
];

function getPngMetadata(path) {
  const image = readFileSync(new URL(path, root));

  assert.equal(image.toString("ascii", 1, 4), "PNG");

  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
    colorType: image.readUInt8(25),
  };
}

test("optimized Cheiro Verde logos preserve dimensions and alpha", () => {
  for (const path of logoPaths) {
    assert.ok(existsSync(new URL(path, root)), `${path} must exist`);
    assert.deepEqual(getPngMetadata(path), {
      width: 768,
      height: 565,
      colorType: 6,
    });
  }
});

test("header and footer render both decorative theme logos", () => {
  for (const component of [header, footer]) {
    assert.match(component, /cheiro-verde-logo-light\.png/);
    assert.match(component, /cheiro-verde-logo-dark\.png/);
    assert.equal(component.match(/alt=""/g)?.length, 2);
    assert.match(component, /styles\.logoLight/);
    assert.match(component, /styles\.logoDark/);
  }
});

test("theme logos are switched only by CSS and data-theme", () => {
  for (const css of [headerCss, footerCss]) {
    assert.match(css, /\.logoDark\s*\{[^}]*display:\s*none;/s);
    assert.match(
      css,
      /:global\(:root\[data-theme="dark"\]\) \.logoLight\s*\{[^}]*display:\s*none;/s,
    );
    assert.match(
      css,
      /:global\(:root\[data-theme="dark"\]\) \.logoDark\s*\{[^}]*display:\s*block;/s,
    );
  }
});

test("brand logos keep the original visual height with the Cheiro Verde aspect ratio", () => {
  assert.match(headerCss, /\.brandLink\s*\{[^}]*width:\s*6\.25rem;/s);
  assert.equal(header.match(/sizes="100px"/g)?.length, 2);

  assert.match(footerCss, /\.brandLink\s*\{[^}]*width:\s*7\.625rem;/s);
  assert.equal(footer.match(/sizes="122px"/g)?.length, 2);
});

test("brand links use the shared home-start destination and one accessible name", () => {
  for (const component of [header, footer]) {
    assert.match(component, /href=\{homeStartHref\}/);
    assert.match(component, /aria-label="Ir para o início da página"/);
  }
});

test("keeps postal code internal and email exclusive to the contact page", () => {
  for (const component of [home, contact, footer]) {
    assert.doesNotMatch(component, /CEP\s*\{|address\.postalCode/);
  }
  assert.doesNotMatch(footer, /contacts\.email/);
  assert.match(contact, /contacts\.email\.href/);
  assert.match(contact, /contacts\.email\.address/);
});
