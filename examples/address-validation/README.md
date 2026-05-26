# Address Validation Example

This is a sandbox/reference example for public EVM address format validation.
It does not perform KYT, sanctions screening, address-risk scoring, allowlist
review, policy approval, or vendor integration.

## Input

```json
{
  "networkId": "polygon-amoy",
  "address": "0x000000000000000000000000000000000000dEaD"
}
```

## Expected Mock Result

```json
{
  "networkId": "polygon-amoy",
  "address": "0x000000000000000000000000000000000000dEaD",
  "isValid": true,
  "normalizedAddress": "0x000000000000000000000000000000000000dead",
  "reason": "valid",
  "warnings": [
    "Format-only sandbox validation; no KYT, sanctions, risk, or policy checks."
  ]
}
```

## Invalid Address Result

```json
{
  "networkId": "base-sepolia",
  "address": "not-an-address",
  "isValid": false,
  "reason": "malformed_evm_address",
  "warnings": [
    "Format-only sandbox validation; no KYT, sanctions, risk, or policy checks."
  ]
}
```

## Boundary

Address validation here means public EVM format validation only. Production
policy enforcement, address-risk logic, compliance review, customer allowlists,
and vendor checks remain private by design.
