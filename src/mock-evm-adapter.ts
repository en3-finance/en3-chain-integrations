import type {
  AddressValidation,
  AssetConfig,
  BroadcastRequest,
  BroadcastResult,
  ChainAdapter,
  NetworkConfig,
  TokenMetadata,
  TransactionStatus,
} from "./types.js";

export interface MockTransactionStatusSeed {
  networkId: string;
  status: TransactionStatus;
}

export interface MockEvmAdapterOptions {
  networks?: NetworkConfig[];
  transactionStatuses?: MockTransactionStatusSeed[];
  now?: () => Date;
}

const sandboxWarning =
  "Format-only sandbox validation; no KYT, sanctions, risk, or policy checks.";

export const EVM_SANDBOX_NETWORKS: NetworkConfig[] = [
  {
    networkId: "polygon-amoy",
    displayName: "Polygon Amoy",
    chainFamily: "evm",
    chainId: 80002,
    environment: "sandbox",
    nativeAsset: {
      symbol: "POL",
      name: "Polygon Ecosystem Token",
      decimals: 18,
    },
    rpc: {
      kind: "placeholder",
      value: "https://example.invalid/polygon-amoy",
      note: "Placeholder RPC boundary. Do not publish production endpoints or keys.",
    },
    blockExplorerUrl: "https://amoy.polygonscan.com",
    confirmationsRequired: 12,
    assets: [
      {
        assetId: "polygon-amoy-usdc",
        networkId: "polygon-amoy",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        assetType: "stablecoin",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        metadataSource: "placeholder",
        isPlaceholder: true,
      },
    ],
    notes: [
      "Sandbox/reference configuration only.",
      "RPC value is intentionally non-routable and must be replaced outside this public repo.",
      "Token address is a placeholder unless approved public testnet metadata is added later.",
    ],
  },
  {
    networkId: "base-sepolia",
    displayName: "Base Sepolia",
    chainFamily: "evm",
    chainId: 84532,
    environment: "sandbox",
    nativeAsset: {
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
    },
    rpc: {
      kind: "placeholder",
      value: "https://example.invalid/base-sepolia",
      note: "Placeholder RPC boundary. Do not publish production endpoints or keys.",
    },
    blockExplorerUrl: "https://sepolia.basescan.org",
    confirmationsRequired: 12,
    assets: [
      {
        assetId: "base-sepolia-usdc",
        networkId: "base-sepolia",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        assetType: "stablecoin",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        metadataSource: "placeholder",
        isPlaceholder: true,
      },
    ],
    notes: [
      "Sandbox/reference configuration only.",
      "RPC value is intentionally non-routable and must be replaced outside this public repo.",
      "Token address is a placeholder unless approved public testnet metadata is added later.",
    ],
  },
  {
    networkId: "arbitrum-sepolia",
    displayName: "Arbitrum Sepolia",
    chainFamily: "evm",
    chainId: 421614,
    environment: "sandbox",
    nativeAsset: {
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
    },
    rpc: {
      kind: "placeholder",
      value: "https://example.invalid/arbitrum-sepolia",
      note: "Placeholder RPC boundary. Do not publish production endpoints or keys.",
    },
    blockExplorerUrl: "https://sepolia.arbiscan.io",
    confirmationsRequired: 20,
    assets: [
      {
        assetId: "arbitrum-sepolia-usdc",
        networkId: "arbitrum-sepolia",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        assetType: "stablecoin",
        tokenAddress: "0x0000000000000000000000000000000000000000",
        metadataSource: "placeholder",
        isPlaceholder: true,
      },
    ],
    notes: [
      "Sandbox/reference configuration only.",
      "RPC value is intentionally non-routable and must be replaced outside this public repo.",
      "Token address is a placeholder unless approved public testnet metadata is added later.",
    ],
  },
];

export class MockEvmAdapter implements ChainAdapter {
  private readonly networksById: Map<string, NetworkConfig>;
  private readonly transactionStatuses: Map<string, TransactionStatus>;
  private readonly now: () => Date;

  constructor(options: MockEvmAdapterOptions = {}) {
    this.networksById = new Map(
      (options.networks ?? EVM_SANDBOX_NETWORKS).map((network) => [
        network.networkId,
        cloneNetworkConfig(network),
      ]),
    );
    this.transactionStatuses = new Map();
    this.now = options.now ?? (() => new Date());

    for (const seed of options.transactionStatuses ?? []) {
      this.transactionStatuses.set(
        statusKey(seed.networkId, seed.status.txHash),
        cloneTransactionStatus(seed.status),
      );
    }
  }

  async getNetworkConfig(networkId: string): Promise<NetworkConfig | undefined> {
    const network = this.networksById.get(networkId);
    return network ? cloneNetworkConfig(network) : undefined;
  }

  async listAssets(networkId: string): Promise<AssetConfig[]> {
    const network = this.networksById.get(networkId);
    return network ? network.assets.map(cloneAssetConfig) : [];
  }

  async getTokenMetadata(
    networkId: string,
    assetIdOrSymbol: string,
  ): Promise<TokenMetadata | undefined> {
    const network = this.networksById.get(networkId);
    if (!network) {
      return undefined;
    }

    const asset = network.assets.find(
      (candidate) =>
        candidate.assetId === assetIdOrSymbol ||
        candidate.symbol.toLowerCase() === assetIdOrSymbol.toLowerCase(),
    );

    if (!asset) {
      return undefined;
    }

    return {
      networkId: asset.networkId,
      assetId: asset.assetId,
      symbol: asset.symbol,
      name: asset.name,
      decimals: asset.decimals,
      tokenAddress: asset.tokenAddress,
      isPlaceholder: asset.isPlaceholder,
      metadataSource: asset.metadataSource,
    };
  }

  async validateAddress(
    networkId: string,
    address: string,
  ): Promise<AddressValidation> {
    if (!this.networksById.has(networkId)) {
      return {
        networkId,
        address,
        isValid: false,
        reason: "unsupported_network",
        warnings: [sandboxWarning],
      };
    }

    const trimmed = address.trim();
    if (!trimmed) {
      return {
        networkId,
        address,
        isValid: false,
        reason: "empty",
        warnings: [sandboxWarning],
      };
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
      return {
        networkId,
        address,
        isValid: false,
        reason: "malformed_evm_address",
        warnings: [sandboxWarning],
      };
    }

    return {
      networkId,
      address,
      isValid: true,
      normalizedAddress: trimmed.toLowerCase(),
      reason: "valid",
      warnings: [sandboxWarning],
    };
  }

  async getTransactionStatus(
    networkId: string,
    txHash: string,
  ): Promise<TransactionStatus> {
    const status = this.transactionStatuses.get(statusKey(networkId, txHash));
    if (status) {
      return cloneTransactionStatus(status);
    }

    return {
      state: "unknown",
      txHash,
      confirmations: 0,
      requiredConfirmations:
        this.networksById.get(networkId)?.confirmationsRequired ?? 0,
      updatedAt: this.now().toISOString(),
    };
  }

  async broadcast(request: BroadcastRequest): Promise<BroadcastResult> {
    const network = this.networksById.get(request.networkId);
    const errors: string[] = [];

    if (!network) {
      errors.push(`Unsupported sandbox network: ${request.networkId}`);
    }

    const asset = network?.assets.find(
      (candidate) => candidate.assetId === request.assetId,
    );
    if (network && !asset) {
      errors.push(`Unsupported sandbox asset: ${request.assetId}`);
    }

    const fromValidation = await this.validateAddress(
      request.networkId,
      request.fromAddress,
    );
    if (!fromValidation.isValid) {
      errors.push(`Invalid fromAddress: ${fromValidation.reason}`);
    }

    const toValidation = await this.validateAddress(
      request.networkId,
      request.toAddress,
    );
    if (!toValidation.isValid) {
      errors.push(`Invalid toAddress: ${toValidation.reason}`);
    }

    if (!isPositiveDecimalString(request.amount)) {
      errors.push("Amount must be a positive decimal string");
    }

    const txHash = deterministicMockTxHash([
      request.networkId,
      request.assetId,
      request.fromAddress.toLowerCase(),
      request.toAddress.toLowerCase(),
      request.amount,
      request.clientReferenceId ?? "",
    ]);

    const status: TransactionStatus = {
      state: errors.length === 0 ? "broadcast" : "failed",
      txHash,
      confirmations: 0,
      requiredConfirmations: network?.confirmationsRequired ?? 0,
      updatedAt: this.now().toISOString(),
      failureReason: errors.length > 0 ? errors.join("; ") : undefined,
    };

    this.transactionStatuses.set(statusKey(request.networkId, txHash), status);

    return {
      networkId: request.networkId,
      txHash,
      status: cloneTransactionStatus(status),
      accepted: errors.length === 0,
      errors,
    };
  }
}

function statusKey(networkId: string, txHash: string): string {
  return `${networkId}:${txHash.toLowerCase()}`;
}

function isPositiveDecimalString(value: string): boolean {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
    return false;
  }

  return value.split("").some((character) => /[1-9]/.test(character));
}

function deterministicMockTxHash(parts: string[]): string {
  const input = parts.join("|");
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }

  const hex = hash.toString(16).padStart(8, "0");
  return `0x${hex.repeat(8).slice(0, 64)}`;
}

function cloneNetworkConfig(network: NetworkConfig): NetworkConfig {
  return {
    ...network,
    nativeAsset: { ...network.nativeAsset },
    rpc: { ...network.rpc },
    assets: network.assets.map(cloneAssetConfig),
    notes: [...network.notes],
  };
}

function cloneAssetConfig(asset: AssetConfig): AssetConfig {
  return { ...asset };
}

function cloneTransactionStatus(status: TransactionStatus): TransactionStatus {
  return { ...status };
}
