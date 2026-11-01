import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(
  new URL("./page.tsx", import.meta.url),
  "utf8",
);

test("shows confirmed lunchbox prices and complete delivery actions", () => {
  assert.doesNotMatch(pageSource, /Confirmação pendente|Sob consulta/);
  assert.match(pageSource, /formatMoney\(lunchbox\.price\)/);
  assert.match(pageSource, /delivery\.hours\.opensAtLabel/);
  assert.match(pageSource, /delivery\.areas\.map/);
  assert.match(pageSource, /siteLinks\.whatsApp\.lunchboxes\.general/);
});
