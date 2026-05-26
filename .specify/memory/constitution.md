<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] -> I. Public Sandbox Boundary
- [PRINCIPLE_2_NAME] -> II. Interface Stability Over Network Breadth
- [PRINCIPLE_3_NAME] -> III. Mock And Reference Truthfulness
- [PRINCIPLE_4_NAME] -> IV. Testable Public Examples
- [PRINCIPLE_5_NAME] -> V. Security Review Before Publication
Added sections:
- Public/Private Boundary
- Development Workflow And Quality Gates
Removed sections:
- Placeholder SECTION_2_NAME
- Placeholder SECTION_3_NAME
Templates requiring updates:
- .specify/templates/plan-template.md: updated
- .specify/templates/spec-template.md: updated
- .specify/templates/tasks-template.md: updated
- .specify/templates/commands/*.md: not present
Follow-up TODOs: none
-->
# En3 Chain Integrations Constitution

## Core Principles

### I. Public Sandbox Boundary
All repository content MUST be safe for a public reference repository. Network
configuration MUST use sandbox/testnet contexts or non-routable placeholders.
No real RPC secrets, API keys, private endpoints, production node URLs,
customer deployment configuration, signer configuration, custody material, or
internal infrastructure details may be committed.

Rationale: This repository documents public chain integration boundaries while
production operations remain private by design.

### II. Interface Stability Over Network Breadth
Chain adapter contracts MUST be stable, small, and clearly versioned before
adding broad network coverage. Changes to shared concepts such as
NetworkConfig, AssetConfig, AddressValidation, TokenMetadata,
TransactionStatus, BroadcastRequest, BroadcastResult, and ChainAdapter MUST
preserve compatibility or document the breaking change and migration path.

Rationale: Partner integrations rely on predictable interfaces more than a
large list of partially described networks.

### III. Mock And Reference Truthfulness
Mock, sandbox, and reference behavior MUST be labeled as such wherever it is
documented or exposed in examples. Public content MUST NOT claim production
readiness, audited MPC/TSS, live customers, pilots, bank partnerships,
regulatory approval, vendor integrations, compliance certifications,
fundraising details, private partners, or customer deployments unless those
claims are explicitly supported by public code and approved public evidence.

Rationale: The repository must be useful for diligence without overstating
private production capabilities.

### IV. Testable Public Examples
Examples and configuration MUST be concrete enough to validate. YAML examples
MUST parse, TypeScript interfaces MUST compile when present, and adapter logic
MUST include focused tests for address validation and transaction-status
mapping when implemented. Tests MUST avoid live RPC calls and external
credentials.

Rationale: Public examples should reduce integration ambiguity without
depending on private infrastructure.

### V. Security Review Before Publication
Every material change MUST preserve SECURITY.md and run a public-repo safety
review before commit. At minimum, contributors MUST scan changed content for
obvious secret patterns including ghp_, github_pat_, sk-, private key headers,
password=, api_key=, and secret=. Documentation MUST explicitly identify what
is mock/reference and what remains private.

Rationale: A public chain integration repository has a high risk of accidental
credential or operational-detail disclosure.

## Public/Private Boundary

This repository may include public adapter interfaces, sandbox network
metadata, reference TypeScript code, mock broadcasting, mock transaction
status, public documentation, and example flows for stablecoin and
digital-asset payment integrations.

This repository MUST NOT include production cryptography, signing orchestration,
policy enforcement, KYT/sanctions/address-risk implementations, ledger
infrastructure, treasury execution, sweeping operations, private node routing,
customer-specific configuration, or deployment runbooks. Those capabilities
are private by design and may only be represented through mock/reference
interfaces.

## Development Workflow And Quality Gates

Feature work MUST start from Spec Kit artifacts: spec.md, plan.md, tasks.md,
and contracts where public interfaces are introduced. Implementations SHOULD
favor small, working, independently testable increments over broad scaffolding.

Before completion, contributors MUST run applicable validation: YAML parsing
for network files, unit tests for TypeScript adapter logic when present, and a
secret-pattern scan. Any skipped validation MUST be documented with the reason.

README.md and SECURITY.md MUST remain clear about sandbox scope and public
repository limitations. GitHub Actions may be added only when lightweight and
expected to pass in a clean public clone.

## Governance

This constitution supersedes conflicting repository practices for public
chain-integration work. Amendments require updating this file, recording the
version impact in the Sync Impact Report, and propagating any changed gates to
Spec Kit templates or feature artifacts.

Versioning follows semantic versioning:
- MAJOR for incompatible governance or principle redefinitions.
- MINOR for new principles, new required sections, or materially expanded
  quality gates.
- PATCH for clarifications and wording that do not change obligations.

All implementation plans and task lists MUST include a constitution check.
Constitution violations are blocking unless the constitution itself is amended
in a separate explicit change.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
