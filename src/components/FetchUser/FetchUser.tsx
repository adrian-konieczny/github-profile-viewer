import { FormEventHandler, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./FetchUser.module.scss";

export const FetchUser = () => {
  const router = useRouter();
  let username = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (null !== username.current) {
      router.push(`/${username.current.value}`);
    }
  };
  return (
    <div className={styles.user}>
      <h1>Pick Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">Type username:</label>
        <input type="text" ref={username} />
        <button>Check</button>
      </form>
    </div>
  );
};
