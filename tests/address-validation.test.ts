import assert from "node:assert/strict";
import test from "node:test";

import { MockEvmAdapter } from "../src/index.js";

test("validates EVM-format sandbox addresses", async () => {
  const adapter = new MockEvmAdapter();
  const result = await adapter.validateAddress(
    "polygon-amoy",
    "0x000000000000000000000000000000000000dEaD",
  );

  assert.equal(result.isValid, true);
  assert.equal(result.reason, "valid");
  assert.equal(
    result.normalizedAddress,
    "0x000000000000000000000000000000000000dead",
  );
  assert.deepEqual(result.warnings, [
    "Format-only sandbox validation; no KYT, sanctions, risk, or policy checks.",
  ]);
});

test("rejects malformed EVM addresses without external checks", async () => {
  const adapter = new MockEvmAdapter();
  const result = await adapter.validateAddress("base-sepolia", "not-an-address");

  assert.equal(result.isValid, false);
  assert.equal(result.reason, "malformed_evm_address");
  assert.equal(result.normalizedAddress, undefined);
});

test("reports unsupported sandbox networks", async () => {
  const adapter = new MockEvmAdapter();
  const result = await adapter.validateAddress(
    "ethereum-mainnet",
    "0x000000000000000000000000000000000000dEaD",
  );

  assert.equal(result.isValid, false);
  assert.equal(result.reason, "unsupported_network");
});
