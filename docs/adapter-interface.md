# Adapter Interface

En3 chain adapters in this public repository are sandbox/reference interfaces.
They describe how wallet and payment products can reason about networks,
assets, address format checks, token metadata, transaction status, and mock
broadcasting without exposing production chain operations.

The interface is intentionally small. Stability matters more than broad network
coverage.

## Public Concepts

### NetworkConfig

`NetworkConfig` describes a sandbox network that can be selected by a wallet,
payment flow, or integration test.

Required public fields:

- `networkId`: stable identifier such as `polygon-amoy`.
- `displayName`: human-readable network name.
- `chainFamily`: `evm` for the current examples.
- `chainId`: public EVM chain ID.
- `environment`: always `sandbox` in this repository.
- `nativeAsset`: native gas asset metadata.
- `rpc`: placeholder boundary only, not a real endpoint.
- `blockExplorerUrl`: public explorer reference.
- `assets`: supported sandbox AssetConfig entries.
- `confirmationsRequired`: reference confirmation threshold.
- `notes`: public caveats and mock/reference labels.

### AssetConfig

`AssetConfig` describes a native asset, stablecoin, or digital asset available
in a sandbox flow.

Token addresses may be placeholders unless explicitly approved as public
testnet metadata. Placeholder values must remain labeled.

### AddressValidation

`AddressValidation` reports whether an address matches the expected public
format for the selected sandbox network.

The mock EVM adapter performs format-only validation. It does not perform KYT,
sanctions screening, address-risk analysis, vendor checks, allowlist review, or
policy approval.

### TokenMetadata

`TokenMetadata` returns the public token metadata needed by reference wallet and
payment flows:

- network identifier
- asset identifier
- symbol
- display name
- decimals
- token address or placeholder
- metadata source
- placeholder marker

### TransactionStatus

`TransactionStatus` normalizes mock transaction lifecycle states:

- `submitted`
- `broadcast`
- `confirming`
- `settled`
- `failed`
- `unknown`

Unknown transaction identifiers return `unknown` without live RPC lookup.

### BroadcastRequest

`BroadcastRequest` is a sandbox request shape for describing a mock transfer or
payment instruction. It includes network, asset, source address, destination
address, amount, optional client reference, and optional public metadata.

It must not include private keys, signer IDs, custody references, production
policy overrides, or customer deployment data.

### BroadcastResult

`BroadcastResult` is the deterministic sandbox response for a mock broadcast.
It includes the selected network, mock transaction hash, normalized status,
accepted flag, and public validation errors.

### ChainAdapter

`ChainAdapter` groups the stable public methods:

- `getNetworkConfig(networkId)`
- `listAssets(networkId)`
- `getTokenMetadata(networkId, assetIdOrSymbol)`
- `validateAddress(networkId, address)`
- `getTransactionStatus(networkId, txHash)`
- `broadcast(request)`

All public implementations in this repository must run without external
services, live RPC, signing, custody, production routing, or customer-specific
configuration.

### MockEvmAdapter

`MockEvmAdapter` is the reference EVM implementation. It demonstrates the
interface using static sandbox network metadata, public EVM address format
checks, placeholder token metadata, deterministic mock broadcast identifiers,
and in-memory transaction-status mapping.

It is not a production EVM adapter and must not be described as one.

## Stablecoin And Payment Flow Fit

The adapter concepts support En3-style payment flow evaluation in public
reference form:

1. Select a sandbox network with `NetworkConfig`.
2. Display supported stablecoin metadata with `AssetConfig` and
   `TokenMetadata`.
3. Validate user-provided addresses with `AddressValidation`.
4. Simulate a payment instruction with `BroadcastRequest`.
5. Return a mock `BroadcastResult`.
6. Poll a normalized `TransactionStatus`.

Production orchestration for IAM/RBAC, policies, approvals, transaction
simulation, audit trails, risk interfaces, ledger, reconciliation, sweeping,
treasury execution, signing, and custody remains private by design.

## SandBank Sandbox Lifecycle Mapping

SandBank sandbox examples share canonical public statuses and events with the
mock chain adapter. `mapTransactionStatusToSandBankLifecycle()` converts a
mock `TransactionStatus` into a synthetic SandBank lifecycle update.

Allowed sandbox statuses are:

- `sandbox_payment_requested`
- `sandbox_address_validated`
- `sandbox_mock_broadcasted`
- `sandbox_confirming`
- `sandbox_settled`
- `sandbox_failed`
- `sandbox_unknown`

Allowed sandbox events are:

- `sandbank.sandbox.payment_requested`
- `sandbank.sandbox.address_validated`
- `sandbank.sandbox.mock_broadcasted`
- `sandbank.sandbox.status_updated`
- `sandbank.sandbox.payment_settled`
- `sandbank.sandbox.payment_failed`
- `sandbank.sandbox.status_unknown`

These values are synthetic public demo values only. They are not production
event streams, persistence contracts, custody workflows, or operational
orchestration.

## Safety Rules

- Do not publish real RPC secrets or production node URLs.
- Do not publish private endpoints, customer deployment configs, signer
  configuration, or internal routing details.
- Do not claim production readiness, audited MPC/TSS, regulatory approval,
  live customers, bank partnerships, vendor integrations, or compliance
  certifications from these examples.
- Label mock/reference behavior clearly in docs, configs, examples, and code.
