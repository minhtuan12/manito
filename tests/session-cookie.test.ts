import test from "node:test";
import assert from "node:assert/strict";
import { resolveSessionCookieDomain } from "../lib/session-cookie.ts";

test("resolveSessionCookieDomain strips www for production domains", () => {
  assert.equal(resolveSessionCookieDomain("https://www.yamopad.com"), "yamopad.com");
  assert.equal(resolveSessionCookieDomain("https://yamopad.com"), "yamopad.com");
});

test("resolveSessionCookieDomain ignores localhost and invalid URLs", () => {
  assert.equal(resolveSessionCookieDomain("http://localhost:3000"), undefined);
  assert.equal(resolveSessionCookieDomain("not-a-url"), undefined);
});
