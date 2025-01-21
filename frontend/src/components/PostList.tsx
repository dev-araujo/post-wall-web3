import "../styles/PostList.css";

import { copyToclipBoard, formatTimestamp, getAvatar } from "../utils";

import { PostListProps } from "../interfaces";
import { useState } from "react";

function PostList({ posts }: PostListProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

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
            <div className="post-list__item-message">{post.message}</div>
            <footer className="post-list__item-footer">
              <img
                className="post-list__item-avatar"
                src={getAvatar(post.author)}
                alt="avatar"
              />
              <div
                className={"post-list__item-author"}
                title={post.author}
                onClick={() => {
                  copyToclipBoard(post.author, () =>
                    setCopiedAddress(post.author)
                  );
                  setTimeout(() => setCopiedAddress(null), 1500);
                }}
              >
                {post.author.substring(0, 6)}...
                {post.author.substring(post.author.length - 4)}
                <span className="clip-copy">
                  {copiedAddress === post.author ? (
                    <i className="bx bx-check-double"></i>
                  ) : (
                    <i className="bx bx-copy"></i>
                  )}
                </span>
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
