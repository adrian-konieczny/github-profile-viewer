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
      body: JSON.stringify({
        login,
        action: "add",
        email: user?.email,
        avatar: avatar_url,
      }),
    });
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const { user } = await res.json();
      updateUser(user);
    };
    fetchSession();
  };
  const remove = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({
        login,
        action: "remove",
        email: user?.email,
        avatar: avatar_url,
      }),
    });
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const { user } = await res.json();
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
        !user?.favorite?.find((user) => {
          return user && user.login == login;
        }) ? (
          <button onClick={add} className={styles.add}>
            Add to favorites
          </button>
        ) : (
          <button onClick={remove} className={styles.remove}>
            Remove from favorites
          </button>
        )
      ) : (
        <div className={styles.text}>login to gain access to favorites</div>
      )}
    </div>
  );
}
