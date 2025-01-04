import "../styles/PostList.css"

import { PostListProps } from "../interfaces";
import { formatTimestamp } from "../utils/formatTimestamp";

function PostList({ posts }: PostListProps) {
  const mock = [
    {
      timestamp: 1735997096,
      author: "",
      message:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
    },
    {
      timestamp: 1735997096,
      author: "",
      message: "",
    },
    {
      timestamp: 1735997096,
      author: "",
      message: "",
    },
    {
      timestamp: 1735997096,
      author: "",
      message: "",
    },
    {
      timestamp: 1735997096,
      author: "",
      message: "",
    },
    {
      timestamp: 1735997096,
      author: "",
      message: "",
    },
  ];
  return (
    <div className="post-list">
      <ul className="post-list__items">
        {mock.map((post, index) => (
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
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${post.author}`}
                alt="avatar"
              />
              <div className="post-list__item-author" title={post.author}>
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
