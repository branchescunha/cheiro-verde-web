import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import test from "node:test";

const root = new URL("../../", import.meta.url);

const photoNames = [
  "barbecue-corner",
  "buffet-hot-food",
  "buffet-salads",
  "dining-room-center",
  "dining-room-side",
  "facade-close",
  "facade-wide",
];

function getPngMetadata(path) {
  const image = readFileSync(new URL(path, root));

  assert.equal(image.toString("ascii", 1, 4), "PNG");

  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
  };
}

function getSha256(path) {
  return createHash("sha256")
    .update(readFileSync(new URL(path, root)))
    .digest("hex")
    .toUpperCase();
}

test("public media keeps exactly seven responsive Cheiro Verde photo pairs", () => {
  const desktopDirectory = new URL("../../public/media/photos/desktop/", import.meta.url);
  const mobileDirectory = new URL("../../public/media/photos/mobile/", import.meta.url);

  assert.deepEqual(
    readdirSync(desktopDirectory).sort(),
    photoNames.map((name) => `${name}-desktop.png`).sort(),
  );
  assert.deepEqual(
    readdirSync(mobileDirectory).sort(),
    photoNames.map((name) => `${name}-mobile.png`).sort(),
  );

  for (const name of photoNames) {
    assert.deepEqual(
      getPngMetadata(`public/media/photos/desktop/${name}-desktop.png`),
      { width: 1448, height: 1086 },
    );
    assert.deepEqual(
      getPngMetadata(`public/media/photos/mobile/${name}-mobile.png`),
      { width: 1086, height: 1448 },
    );
  }
});

test("shared and definitive media use the centralized public paths", () => {
  const requiredFiles = [
    "public/media/menu/menu-drinks.webp",
    "public/media/photos/paladar-buffet-site-preview.webp",
    "public/media/videos/cheiro-verde-hero-desktop.mp4",
    "public/media/videos/cheiro-verde-hero-mobile.mp4",
    "public/media/videos/cheiro-verde-hero-desktop-poster.webp",
    "public/media/videos/cheiro-verde-hero-mobile-poster.webp",
    "public/media/brand/cheiro-verde-social-preview.png",
  ];

  for (const path of requiredFiles) {
    assert.ok(existsSync(new URL(path, root)), `${path} must exist`);
  }

  assert.equal(
    getSha256("public/media/menu/menu-drinks.webp"),
    "6B4CE11E9996855C1F40A48E29144A4CEBE753083DCFBF03CA3B8D70E54070CA",
  );
  assert.deepEqual(
    getPngMetadata("public/media/brand/cheiro-verde-social-preview.png"),
    { width: 1200, height: 630 },
  );

  assert.deepEqual(
    readdirSync(new URL("../../public/media/videos/", import.meta.url)).sort(),
    [
      "cheiro-verde-hero-desktop-poster.webp",
      "cheiro-verde-hero-desktop.mp4",
      "cheiro-verde-hero-mobile-poster.webp",
      "cheiro-verde-hero-mobile.mp4",
    ],
  );
});

test("Cheiro Verde icons cover browser, Apple and PWA sizes", () => {
  const iconSizes = new Map([
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["apple-touch-icon.png", 180],
    ["icon-192.png", 192],
    ["icon-512.png", 512],
    ["icon-maskable-512.png", 512],
  ]);

  for (const [name, size] of iconSizes) {
    assert.deepEqual(getPngMetadata(`public/media/icons/${name}`), {
      width: size,
      height: size,
    });
  }

  assert.ok(existsSync(new URL("../app/favicon.ico", import.meta.url)));
});

test("source code references only the centralized public media tree", () => {
  const files = [
    "src/app/page.tsx",
    "src/app/sobre/page.tsx",
    "src/app/cardapio/page.tsx",
    "src/app/buffet/page.tsx",
    "src/app/layout.tsx",
    "src/app/manifest.ts",
    "src/components/Header/Header.tsx",
    "src/components/Footer/Footer.tsx",
    "src/components/Hero/Hero.tsx",
  ];
  const source = files
    .map((path) => readFileSync(new URL(path, root), "utf8"))
    .join("\n");

  assert.doesNotMatch(source, /["']\/(?:images|videos|icons)\//);
  assert.doesNotMatch(source, /assets\/hero-references/);
  assert.match(source, /\/media\/photos\/desktop\//);
  assert.match(source, /\/media\/photos\/mobile\//);
  assert.match(source, /\/media\/videos\/cheiro-verde-hero-desktop\.mp4/);
  assert.match(source, /\/media\/menu\/menu-drinks\.webp/);
});

test("obsolete Paladar visual directories are removed after migration", () => {
  const obsoletePaths = [
    "assets/hero-references",
    "assets/hero-video-sources",
    "assets/flow-frames",
    "assets/photos/edited",
    "assets/site-sources",
    "assets/video-previews",
    "public/icons",
    "public/images",
    "public/videos",
  ];

  for (const path of obsoletePaths) {
    assert.equal(existsSync(new URL(path, root)), false, `${path} must be removed`);
  }
});
