import assert from "node:assert/strict";
import test from "node:test";

import {
  MockEvmAdapter,
  SANDBANK_SANDBOX_PAYMENT_EVENTS,
  SANDBANK_SANDBOX_PAYMENT_STATUSES,
  mapTransactionStatusToSandBankLifecycle,
} from "../src/index.js";

test("exports shared SandBank sandbox statuses and events", () => {
  assert.deepEqual(SANDBANK_SANDBOX_PAYMENT_STATUSES, [
    "sandbox_payment_requested",
    "sandbox_address_validated",
    "sandbox_mock_broadcasted",
    "sandbox_confirming",
    "sandbox_settled",
    "sandbox_failed",
    "sandbox_unknown",
  ]);

  assert.deepEqual(SANDBANK_SANDBOX_PAYMENT_EVENTS, [
    "sandbank.sandbox.payment_requested",
    "sandbank.sandbox.address_validated",
    "sandbank.sandbox.mock_broadcasted",
    "sandbank.sandbox.status_updated",
    "sandbank.sandbox.payment_settled",
    "sandbank.sandbox.payment_failed",
    "sandbank.sandbox.status_unknown",
  ]);
});

test("maps mock transaction status to SandBank sandbox lifecycle", async () => {
  const adapter = new MockEvmAdapter({
    now: () => new Date("2026-05-26T00:00:00.000Z"),
  });

  const broadcast = await adapter.broadcast({
    networkId: "base-sepolia",
    assetId: "base-sepolia-usdc",
    fromAddress: "0x0000000000000000000000000000000000000001",
    toAddress: "0x0000000000000000000000000000000000000002",
    amount: "10.00",
    clientReferenceId: "sandbank-sandbox-payment-001",
  });

  const lifecycle = mapTransactionStatusToSandBankLifecycle(broadcast.status);

  assert.equal(lifecycle.paymentStatus, "sandbox_mock_broadcasted");
  assert.equal(lifecycle.paymentEvent, "sandbank.sandbox.mock_broadcasted");
  assert.equal(lifecycle.transactionState, "broadcast");
  assert.equal(lifecycle.sandboxOnly, true);
  assert.equal(lifecycle.txHash, broadcast.txHash);
});
