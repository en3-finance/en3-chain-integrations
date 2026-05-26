# Contract: ChainAdapter Public Interface

This contract defines the public sandbox/reference interface for chain adapter
examples. It is not a production chain-operations API.

## Scope

- EVM sandbox network metadata.
- Stablecoin and digital-asset token metadata shape.
- Public address format validation.
- Normalized mock transaction status.
- Mock broadcast request and result shape.

## Out Of Scope

- Live RPC calls.
- Production node routing.
- Private endpoints or API keys.
- Signing, custody, MPC/TSS, HSM, or key-share orchestration.
- Policy enforcement, approvals, risk scoring, KYT, sanctions, or vendor
  integrations.
- Ledger posting, reconciliation, treasury execution, sweeping, or customer
  deployment configuration.

## NetworkConfig

Required fields:
- `networkId`
- `displayName`
- `chainFamily`
- `chainId`
- `environment`
- `nativeAsset`
- `rpc`
- `blockExplorerUrl`
- `assets`
- `confirmationsRequired`
- `notes`

The `environment` value MUST be `sandbox`. The `rpc` value MUST be a
placeholder boundary, not a production URL or private endpoint.

## AssetConfig

Required fields:
- `assetId`
- `networkId`
- `symbol`
- `name`
- `decimals`
- `assetType`
- `tokenAddress`
- `metadataSource`

Placeholder token addresses MUST remain marked as placeholders.

## AddressValidation

Required fields:
- `networkId`
- `address`
- `isValid`
- `normalizedAddress`
- `reason`
- `warnings`

Validation is format-only for the mock adapter. Risk, sanctions, and KYT checks
are private interfaces and must not be represented as implemented here.

## TransactionStatus

Allowed states:
- `submitted`
- `broadcast`
- `confirming`
- `settled`
- `failed`
- `unknown`

Required fields:
- `state`
- `txHash`
- `confirmations`
- `requiredConfirmations`
- `updatedAt`
- `failureReason`

Unknown transaction identifiers MUST return `unknown` without live lookup.

## BroadcastRequest

Required fields:
- `networkId`
- `assetId`
- `fromAddress`
- `toAddress`
- `amount`

Optional fields:
- `clientReferenceId`
- `metadata`

Requests MUST NOT include signer IDs, private keys, custody references,
production policy overrides, or customer deployment data.

## BroadcastResult

Required fields:
- `networkId`
- `txHash`
- `status`
- `accepted`
- `errors`

The mock adapter may reject requests with invalid public address format,
unsupported network, unsupported asset, or invalid amount.

## ChainAdapter Behavior

The ChainAdapter interface MUST expose:
- `getNetworkConfig(networkId)`
- `listAssets(networkId)`
- `getTokenMetadata(networkId, assetIdOrSymbol)`
- `validateAddress(networkId, address)`
- `getTransactionStatus(networkId, txHash)`
- `broadcast(request)`

All methods MUST operate without external services. Implementations in this
repository MUST be labeled sandbox/reference.
