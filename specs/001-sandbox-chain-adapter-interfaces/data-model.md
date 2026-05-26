# Data Model: Sandbox Chain Adapter Interfaces

## NetworkConfig

- **networkId**: Stable identifier such as `polygon-amoy`.
- **displayName**: Human-readable network name.
- **chainFamily**: `evm` for this feature.
- **chainId**: Public EVM chain ID.
- **environment**: `sandbox`.
- **nativeAsset**: Native gas asset metadata.
- **rpc**: Placeholder boundary only; no real endpoint or secret.
- **blockExplorerUrl**: Public explorer reference.
- **assets**: Supported sandbox AssetConfig entries.
- **confirmationsRequired**: Reference confirmation count for sandbox status.
- **notes**: Public caveats and mock/reference labels.

**Validation rules**:
- environment MUST be `sandbox`.
- rpc MUST be non-routable or clearly marked placeholder.
- chainId MUST be a positive integer.
- No production node URL, API key, or customer-specific value is allowed.

## AssetConfig

- **assetId**: Stable identifier combining network and symbol.
- **symbol**: Asset symbol such as `USDC`.
- **name**: Public display name.
- **decimals**: Integer precision.
- **assetType**: `stablecoin`, `native`, or `digital_asset`.
- **tokenAddress**: Optional placeholder or approved public testnet address.
- **metadataSource**: `placeholder` or `public_testnet`.

**Validation rules**:
- decimals MUST be non-negative.
- placeholder token addresses MUST be visibly marked as placeholders.
- Asset metadata MUST NOT imply production treasury support.

## AddressValidation

- **networkId**: Selected sandbox network.
- **address**: Input address.
- **isValid**: Boolean format result.
- **normalizedAddress**: Normalized address when valid.
- **reason**: Machine-readable reason for invalid inputs.
- **warnings**: Public notes about mock/reference limitations.

**Validation rules**:
- The mock EVM adapter validates only public address format.
- Address validation MUST NOT invoke KYT, sanctions, address-risk, or vendor
  services.

## TokenMetadata

- **networkId**: Selected sandbox network.
- **assetId**: Stable asset identifier.
- **symbol**: Token symbol.
- **decimals**: Token precision.
- **tokenAddress**: Placeholder or approved public testnet address.
- **isPlaceholder**: Whether the address is a placeholder.

**Validation rules**:
- Unknown assets return a clear unsupported result.
- Placeholder metadata remains labeled.

## TransactionStatus

- **state**: `submitted`, `broadcast`, `confirming`, `settled`, `failed`, or
  `unknown`.
- **txHash**: Reference transaction identifier.
- **confirmations**: Sandbox confirmation count.
- **requiredConfirmations**: Reference confirmation threshold.
- **updatedAt**: Timestamp for the mock status result.
- **failureReason**: Optional reason for failed mock transactions.

**State transitions**:
- submitted -> broadcast -> confirming -> settled
- submitted -> failed
- broadcast -> failed
- unknown remains terminal for unrecognized transaction identifiers

## BroadcastRequest

- **networkId**: Sandbox network identifier.
- **assetId**: Asset identifier.
- **fromAddress**: Source address for mock validation only.
- **toAddress**: Destination address for mock validation only.
- **amount**: Decimal string.
- **clientReferenceId**: Optional idempotency/reference value.
- **metadata**: Optional public metadata.

**Validation rules**:
- Requests do not include private keys, signer references, custody material, or
  policy override details.
- Amount MUST be represented as a string to avoid precision loss in examples.

## BroadcastResult

- **networkId**: Sandbox network identifier.
- **txHash**: Deterministic mock transaction identifier.
- **status**: Normalized TransactionStatus.
- **accepted**: Whether the mock request passed public validation.
- **errors**: Public validation errors if rejected.

## ChainAdapter

- **getNetworkConfig**: Returns public sandbox NetworkConfig.
- **listAssets**: Returns sandbox AssetConfig entries.
- **getTokenMetadata**: Returns TokenMetadata for a supported asset.
- **validateAddress**: Returns AddressValidation using public format checks.
- **getTransactionStatus**: Returns normalized mock TransactionStatus.
- **broadcast**: Returns BroadcastResult without live RPC or signing.

## MockEvmAdapter

Reference implementation of ChainAdapter for EVM sandbox networks. It stores
mock transaction statuses in memory or derives deterministic mock results from
input. It never performs live RPC calls, signing, custody, policy enforcement,
risk scoring, ledger posting, treasury execution, sweeping, or customer routing.
