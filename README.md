# En3 Chain Integrations

Status: public reference / sandbox artifact. This repository is intended to document and demonstrate the En3 integration surface. Production cryptography, signing orchestration, policy enforcement, risk logic, ledger infrastructure, treasury execution, and customer deployments are private by design.

## What This Repo Is

`en3-chain-integrations` contains sandbox chain adapters and network configuration examples for stablecoin and digital-asset payment flows.

## Who It Is For

This repo is for integration engineers and partner diligence teams reviewing how En3 can represent network metadata and adapter boundaries without exposing production infrastructure.

## What It Demonstrates

- Sandbox EVM network metadata.
- Stablecoin token metadata examples.
- Address validation concepts.
- Transaction-status adapter concepts.
- Separation between public configuration examples and production chain operations.

## Intentionally Out Of Scope

This repo does not publish production RPC URLs, keys, customer nodes, private allowlists, real deployment configs, production signing, policy enforcement, ledger logic, treasury execution, or chain operations runbooks.

## Contents

- `docs/adapter-interface.md`
- `docs/stablecoin-networks.md`
- `networks/evm/polygon-amoy.yaml`
- `networks/evm/base-sepolia.yaml`
- `networks/evm/arbitrum-sepolia.yaml`
- `examples/address-validation/README.md`
- `examples/token-metadata/README.md`
- `examples/transaction-status/README.md`

## Related En3 Repositories

- `en3-docs`
- `en3-api-spec`
- `en3-wallet-sdk`
- `en3-reference-bank`
- `en3-admin-console`
- `en3-web-wallet`
- `en3-mobile-wallet`
