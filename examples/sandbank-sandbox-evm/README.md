# SandBank Sandbox EVM Example

This example shows how SandBank can call the public `MockEvmAdapter` for a
synthetic USDC sandbox payment lifecycle. It is safe mock data only: no real
RPC URL, production node configuration, custody, private key, production signer
orchestration, real funds, partner context, financing context, corporate
transaction context, grant context, or strategic buyer claim is represented.

## Adapter Boundary

Use the public TypeScript boundary:

```ts
import {
  MockEvmAdapter,
  mapTransactionStatusToSandBankLifecycle,
} from "@en3/chain-integrations";
```

The adapter supports:

- `validateAddress(networkId, address)`
- `getTokenMetadata(networkId, assetIdOrSymbol)`
- `broadcast(request)`
- `getTransactionStatus(networkId, txHash)`

## Synthetic Request

```json
{
  "networkId": "base-sepolia",
  "assetId": "base-sepolia-usdc",
  "fromAddress": "0x0000000000000000000000000000000000000001",
  "toAddress": "0x0000000000000000000000000000000000000002",
  "amount": "10.00",
  "clientReferenceId": "sandbank-sandbox-payment-001"
}
```

## Address Validation Result

```json
{
  "networkId": "base-sepolia",
  "address": "0x0000000000000000000000000000000000000002",
  "isValid": true,
  "normalizedAddress": "0x0000000000000000000000000000000000000002",
  "reason": "valid",
  "warnings": [
    "Format-only sandbox validation; no KYT, sanctions, risk, or policy checks."
  ]
}
```

## USDC Sandbox Metadata

```json
{
  "networkId": "base-sepolia",
  "assetId": "base-sepolia-usdc",
  "symbol": "USDC",
  "name": "USD Coin",
  "decimals": 6,
  "tokenAddress": "0x0000000000000000000000000000000000000000",
  "isPlaceholder": true,
  "metadataSource": "placeholder"
}
```

## Mock Broadcast Result

```json
{
  "networkId": "base-sepolia",
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

## SandBank Lifecycle Mapping

```json
{
  "paymentStatus": "sandbox_mock_broadcasted",
  "paymentEvent": "sandbank.sandbox.mock_broadcasted",
  "transactionState": "broadcast",
  "txHash": "deterministic mock transaction id",
  "confirmations": 0,
  "requiredConfirmations": 12,
  "updatedAt": "mock timestamp",
  "sandboxOnly": true,
  "note": "Synthetic SandBank sandbox lifecycle update derived from mock chain adapter status."
}
```

The lifecycle mapping is the public boundary. It is not a production ledger,
reconciliation, audit, custody, signing, risk, or treasury workflow.
