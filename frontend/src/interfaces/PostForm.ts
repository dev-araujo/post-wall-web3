import { FormEvent } from "react";

export interface PostFormProps {
  account: string;
  createPost: (message: string) => Promise<void>;
}

export interface PostFormState {
  message: string;
}

export interface FormSubmitEvent extends FormEvent<HTMLFormElement> {}
