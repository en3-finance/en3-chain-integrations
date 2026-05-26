# Public/Private Boundary

This repository is a public sandbox/reference artifact for En3 chain
integration concepts. It is intended to help banks, fintechs, payment
providers, remittance companies, and regulated digital-asset payment products
understand how En3 can model adapter boundaries without exposing production
systems.

## Public In This Repository

- Stable ChainAdapter concepts and TypeScript reference types.
- MockEvmAdapter behavior for deterministic sandbox examples.
- EVM sandbox network metadata for Polygon Amoy, Base Sepolia, and Arbitrum
  Sepolia.
- Address-validation, token-metadata, transaction-status, and mock-broadcast
  walkthroughs.
- Placeholder RPC boundaries and placeholder token addresses where publication
  of live values is not approved.

## Private By Design

- Production cryptography, signing orchestration, MPC/TSS, HSM, key-share, or
  custody implementation details.
- Policy enforcement, approvals, risk scoring, KYT, sanctions, address-risk
  logic, or vendor integrations.
- Ledger infrastructure, reconciliation, treasury execution, sweeping, and
  operational runbooks.
- Production node routing, private RPC endpoints, API keys, customer
  allowlists, customer deployment configuration, or internal deployment
  settings.
- Live customers, pilots, bank partnerships, regulatory approval, compliance
  certifications, fundraising details, and private partner names.

## Publication Rules

Public examples must remain sandbox/reference only. They must not include real
RPC secrets, production node URLs, private endpoints, customer data, signer
configuration, custody material, or internal infrastructure details.

Mock behavior must be labeled clearly. A mock transaction status, mock
broadcast result, or format-only address validation result must not be
presented as production chain operations, compliance review, or risk approval.

## How To Read The Examples

Use these examples to understand interface shape and data boundaries:

1. Select a sandbox network configuration.
2. Validate a public-format address with the mock adapter.
3. Inspect stablecoin token metadata.
4. Produce a mock broadcast result.
5. Read a normalized mock transaction status.

No step requires live RPC access, signing keys, private infrastructure, or
customer-specific configuration.
