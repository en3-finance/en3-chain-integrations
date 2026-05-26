# Tasks: Sandbox Chain Adapter Interfaces

**Input**: Design documents from `/specs/001-sandbox-chain-adapter-interfaces/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chain-adapter.md, quickstart.md

**Tests**: TypeScript adapter tests are required for address validation and transaction-status mapping. YAML parsing and secret-pattern scan are final validation gates.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and public-repo guardrails

- [X] T001 Create TypeScript package configuration in package.json
- [X] T002 Create TypeScript compiler configuration in tsconfig.json
- [X] T003 Create public-repo ignore patterns in .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared interfaces and public/private boundary documentation required by all stories

- [X] T004 [P] Define adapter data types and status enums in src/types.ts
- [X] T005 [P] Create public/private boundary documentation in docs/public-private-boundary.md

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Review Adapter Contract (Priority: P1) MVP

**Goal**: Document the stable public chain adapter concepts and expose the package entry point.

**Independent Test**: A reviewer can read docs/adapter-interface.md and identify every required adapter concept and boundary without live chain access.

### Implementation for User Story 1

- [X] T006 [US1] Expand adapter concept documentation in docs/adapter-interface.md
- [X] T007 [US1] Export public adapter types from src/index.ts

**Checkpoint**: User Story 1 is independently reviewable.

---

## Phase 4: User Story 2 - Inspect Sandbox EVM Network Metadata (Priority: P2)

**Goal**: Provide parseable sandbox EVM metadata for Polygon Amoy, Base Sepolia, and Arbitrum Sepolia.

**Independent Test**: A reviewer can inspect all three YAML files and confirm sandbox markers, chain IDs, placeholder RPC boundaries, and stablecoin metadata.

### Implementation for User Story 2

- [X] T008 [P] Expand stablecoin network documentation in docs/stablecoin-networks.md
- [X] T009 [P] Update Polygon Amoy sandbox config in networks/evm/polygon-amoy.yaml
- [X] T010 [P] Update Base Sepolia sandbox config in networks/evm/base-sepolia.yaml
- [X] T011 [P] Update Arbitrum Sepolia sandbox config in networks/evm/arbitrum-sepolia.yaml

**Checkpoint**: User Story 2 is independently reviewable and YAML-parseable.

---

## Phase 5: User Story 3 - Exercise Mock Payment Flow Examples (Priority: P3)

**Goal**: Provide mock/reference examples and a MockEvmAdapter for address validation, token metadata, transaction status, and mock broadcast.

**Independent Test**: Tests pass without external services, and each example README labels the flow as sandbox/reference.

### Tests for User Story 3

- [X] T012 [P] [US3] Add address validation tests in tests/address-validation.test.ts
- [X] T013 [P] [US3] Add transaction status mapping tests in tests/transaction-status.test.ts

### Implementation for User Story 3

- [X] T014 [US3] Implement MockEvmAdapter in src/mock-evm-adapter.ts
- [X] T015 [US3] Export MockEvmAdapter from src/index.ts
- [X] T016 [P] [US3] Expand address validation example in examples/address-validation/README.md
- [X] T017 [P] [US3] Expand token metadata example in examples/token-metadata/README.md
- [X] T018 [P] [US3] Expand transaction status example in examples/transaction-status/README.md
- [X] T019 [P] [US3] Create mock broadcast example in examples/mock-broadcast/README.md

**Checkpoint**: User Story 3 is independently testable with local tests.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Repository-level documentation, validation, and reporting

- [X] T020 Update repository overview and links in README.md
- [X] T021 Verify SECURITY.md preserves public repository safety boundaries
- [X] T022 Run YAML parsing validation for networks/evm/*.yaml
- [X] T023 Run TypeScript build and tests for src/ and tests/
- [X] T024 Run required secret-pattern scan across repository content
- [X] T025 Write implementation summary in CODEX_REPORT.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion.
- **User Story 2 (Phase 4)**: Depends on Foundational completion and can proceed after US1 because it touches different files.
- **User Story 3 (Phase 5)**: Depends on Foundational completion; tests precede MockEvmAdapter implementation.
- **Polish (Phase 6)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other user stories.
- **User Story 2 (P2)**: No dependency on User Story 3.
- **User Story 3 (P3)**: Uses shared types from Phase 2 and exports through src/index.ts after US1.

### Within Each User Story

- Tests for User Story 3 MUST be written before implementing src/mock-evm-adapter.ts.
- Documentation and YAML tasks marked [P] touch separate files and can run in parallel.
- src/index.ts tasks must be sequential because both US1 and US3 update the same file.

## Parallel Opportunities

- T004 and T005 can run in parallel.
- T008, T009, T010, and T011 can run in parallel.
- T012 and T013 can run in parallel.
- T016, T017, T018, and T019 can run in parallel.

## Parallel Example: User Story 2

```bash
Task: "Expand stablecoin network documentation in docs/stablecoin-networks.md"
Task: "Update Polygon Amoy sandbox config in networks/evm/polygon-amoy.yaml"
Task: "Update Base Sepolia sandbox config in networks/evm/base-sepolia.yaml"
Task: "Update Arbitrum Sepolia sandbox config in networks/evm/arbitrum-sepolia.yaml"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1 adapter contract documentation and type exports.
3. Validate that the public interface can be reviewed without private systems.

### Incremental Delivery

1. Add sandbox EVM network metadata after the adapter contract is stable.
2. Add MockEvmAdapter and examples after tests are in place.
3. Finish with README, SECURITY review, YAML parse, TypeScript tests, secret scan, and CODEX_REPORT.md.
