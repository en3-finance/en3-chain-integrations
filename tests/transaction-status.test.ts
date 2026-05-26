import assert from "node:assert/strict";
import test from "node:test";

import { MockEvmAdapter, type TransactionStatus } from "../src/index.js";

const seededStatus: TransactionStatus = {
  state: "confirming",
  txHash: "0x1111111111111111111111111111111111111111111111111111111111111111",
  confirmations: 3,
  requiredConfirmations: 12,
  updatedAt: "2026-05-26T00:00:00.000Z",
};

test("returns seeded mock transaction status without live RPC", async () => {
  const adapter = new MockEvmAdapter({
    transactionStatuses: [
      {
        networkId: "polygon-amoy",
        status: seededStatus,
      },
    ],
  });

  const result = await adapter.getTransactionStatus(
    "polygon-amoy",
    seededStatus.txHash,
  );

  assert.deepEqual(result, seededStatus);
});

test("maps unknown transaction hashes to unknown status", async () => {
  const adapter = new MockEvmAdapter();
  const txHash =
    "0x2222222222222222222222222222222222222222222222222222222222222222";

  const result = await adapter.getTransactionStatus("base-sepolia", txHash);

  assert.equal(result.state, "unknown");
  assert.equal(result.txHash, txHash);
  assert.equal(result.confirmations, 0);
  assert.equal(result.requiredConfirmations, 12);
});

test("mock broadcast stores a broadcast transaction status", async () => {
  const adapter = new MockEvmAdapter();
  const broadcast = await adapter.broadcast({
    networkId: "arbitrum-sepolia",
    assetId: "arbitrum-sepolia-usdc",
    fromAddress: "0x0000000000000000000000000000000000000001",
    toAddress: "0x0000000000000000000000000000000000000002",
    amount: "12.34",
    clientReferenceId: "sandbox-payment-001",
  });

  assert.equal(broadcast.accepted, true);
  assert.equal(broadcast.status.state, "broadcast");

  const status = await adapter.getTransactionStatus(
    "arbitrum-sepolia",
    broadcast.txHash,
  );

  assert.equal(status.state, "broadcast");
  assert.equal(status.requiredConfirmations, 20);
});
