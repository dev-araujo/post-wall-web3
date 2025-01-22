import "../styles/PostForm.css";

import { PostFormProps } from "../interfaces";
import { useState } from "react";

function PostForm({ account, createPost }: PostFormProps) {
  const CHARACTERLIMIT = 215;
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setIsSubmitting(true);
      try {
        await createPost(message);
        setMessage("");
      } catch (error) {
        console.error("Erro ao enviar o post:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getInputClassName = () => {
    return message.length === CHARACTERLIMIT
      ? "post-form__input post-form__input--error"
      : "post-form__input";
  };

  const enableButton = () => {
    return account && message.length > 0 && message.length < CHARACTERLIMIT;
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
            disabled={isSubmitting}
          />
          {message.length === CHARACTERLIMIT && (
            <p className="post-form__error-message">
              The character limit is <strong>{CHARACTERLIMIT}</strong>
            </p>
          )}
        </section>

        <button
          className="post-form__button"
          type="submit"
          disabled={!enableButton() || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
