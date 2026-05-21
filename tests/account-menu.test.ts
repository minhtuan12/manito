import test from "node:test";
import assert from "node:assert/strict";
import { getAccountSectionHref } from "../lib/account.ts";

test("getAccountSectionHref builds dashboard menu links", () => {
  assert.equal(getAccountSectionHref("en", "dashboard"), "/en/my-account");
  assert.equal(getAccountSectionHref("en", "orders"), "/en/my-account/orders");
  assert.equal(getAccountSectionHref("en", "wishlist"), "/en/my-account/wishlist");
  assert.equal(getAccountSectionHref("vi", "payment-methods"), "/vi/my-account/payment-methods");
});
