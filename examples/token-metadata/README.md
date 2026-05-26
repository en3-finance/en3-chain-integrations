# Token Metadata Example

This is a sandbox/reference example for reading stablecoin metadata from a
public network configuration. It is not a production asset list, treasury
routing table, or customer deployment configuration.

## Input

```json
{
  "networkId": "base-sepolia",
  "assetIdOrSymbol": "USDC"
}
```

## Expected Mock Result

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

## Placeholder Rules

- Placeholder token addresses must remain marked with `isPlaceholder: true`.
- A token address should only be changed when approved public testnet metadata
  is available for publication.
- Public metadata does not imply production support, treasury support, or
  customer deployment readiness.

## Boundary

Production asset enablement, liquidity operations, treasury execution,
reconciliation, sweeping, and customer-specific asset policies remain private
by design.
