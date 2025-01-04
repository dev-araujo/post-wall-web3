import "./styles/App.css";

import { ConnectWalletButton, PostForm, PostList } from "./components";
import { useEffect, useState } from "react";

import { Post } from "./interfaces";
import PostWall from "./abi/PostWall.json";
import { ethers } from "ethers";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
);
const contract = new ethers.Contract(contractAddress, PostWall.abi, provider);

function App() {
 
  const [posts, setPosts] = useState<Post[]>([]);
  const [account, setAccount] = useState<string | null>("");
  

  useEffect(() => {
    fetchPosts();
    checkAccount();
  }, []);

  const checkAccount = () => {
    const storageAccount = sessionStorage.getItem("account");
    setAccount(storageAccount);
  };

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await contract.getPosts();

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        sessionStorage.setItem("account", accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const createPost = async (message: any) => {
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
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="app">
      <section className="testimonial">
        <header className="testimonial__header">
          <h1 className="testimonial__title">Post Wall</h1>
          <h2 className="testimonial__subtitle">
            Hear From What Our Satisfied Clients Have To Say ❤️
          </h2>
        </header>

        <div className="testimonial__body">
          <div className="testimonial__image">
            <span className="testimonial__image-label">{posts.length}</span>
          </div>

          <div className="testimonial__posts">
            <PostList posts={posts} />
          </div>
        </div>

        <footer className="testimonial__footer">
          {account && <PostForm account={account} createPost={createPost} />}
          <ConnectWalletButton
            account={account}
            connectWallet={connectWallet}
          />
        </footer>
      </section>
    </div>
  );
}

export default App;
