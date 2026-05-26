export type ChainFamily = "evm";

export type SandboxEnvironment = "sandbox";

export type AssetType = "native" | "stablecoin" | "digital_asset";

export type MetadataSource = "placeholder" | "public_testnet";

export type TransactionState =
  | "submitted"
  | "broadcast"
  | "confirming"
  | "settled"
  | "failed"
  | "unknown";

export type AddressValidationReason =
  | "valid"
  | "empty"
  | "unsupported_network"
  | "malformed_evm_address";

export interface NativeAssetConfig {
  symbol: string;
  name: string;
  decimals: number;
}

export interface RpcBoundary {
  kind: "placeholder";
  value: string;
  note: string;
}

export interface AssetConfig {
  assetId: string;
  networkId: string;
  symbol: string;
  name: string;
  decimals: number;
  assetType: AssetType;
  tokenAddress?: string;
  metadataSource: MetadataSource;
  isPlaceholder: boolean;
}

export interface NetworkConfig {
  networkId: string;
  displayName: string;
  chainFamily: ChainFamily;
  chainId: number;
  environment: SandboxEnvironment;
  nativeAsset: NativeAssetConfig;
  rpc: RpcBoundary;
  blockExplorerUrl: string;
  assets: AssetConfig[];
  confirmationsRequired: number;
  notes: string[];
}

export interface AddressValidation {
  networkId: string;
  address: string;
  isValid: boolean;
  normalizedAddress?: string;
  reason: AddressValidationReason;
  warnings: string[];
}

export interface TokenMetadata {
  networkId: string;
  assetId: string;
  symbol: string;
  name: string;
  decimals: number;
  tokenAddress?: string;
  isPlaceholder: boolean;
  metadataSource: MetadataSource;
}

export interface TransactionStatus {
  state: TransactionState;
  txHash: string;
  confirmations: number;
  requiredConfirmations: number;
  updatedAt: string;
  failureReason?: string;
}

export interface BroadcastRequest {
  networkId: string;
  assetId: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  clientReferenceId?: string;
  metadata?: Record<string, string>;
}

export interface BroadcastResult {
  networkId: string;
  txHash: string;
  status: TransactionStatus;
  accepted: boolean;
  errors: string[];
}

export interface ChainAdapter {
  getNetworkConfig(networkId: string): Promise<NetworkConfig | undefined>;
  listAssets(networkId: string): Promise<AssetConfig[]>;
  getTokenMetadata(
    networkId: string,
    assetIdOrSymbol: string,
  ): Promise<TokenMetadata | undefined>;
  validateAddress(networkId: string, address: string): Promise<AddressValidation>;
  getTransactionStatus(
    networkId: string,
    txHash: string,
  ): Promise<TransactionStatus>;
  broadcast(request: BroadcastRequest): Promise<BroadcastResult>;
}
