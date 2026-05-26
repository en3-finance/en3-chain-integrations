# SandBank Chain Flow

SandBank chain integration in this repository is a public sandbox/reference
flow only. It shows how the mock EVM adapter can plug into a SandBank-style
payment lifecycle without live RPC calls, real custody, private keys,
production signer orchestration, production node configuration, or real funds.

All data in this document is synthetic.

## Public Boundary

Public SandBank chain examples may include:

- sandbox EVM network identifiers
- format-only address validation
- placeholder USDC sandbox token metadata
- deterministic mock transaction identifiers
- shared canonical sandbox payment statuses and events
- mock transaction-status mapping

Public SandBank chain examples must not include production RPC URLs, access
tokens, private endpoints, customer deployment settings, real custody details,
private keys, signer orchestration, live policy decisions, real treasury
operations, partner context, financing context, corporate transaction context,
grant context, or strategic buyer claims.

## Shared Canonical Statuses

These statuses are the public SandBank sandbox payment lifecycle values shared
by docs, examples, and TypeScript reference code:

| Status | Meaning |
| --- | --- |
| `sandbox_payment_requested` | Synthetic payment request exists before chain adapter work. |
| `sandbox_address_validated` | Destination address passed format-only EVM validation. |
| `sandbox_mock_broadcasted` | Mock adapter accepted the synthetic broadcast request. |
| `sandbox_confirming` | Mock transaction is below the reference confirmation threshold. |
| `sandbox_settled` | Mock transaction reached the reference settled state. |
| `sandbox_failed` | Mock validation failed or a seeded mock status failed. |
| `sandbox_unknown` | Mock adapter has no matching transaction status. |

## Shared Canonical Events

Allowed public SandBank sandbox events:

| Event | Emitted When |
| --- | --- |
| `sandbank.sandbox.payment_requested` | A synthetic SandBank payment request is created for demo flow. |
| `sandbank.sandbox.address_validated` | The mock adapter returns an address validation result. |
| `sandbank.sandbox.mock_broadcasted` | The mock adapter creates a deterministic transaction ID. |
| `sandbank.sandbox.status_updated` | A mock transaction moves through a non-final status. |
| `sandbank.sandbox.payment_settled` | The mock transaction maps to sandbox settled. |
| `sandbank.sandbox.payment_failed` | The mock transaction maps to sandbox failed. |
| `sandbank.sandbox.status_unknown` | The mock adapter cannot find a transaction. |

## Payment Lifecycle Fit

1. SandBank creates a synthetic sandbox payment request and records
   `sandbox_payment_requested`.
2. SandBank calls `MockEvmAdapter.validateAddress()` with the selected sandbox
   EVM network and destination address.
3. A valid format-only result maps to `sandbox_address_validated` and
   `sandbank.sandbox.address_validated`.
4. SandBank reads `MockEvmAdapter.getTokenMetadata()` for USDC sandbox metadata.
5. SandBank calls `MockEvmAdapter.broadcast()` with a synthetic transfer
   request. The adapter returns a deterministic mock transaction identifier.
6. SandBank maps `TransactionStatus.state` through
   `mapTransactionStatusToSandBankLifecycle()`.
7. SandBank surfaces only the canonical sandbox status/event pair to public
   demo consumers.

## Mock Status Mapping

| Chain Adapter State | SandBank Status | SandBank Event |
| --- | --- | --- |
| `submitted` | `sandbox_payment_requested` | `sandbank.sandbox.payment_requested` |
| `broadcast` | `sandbox_mock_broadcasted` | `sandbank.sandbox.mock_broadcasted` |
| `confirming` | `sandbox_confirming` | `sandbank.sandbox.status_updated` |
| `settled` | `sandbox_settled` | `sandbank.sandbox.payment_settled` |
| `failed` | `sandbox_failed` | `sandbank.sandbox.payment_failed` |
| `unknown` | `sandbox_unknown` | `sandbank.sandbox.status_unknown` |

## USDC Sandbox Metadata Example

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

The token address is intentionally a placeholder. It is not a production asset
configuration, customer asset enablement record, treasury route, or custody
instruction.
