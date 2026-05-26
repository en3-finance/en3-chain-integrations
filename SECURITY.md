# Security Policy

Do not report vulnerabilities through public issues. Do not disclose security-sensitive findings publicly.

Production custody, signing infrastructure, policy enforcement, ledger infrastructure, treasury execution, and customer deployments are not contained in En3 public repositories.

Public repositories contain documentation, mock contracts, sandbox examples, and reference interfaces only. They must not include private keys, seed phrases, access tokens, production API hosts, customer data, internal deployment configuration, or real infrastructure details.

Before committing public chain-integration changes, scan for obvious secret patterns:

```bash
rg -n "ghp_|github_pat_|sk-|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY|password=|api_key=|secret=" .
```

Any match that is not a documented prohibited example must be removed before publication.

Contact the En3 team through existing partner channels while a dedicated security contact is being finalized.
