import "./styles/App.css";

import {
  ConnectWalletButton,
  PostForm,
  PostList,
  Skeleton,
} from "./components";
import { createPost, fetchPosts } from "./services/ethereumService";
import { useEffect, useState } from "react";

import EnterPriseIcon from "./assets/enterprise-icon.svg";
import { Post } from "./interfaces";
import { useWallet } from "./hooks/useWallet";

function App() {
  const { account, connectWallet } = useWallet();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  };

  const handleCreatePost = async (message: string) => {
    const success = await createPost(message, account);
    if (success) {
      loadPosts();
    }
  };

  return (
    <div className="app">
      <section className="testimonial">
        <header className="testimonial__header">
          <div className="testimonial__enterprise-name">
            <img src={EnterPriseIcon} alt="Ícone da Enterprise" />
            <h1 className="testimonial__title">Mural de Posts</h1>
          </div>
          <div className="testimonial__enterprise-motto">
            <h1>O que nossa comunidade está dizendo</h1>
            <i>
              Veja os posts dos nossos usuários sobre nossa comunidade
              <strong>web3</strong> na <strong>web3</strong>
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
          {account && (
            <PostForm account={account} createPost={handleCreatePost} />
          )}
          {!account && (
            <span>
              Conecte sua carteira à Sepolia Testnet para enviar sua mensagem 😊
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
