import assert from "node:assert/strict";
import test from "node:test";

const pageLinkModule = await import("./page-link.ts").catch(() => null);

test("recognizes only same-page navigation as requiring an explicit scroll", () => {
  assert.ok(pageLinkModule, "page-link navigation helper must exist");

  const { resolveSamePageNavigation } = pageLinkModule;
  const currentUrl = "https://cheiro-verde.test/cardapio#cervejas";

  assert.deepEqual(resolveSamePageNavigation(currentUrl, "/cardapio"), {
    href: "/cardapio",
    targetId: null,
  });
  assert.deepEqual(resolveSamePageNavigation(currentUrl, "/cardapio#sobremesas"), {
    href: "/cardapio#sobremesas",
    targetId: "sobremesas",
  });
  assert.equal(resolveSamePageNavigation(currentUrl, "/contato"), null);
  assert.equal(
    resolveSamePageNavigation(currentUrl, "/cardapio?categoria=sucos"),
    null,
  );
});
