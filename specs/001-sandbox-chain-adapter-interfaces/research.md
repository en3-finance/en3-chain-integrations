# Research: Sandbox Chain Adapter Interfaces

## Decision: Use A Tiny TypeScript Reference Package

**Rationale**: TypeScript provides a readable public interface for integration
engineers, can compile in a clean public clone, and matches common SDK/API
consumer expectations without requiring a service runtime.

**Alternatives considered**:
- Documentation only: rejected because the feature asks for runnable tests if
  practical, and typed interfaces reduce ambiguity.
- Full service/API scaffold: rejected because it would imply operational
  behavior outside the public sandbox boundary.

## Decision: Use No Runtime Dependencies

**Rationale**: The adapter is a reference implementation. Avoiding runtime
dependencies reduces public supply-chain surface and keeps the package focused
on interface shape and deterministic mock behavior.

**Alternatives considered**:
- EVM client libraries: rejected because live RPC, signing, and production
  routing are out of scope.
- Validation libraries: rejected because simple EVM address format validation
  is sufficient for sandbox examples.

## Decision: Keep Network Coverage To Three EVM Sandboxes

**Rationale**: Polygon Amoy, Base Sepolia, and Arbitrum Sepolia cover the
requested EVM sandbox examples while honoring the constitution preference for
interface stability over broad network coverage.

**Alternatives considered**:
- Add mainnets: rejected because this public feature is sandbox/reference only.
- Add many EVM testnets: rejected because breadth would dilute the adapter
  contract and increase maintenance.

## Decision: Use Placeholder RPC Boundaries

**Rationale**: Public examples can show where an RPC boundary would exist
without publishing real RPC URLs, private nodes, API keys, or production routing
logic.

**Alternatives considered**:
- Public RPC URLs: rejected because the user explicitly prohibited production
  node URLs and real RPC details; public endpoints also create maintenance and
  reliability ambiguity.

## Decision: Validate With Local Build, Tests, YAML Parse, And Secret Scan

**Rationale**: The feature is mostly documentation/config, so validation should
prove that configs parse, TypeScript compiles, mock behavior works, and obvious
secret patterns are absent.

**Alternatives considered**:
- Live chain integration tests: rejected because they require RPC access and
  would contradict the sandbox/reference boundary.
