# En3 Chain Integrations

Status: public reference / sandbox artifact.

`en3-chain-integrations` documents and demonstrates sandbox chain adapter
interfaces for En3 Wallet-as-a-Service payment flows. It is intended for banks,
fintechs, payment providers, remittance companies, and regulated digital-asset
payment products reviewing how En3 can represent chain metadata and adapter
boundaries without exposing production infrastructure.

Production cryptography, signing orchestration, policy enforcement, risk logic,
ledger infrastructure, treasury execution, and customer deployments are private
by design.

## What This Repo Is

- Public ChainAdapter concepts for sandbox stablecoin and digital-asset flows.
- A tiny TypeScript reference package with public adapter types and
  `MockEvmAdapter`.
- Sandbox EVM network metadata for Polygon Amoy, Base Sepolia, and Arbitrum
  Sepolia.
- Example walkthroughs for address validation, token metadata,
  transaction-status mapping, and mock broadcasting.

## What This Repo Is Not

This repo does not publish production RPC URLs, API keys, private endpoints,
customer nodes, private allowlists, real deployment configs, production
signing, MPC/TSS claims, custody logic, policy enforcement, ledger logic,
treasury execution, sweeping, KYT/sanctions/address-risk implementations,
vendor integrations, or chain operations runbooks.

Mock/reference behavior is labeled as such and must not be interpreted as
production readiness.

## How This Supports En3 Payment Flows

The public adapter boundary shows how En3-style wallet and payment flows can
model:

1. sandbox network selection,
2. stablecoin asset metadata,
3. public address format validation,
4. mock transfer or payment broadcast,
5. normalized mock transaction status.

This supports diligence and integration planning for API-first Wallet-as-a-
Service, mobile/web wallet reference apps, SDK/API/webhook consumers, wallet
orchestration, and payment operations concepts while keeping production
orchestration private.

## Contents

- `docs/adapter-interface.md`
- `docs/stablecoin-networks.md`
- `docs/public-private-boundary.md`
- `docs/sandbank-chain-flow.md`
- `examples/sandbank-sandbox-evm/README.md`
- `networks/evm/polygon-amoy.yaml`
- `networks/evm/base-sepolia.yaml`
- `networks/evm/arbitrum-sepolia.yaml`
- `examples/address-validation/README.md`
- `examples/token-metadata/README.md`
- `examples/transaction-status/README.md`
- `examples/mock-broadcast/README.md`
- `src/types.ts`
- `src/mock-evm-adapter.ts`

## Local Validation

Install development dependencies and run the TypeScript build/tests:

```bash
npm install
npm test
```

Parse YAML examples when Ruby is available:

```bash
ruby -e 'require "yaml"; ARGV.each { |f| YAML.load_file(f) }; puts "YAML OK"' networks/evm/*.yaml
```

Run the required public secret-pattern scan:

```bash
rg -n "ghp_|github_pat_|sk-|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY|password=|api_key=|secret=" .
```

Matches are expected only where documentation lists prohibited patterns.

## Related En3 Repositories

- `en3-api-spec`
- `en3-reference-bank`
- `en3-docs`
- `en3-wallet-sdk`
- `en3-admin-console`
- `en3-web-wallet`
- `en3-mobile-wallet`
