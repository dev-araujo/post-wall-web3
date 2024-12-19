import React, { useEffect, useState } from "react";

import PostWall from "./abi/PostWall.json";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const SEPOLIA_CONTRACT_ADDRESS = import.meta.env.SEPOLIA_CONTRACT_ADDRESS;

const App: React.FC = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        const readOnlyProvider = new ethers.providers.JsonRpcProvider(
          SEPOLIA_CONTRACT_ADDRESS 
        );
        const readOnlyContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          PostWall.abi,
          readOnlyProvider
        );
        setContract(readOnlyContract);

        const fetchedMessages = await readOnlyContract.getMessages();
        setMessages(fetchedMessages);
      } else {
        console.error("MetaMask is not installed");
      }
    };
    initProvider();
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const signer = provider.getSigner();

      const postWallContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PostWall.abi,
        signer
      );
      setContract(postWallContract);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!contract || !account) return;
    try {
      const tx = await contract.sendMessage(newMessage);
      await tx.wait();
      const updatedMessages = await contract.getMessages();
      setMessages(updatedMessages);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1>Decentralized Post Wall</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {account}</p>
      )}
      <div>
        {messages.map((msg: any, index) => (
          <div key={index}>
            <p>
              <strong>{msg.sender}</strong>: {msg.text} <br />
              <em>{new Date(msg.timestamp * 1000).toLocaleString()}</em>
            </p>
          </div>
        ))}
      </div>
      {account && (
        <>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message..."
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </>
      )}
    </div>
  );
};

export default App;
