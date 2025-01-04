import "../styles/PostList.css"

import { PostListProps } from "../interfaces";
import { formatTimestamp } from "../utils/formatTimestamp";

function PostList({ posts }: PostListProps) {
  return (
    <div className="post-list">
      <ul className="post-list__items">
        {posts.map((post, index) => (
          <li key={index} className="post-list__item">
            <header className="post-list__item-header">
              <div className="post-list__item-timestamp">
                {formatTimestamp(post.timestamp)}
              </div>
            </header>
            <div className="post-list__item-message">"{post.message}"</div>
            <footer className="post-list__item-footer">
              <img
                className="post-list__item-avatar"
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${post.author}`}
                alt="avatar"
              />
              <div className="post-list__item-author">
                {post.author.substring(0, 6)}...
                {post.author.substring(post.author.length - 4)}
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
