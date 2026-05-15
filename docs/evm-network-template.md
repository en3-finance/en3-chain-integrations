# EVM Network Template

Use `chain-configs/evm-network.example.json` as the base structure for EVM-compatible network configuration.

## Required Fields

- `name`
- `chainId`
- `rpcUrl`
- `blockExplorerUrl`
- `nativeCurrency.name`
- `nativeCurrency.symbol`
- `nativeCurrency.decimals`
- `networkType`
- `notes`

## Rules

- Use official public network parameters when available.
- Use placeholders for private RPC URLs.
- Do not commit API keys or credentials.
- Document chain-specific risk notes before demo use.

