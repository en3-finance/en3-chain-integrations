# Adapter Interface

A public chain adapter example should expose only sandbox-safe concepts:

- Network identifier.
- Public chain id.
- Native asset symbol.
- Supported stablecoin metadata.
- Address format validation.
- Transaction status lookup shape.
- Confirmation policy in reference form.

Production RPC, signing, broadcasting, custody, monitoring, private allowlists, and operational runbooks are out of scope.
