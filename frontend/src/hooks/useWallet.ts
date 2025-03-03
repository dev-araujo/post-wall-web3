import { useEffect, useState } from "react";

const SEPOLIA_CHAIN_ID = "0xaa36a7";

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>("");

  useEffect(() => {
    checkAccount();
  }, []);

  const checkAccount = () => {
    const storageAccount = sessionStorage.getItem("account");
    setAccount(storageAccount);
  };

  const switchToSepoliaNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia Test Network",
                rpcUrls: [
                  "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
                ],
                nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        } catch (addError) {
          console.error("Erro ao adicionar a rede Sepolia:", addError);
        }
      } else {
        console.error("Erro ao mudar para a rede Sepolia:", switchError);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Por favor, instale o MetaMask!");
      return;
    }

    try {
      await switchToSepoliaNetwork();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      sessionStorage.setItem("account", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Erro ao conectar a carteira:", error);
    }
  };

  return { account, connectWallet };
};
