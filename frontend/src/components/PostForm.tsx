import "../styles/PostForm.css";

import { PostFormProps } from "../interfaces";
import { useState } from "react";

function PostForm({ account, createPost }: PostFormProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      await createPost(message);
      setMessage("");
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <input
          className="post-form__input"
          placeholder="Write your testimonial here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="post-form__button" type="submit" disabled={!account}>
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
