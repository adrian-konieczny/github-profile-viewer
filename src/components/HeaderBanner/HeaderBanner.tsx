import Image from "next/image";
import styles from "./HeaderBanner.module.scss";
import { useAuth } from "@/contexts/AuthContext";

type HeaderBannerProps = {
  login: string;
  avatar_url: string;
  bio: string;
  name: string;
};

export default function HeaderBanner({
  login,
  avatar_url,
  bio,
  name,
}: HeaderBannerProps) {
  const { isLoggedIn, user, updateUser } = useAuth();
  const add = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ name: login, action: "add", email: user?.email }),
    });
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const { user } = await res.json();
      console.log(user);
      console.log(isLoggedIn);
      updateUser(user);
    };
    fetchSession();
  };
  const remove = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({
        name: login,
        action: "remove",
        email: user?.email,
      }),
    });
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const { user } = await res.json();
      console.log(user);
      console.log(isLoggedIn);
      updateUser(user);
    };
    fetchSession();
  };
  return (
    <div className={styles.headerBanner}>
      <Image
        alt="user avatar"
        src={avatar_url}
        height={148}
        width={148}
        className={styles.avatar}
      />
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.text}>{login}</div>
      <div className={styles.text}>{bio}</div>
      {isLoggedIn ? (
        !user?.favorite?.includes(login) ? (
          <button onClick={add}>Add to favorites</button>
        ) : (
          <button onClick={remove}>Remove from favorites</button>
        )
      ) : (
        <div className={styles.text}>login to gain access to favorites</div>
      )}
    </div>
  );
}
