# Testing Checklist

## Configuration Tests

- Validate chain ID format.
- Validate RPC URL placeholder or approved public value.
- Validate block explorer placeholder or approved public value.
- Validate native currency fields.

## Demo Flow Tests

- Load network configuration in demo mode.
- Prepare a sample transaction request.
- Review transaction metadata before submission.
- Confirm status handling through documented boundaries.

## Boundary Tests

- Confirm no private keys are committed.
- Confirm no production credentials are committed.
- Confirm no customer-specific settings are committed.

