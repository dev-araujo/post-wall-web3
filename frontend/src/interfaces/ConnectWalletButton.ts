export interface ConnectWalletButtonProps {
  account: string | null;
  connectWallet: () => Promise<void>;
}
