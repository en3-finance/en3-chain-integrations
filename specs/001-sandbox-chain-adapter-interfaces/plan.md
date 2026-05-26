# Implementation Plan: Sandbox Chain Adapter Interfaces

**Branch**: `001-sandbox-chain-adapter-interfaces` | **Date**: 2026-05-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-sandbox-chain-adapter-interfaces/spec.md`

## Summary

Define the public sandbox chain-adapter boundary for stablecoin and
digital-asset payment flows. The implementation will expand documentation,
provide sandbox EVM network YAML examples, add four public example walkthroughs,
and include a tiny TypeScript reference package for the stable ChainAdapter
types plus a MockEvmAdapter. All behavior remains sandbox/reference only and
requires no live RPC, signing, custody, policy, risk, ledger, treasury, or
customer deployment infrastructure.

## Technical Context

**Language/Version**: TypeScript 5.x targeting Node.js 20+

**Primary Dependencies**: No runtime dependencies; TypeScript as a development dependency

**Storage**: N/A, static docs/config plus in-memory mock adapter state

**Testing**: Node.js built-in test runner against compiled TypeScript output

**Target Platform**: Public library/docs repository usable from a clean clone

**Project Type**: Single package plus documentation/config examples

**Performance Goals**: Mock adapter methods complete synchronously or with
resolved promises for small sandbox inputs; no network latency or external
service dependency

**Constraints**: No real RPC secrets, production node URLs, customer configs,
private endpoints, live RPC calls, signing, custody, policy enforcement, risk
logic, ledger infrastructure, treasury execution, or production routing logic

**Scale/Scope**: Three EVM sandbox networks, one stable adapter contract, one
mock EVM implementation, four example walkthroughs, focused tests for address
validation and transaction status mapping

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Public sandbox boundary: PASS. The plan uses only sandbox/testnet metadata and
  placeholder RPC boundaries.
- Interface stability: PASS. Shared adapter concepts are explicitly named and
  kept small.
- Truthfulness: PASS. Mock/reference behavior is part of the scope and must be
  labeled in docs, examples, and code comments.
- Testability: PASS. TypeScript tests cover adapter behavior; YAML validation
  is included in final validation when a local parser is available.
- Security review: PASS. Final tasks include the requested secret-pattern scan
  and README/SECURITY boundary review.

## Project Structure

### Documentation (this feature)

```text
specs/001-sandbox-chain-adapter-interfaces/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── chain-adapter.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
docs/
├── adapter-interface.md
├── stablecoin-networks.md
└── public-private-boundary.md

networks/
└── evm/
    ├── polygon-amoy.yaml
    ├── base-sepolia.yaml
    └── arbitrum-sepolia.yaml

examples/
├── address-validation/README.md
├── token-metadata/README.md
├── transaction-status/README.md
└── mock-broadcast/README.md

src/
├── types.ts
├── mock-evm-adapter.ts
└── index.ts

tests/
├── address-validation.test.ts
└── transaction-status.test.ts

package.json
tsconfig.json
```

**Structure Decision**: Use a single small TypeScript package at repository
root so the public interface can be compiled and tested without introducing
empty service layers or external runtime dependencies. Documentation and YAML
remain first-class artifacts because this repository is primarily a public
integration reference.

## Complexity Tracking

No constitution violations or complexity exceptions are required.

## Phase 0: Research

Completed in [research.md](./research.md).

## Phase 1: Design And Contracts

Completed in [data-model.md](./data-model.md),
[contracts/chain-adapter.md](./contracts/chain-adapter.md), and
[quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- Public sandbox boundary: PASS. Contracts and data model prohibit live RPC,
  private endpoints, production node URLs, signing/custody material, and
  customer deployment configs.
- Interface stability: PASS. The design centers the named adapter concepts and
  keeps network coverage limited to three sandbox EVM networks.
- Truthfulness: PASS. MockEvmAdapter, mock broadcast, placeholder token
  addresses, and private production capabilities are explicitly labeled.
- Testability: PASS. Tests and YAML validation are included in the task plan.
- Security review: PASS. Secret scanning and README/SECURITY review remain
  required completion gates.
