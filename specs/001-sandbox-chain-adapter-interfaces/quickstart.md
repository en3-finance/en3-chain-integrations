# Quickstart: Sandbox Chain Adapter Interfaces

## Review The Public Boundary

1. Read `README.md` for repository scope.
2. Read `SECURITY.md` for public repository safety rules.
3. Read `docs/public-private-boundary.md` to confirm which capabilities are
   intentionally mock/private.

## Inspect Adapter Concepts

1. Open `docs/adapter-interface.md`.
2. Confirm the public concepts are defined:
   NetworkConfig, AssetConfig, AddressValidation, TokenMetadata,
   TransactionStatus, BroadcastRequest, BroadcastResult, ChainAdapter, and
   MockEvmAdapter.
3. Confirm mock/reference behavior is labeled.

## Inspect Sandbox Networks

1. Open the EVM sandbox YAML files in `networks/evm/`.
2. Confirm the network IDs:
   - `polygon-amoy`
   - `base-sepolia`
   - `arbitrum-sepolia`
3. Confirm each file uses sandbox environment metadata and a placeholder RPC
   boundary.

## Run Local Validation

After implementation, run:

```bash
npm install
npm test
```

If Ruby is available, parse the YAML examples:

```bash
ruby -e 'require "yaml"; ARGV.each { |f| YAML.load_file(f) }; puts "YAML OK"' networks/evm/*.yaml
```

Run the required public secret-pattern scan:

```bash
rg -n "ghp_|github_pat_|sk-|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY|password=|api_key=|secret=" .
```

The scan should return no matches except documentation that lists the patterns
as prohibited examples.
