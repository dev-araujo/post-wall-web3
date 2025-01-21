import "./styles/App.css";

import {
  ConnectWalletButton,
  PostForm,
  PostList,
  Skeleton,
} from "./components";
import { useEffect, useState } from "react";

import EnterPriseIcon from "./assets/enterprise-icon.svg";
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
    setPosts([]);
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
          <div className="testimonial__enterprise-name">
            <img src={EnterPriseIcon} alt="enterprise icon" />
            <h1 className="testimonial__title">Post Wall</h1>
          </div>
          <div className="testimonial__enterprise-motto">
            <h1>Hear From Our Community</h1>
            <i>
              What our users are saying about our community{" "}
              <strong>web3</strong> in <strong>web3</strong>
            </i>
          </div>
        </header>

        <div className="testimonial__body">
          <div className="testimonial__image">
            <span className="testimonial__image-label">{posts.length}</span>
          </div>

          <div className="testimonial__posts">
            {posts.length > 0 ? (
              <PostList posts={posts} />
            ) : (
              <Skeleton height={"411px"} width={"400px"} />
            )}
          </div>
        </div>

        <footer className={account ? "connected" : "testimonial__footer"}>
          {account && <PostForm account={account} createPost={createPost} />}
          {!account && (
            <span>
              Conecte-se sua wallet na Rede Sepolia Testnet para enviar sua
              mensagem 😊
            </span>
          )}
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
