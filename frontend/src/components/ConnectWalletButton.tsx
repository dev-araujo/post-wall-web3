import '../styles/ConnectWalletButton.css'

import { ConnectWalletButtonProps } from '../interfaces';

function ConnectWalletButton({
  account,
  connectWallet,
}: ConnectWalletButtonProps) {
  return (
    <div className="wallet-connection">
      {!account && (
        <button className="wallet-connection__button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWalletButton;
