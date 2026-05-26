# Mock Broadcast Example

This is a sandbox/reference example for creating a mock broadcast result. It
does not sign transactions, submit transactions to a network, route through a
private node, enforce production policy, or move funds.

## Input

```json
{
  "networkId": "polygon-amoy",
  "assetId": "polygon-amoy-usdc",
  "fromAddress": "0x0000000000000000000000000000000000000001",
  "toAddress": "0x0000000000000000000000000000000000000002",
  "amount": "25.50",
  "clientReferenceId": "sandbox-payment-001"
}
```

## Expected Mock Result

```json
{
  "networkId": "polygon-amoy",
  "txHash": "deterministic mock transaction id",
  "accepted": true,
  "errors": [],
  "status": {
    "state": "broadcast",
    "confirmations": 0,
    "requiredConfirmations": 12,
    "updatedAt": "mock timestamp"
  }
}
```

## Rejection Examples

The mock adapter rejects requests when public validation fails:

- unsupported sandbox network
- unsupported sandbox asset
- malformed source or destination address
- non-positive or malformed amount string

## Boundary

Mock broadcast is useful for reference wallet and payment-flow demos. It is not
production transaction simulation, signing orchestration, custody, policy
approval, risk approval, ledger posting, treasury execution, or sweeping.
