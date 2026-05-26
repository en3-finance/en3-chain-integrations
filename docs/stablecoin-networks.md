# Stablecoin Networks

This repository includes EVM sandbox network metadata for reference payment
flows. These files are safe public examples, not production routing
configuration.

## Included Sandboxes

| Network | Chain ID | Native Asset | Example Use |
| --- | ---: | --- | --- |
| Polygon Amoy | 80002 | POL | Stablecoin transfer and wallet-balance reference flows. |
| Base Sepolia | 84532 | ETH | Sandbox deposit and app-wallet transfer reference flows. |
| Arbitrum Sepolia | 421614 | ETH | Transaction-status and confirmation reference flows. |

## Stablecoin Metadata Shape

Each network file contains an `assets` list with stablecoin metadata:

- `assetId`: stable identifier scoped to the network.
- `symbol`: display symbol, such as `USDC`.
- `name`: public display name.
- `decimals`: token precision.
- `assetType`: `stablecoin` for the included examples.
- `tokenAddress`: placeholder unless approved public testnet metadata is used.
- `metadataSource`: `placeholder` or `public_testnet`.
- `isPlaceholder`: explicit marker for placeholder token addresses.

The current token addresses are placeholders. They are not production asset
lists, treasury routing instructions, or customer deployment configuration.

## RPC Boundary

The `rpc` section in each YAML file is a boundary marker. It intentionally uses
`example.invalid` values to show where an adapter would receive RPC
configuration in a private deployment without publishing real endpoints,
private nodes, API keys, or production node URLs.

Public examples and tests must not call live RPC endpoints.

## Payment Flow Fit

These network configs can support public reference flows:

1. Select a sandbox network.
2. Read supported stablecoin metadata.
3. Validate an EVM-format address.
4. Create a mock broadcast request.
5. Return a normalized mock transaction status.

Production signing, custody, policy enforcement, risk logic, ledger posting,
reconciliation, sweeping, and treasury execution remain private by design.
