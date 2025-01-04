import "../styles/PostForm.css";

import { PostFormProps } from "../interfaces";
import { useState } from "react";

function PostForm({ account, createPost }: PostFormProps) {
  const CHARACTERLIMIT = 215;
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      await createPost(message);
      setMessage("");
    }
  };

  const getInputClassName = () => {
    return message.length === CHARACTERLIMIT
      ? "post-form__input post-form__input--error"
      : "post-form__input";
  };

   const enableButton = () => {
     return account && message.length > 0  && message.length < CHARACTERLIMIT;
   };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <section>
          <input
            maxLength={CHARACTERLIMIT}
            className={getInputClassName()}
            placeholder="Write your testimonial here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message.length === CHARACTERLIMIT && (
            <p className="post-form__error-message">
              O limite de caracteres é de <strong>{CHARACTERLIMIT}</strong>
            </p>
          )}
        </section>

        <button
          className="post-form__button"
          type="submit"
          disabled={!enableButton()}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
