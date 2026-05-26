# Transaction Status Example

This is a sandbox/reference example for normalized mock transaction status. It
does not call live RPC endpoints, block explorers, monitoring systems, or
production chain operations services.

## Status States

The public mock adapter uses these states:

| State | Meaning |
| --- | --- |
| `submitted` | Request accepted by a sandbox flow before mock broadcast. |
| `broadcast` | Mock broadcast accepted and assigned a deterministic transaction ID. |
| `confirming` | Mock transaction has some confirmations but is below the threshold. |
| `settled` | Mock transaction reached the reference confirmation threshold. |
| `failed` | Mock transaction failed public validation or was seeded as failed. |
| `unknown` | Transaction ID is not known to the mock adapter. |

## Input

```json
{
  "networkId": "arbitrum-sepolia",
  "txHash": "0x2222222222222222222222222222222222222222222222222222222222222222"
}
```

## Expected Unknown Result

```json
{
  "state": "unknown",
  "txHash": "0x2222222222222222222222222222222222222222222222222222222222222222",
  "confirmations": 0,
  "requiredConfirmations": 20,
  "updatedAt": "mock timestamp"
}
```

## Boundary

Transaction status here is a normalized mock lifecycle. Production monitoring,
RPC polling, reorg handling, customer notifications, ledger finality,
reconciliation, and treasury operations remain private by design.
