import { useEffect, useState } from "react";

import PostWall from "./abi/PostWall.json";
import { ethers } from "ethers";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
);
const contract = new ethers.Contract(contractAddress, PostWall.abi, provider);

function App() {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const fetchedPosts = await contract.getPosts();
    setPosts(fetchedPosts);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const createPost = async () => {
    if (!account) {
      await connectWallet();
    }
    const signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();
    const contractWithSigner = contract.connect(signer);
    try {
      const tx = await contractWithSigner.createPost(message);
      await tx.wait();
      fetchPosts();
      setMessage("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return (
    <div className="App">
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      <h1>Post Wall</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button disabled={!account} onClick={createPost}>Post</button>
      <ul>
        {posts.map((post: any, index) => (
          <li key={index}>
            {post.message} - {post.author} - {formatTimestamp(post.timestamp)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
