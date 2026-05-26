# Feature Specification: Sandbox Chain Adapter Interfaces

**Feature Branch**: `001-sandbox-chain-adapter-interfaces`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "Define sandbox chain adapter interfaces and examples for stablecoin and digital-asset payment flows in the public en3-chain-integrations repository."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review Adapter Contract (Priority: P1)

An integration engineer reviewing En3 public materials needs a stable chain
adapter contract that explains the common concepts used to model sandbox
network configuration, assets, address validation, token metadata, transaction
status, and mock broadcasting.

**Why this priority**: The adapter contract is the primary integration surface.
Network examples and mock flows depend on this vocabulary being stable and
clear.

**Independent Test**: A reviewer can read the adapter contract and identify
the required concepts and public/private boundaries without needing private
En3 systems or live chain access.

**Acceptance Scenarios**:

1. **Given** a reviewer opens the adapter documentation, **When** they inspect
   the concept list, **Then** they can find NetworkConfig, AssetConfig,
   AddressValidation, TokenMetadata, TransactionStatus, BroadcastRequest,
   BroadcastResult, ChainAdapter, and MockEvmAdapter.
2. **Given** a reviewer checks the adapter boundary, **When** they compare it
   with En3 payment-flow needs, **Then** they see how stablecoin deposits,
   transfers, transaction status, and mock broadcasting are represented as
   sandbox/reference concepts only.

---

### User Story 2 - Inspect Sandbox EVM Network Metadata (Priority: P2)

A partner or internal engineer needs public EVM sandbox network examples for
stablecoin and digital-asset payment-flow evaluation without exposing
production RPC endpoints, private nodes, or customer deployment settings.

**Why this priority**: Stable network metadata lets users understand how En3
represents EVM testnets while keeping production configuration private.

**Independent Test**: A reviewer can inspect each sandbox EVM network file and
confirm the environment, chain ID, native asset, explorer URL, placeholder RPC
boundary, and token metadata shape.

**Acceptance Scenarios**:

1. **Given** a reviewer opens the EVM sandbox network examples, **When** they
   inspect Polygon Amoy, Base Sepolia, and Arbitrum Sepolia, **Then** each file
   clearly identifies sandbox usage and avoids real RPC secrets or production
   node URLs.
2. **Given** a reviewer examines stablecoin metadata, **When** they compare
   supported assets across the examples, **Then** they can see token symbol,
   decimals, placeholder contract address, and notes about mock/reference use.

---

### User Story 3 - Exercise Mock Payment Flow Examples (Priority: P3)

An engineer evaluating En3 sandbox payment flows needs small reference examples
for address validation, token metadata lookup, transaction-status mapping, and
mock broadcasting that do not imply production custody, signing, risk scoring,
or live chain operations.

**Why this priority**: Examples make the contract easier to evaluate, but must
not expose or simulate private production logic as if it were complete.

**Independent Test**: A reviewer can follow each example README and understand
the expected mock inputs and outputs for a sandbox flow without external
credentials.

**Acceptance Scenarios**:

1. **Given** a reviewer opens the example directories, **When** they inspect
   address validation, token metadata, transaction status, and mock broadcast
   examples, **Then** each example labels itself as sandbox/reference and
   avoids live RPC or private risk logic.
2. **Given** a reviewer checks public/private boundary documentation, **When**
   they evaluate what is intentionally omitted, **Then** they see production
   signing, policy enforcement, risk logic, ledger infrastructure, treasury
   execution, and customer deployments listed as private by design.

### Edge Cases

- Unsupported network identifiers must be reported as unsupported sandbox
  inputs, not routed to live fallback infrastructure.
- Invalid or malformed addresses must return deterministic validation outcomes
  without invoking KYT, sanctions, address-risk, or vendor services.
- Unknown transaction hashes must map to a clear mock status rather than
  triggering live RPC calls.
- Placeholder token addresses must remain visibly marked as placeholders unless
  replaced by approved public testnet metadata.
- Documentation must not imply production readiness, audited MPC/TSS, live
  customers, vendor integrations, regulatory approval, or compliance
  certification.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public adapter documentation MUST define NetworkConfig,
  AssetConfig, AddressValidation, TokenMetadata, TransactionStatus,
  BroadcastRequest, BroadcastResult, ChainAdapter, and MockEvmAdapter.
- **FR-002**: The adapter contract MUST describe how stablecoin deposits,
  transfers, transaction-status checks, and mock broadcasting are represented
  as sandbox/reference flows.
- **FR-003**: The repository MUST include sandbox EVM network metadata for
  Polygon Amoy, Base Sepolia, and Arbitrum Sepolia.
- **FR-004**: Each sandbox network example MUST include a network identifier,
  chain ID, sandbox environment marker, native asset metadata, block explorer
  reference, placeholder RPC boundary, and stablecoin token metadata shape.
- **FR-005**: Public examples MUST include address validation, token metadata,
  transaction status, and mock broadcast walkthroughs.
- **FR-006**: Public documentation MUST explain what remains private by design:
  production cryptography, signing orchestration, policy enforcement, risk
  logic, ledger infrastructure, treasury execution, private node routing, and
  customer deployment configuration.
- **FR-007**: Public content MUST NOT include real RPC secrets, API keys,
  private endpoints, production node URLs, customer data, or internal
  deployment configuration.
- **FR-008**: Mock/reference behavior MUST be clearly labeled wherever the
  adapter, network, or example flow describes non-production behavior.
- **FR-009**: If a runnable package is included, it MUST expose the adapter
  types and mock EVM adapter entry point with focused tests for address
  validation and transaction-status mapping.

### Public/Private Boundary

- Public examples MUST be sandbox/reference only.
- Public examples MUST NOT include real RPC secrets, production node URLs,
  private endpoints, customer deployment configs, custody/signing material, or
  internal deployment details.
- Mock/reference behavior MUST be labeled clearly.

### Key Entities

- **NetworkConfig**: A public sandbox network description with network
  identifier, chain ID, environment, native asset metadata, explorer reference,
  placeholder RPC boundary, supported assets, and notes.
- **AssetConfig**: A stablecoin or digital asset represented on a sandbox
  network, including symbol, decimals, optional placeholder token address, and
  asset classification.
- **AddressValidation**: The result of checking whether an input address has a
  valid format for the selected sandbox network.
- **TokenMetadata**: Public token metadata returned for a supported sandbox
  asset.
- **TransactionStatus**: A normalized lifecycle state for mock transaction
  tracking, including submitted, broadcast, confirming, settled, failed, and
  unknown states.
- **BroadcastRequest**: A sandbox request shape for describing a mock transfer
  or payment instruction without private signing details.
- **BroadcastResult**: A sandbox response shape for a mock broadcast result,
  including normalized status and reference transaction identifier.
- **ChainAdapter**: The stable public interface that groups network metadata,
  address validation, token metadata, status lookup, and mock broadcast
  behavior.
- **MockEvmAdapter**: A reference EVM adapter implementation that demonstrates
  the public contract without live RPC calls, signing, custody, or production
  routing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of required adapter concepts listed in FR-001 are defined in
  public documentation.
- **SC-002**: All three required EVM sandbox network examples identify
  sandbox usage and avoid real RPC secrets or production node URLs.
- **SC-003**: Four public example walkthroughs are available: address
  validation, token metadata, transaction status, and mock broadcast.
- **SC-004**: A reviewer can determine within 10 minutes which capabilities
  are public sandbox/reference and which production capabilities remain
  private by design.
- **SC-005**: Public validation finds zero matches for the requested obvious
  secret patterns in repository content.
- **SC-006**: If runnable adapter code is included, the address-validation and
  transaction-status tests pass without external services or live RPC access.

## Assumptions

- The public repository is intended for partner diligence and integration
  review, not production chain operations.
- Sandbox EVM examples may use placeholder RPC boundaries and placeholder token
  addresses where public testnet metadata is not approved for publication.
- Production cryptography, custody, policy, risk, ledger, treasury, and
  deployment details remain private by design.
- Related En3 repositories such as en3-api-spec and en3-reference-bank are
  linked for context, but this feature does not modify them.
