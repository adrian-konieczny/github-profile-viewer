import { useAuth } from "@/contexts/AuthContext";
import styles from "./FavoriteButton.module.scss";
import clsx from "clsx";

type FavoriteButtonProps = {
  login: string;
  avatar_url: string;
};

export const FavoriteButton = ({ login, avatar_url }: FavoriteButtonProps) => {
  const { isLoggedIn, user, refetchSession } = useAuth();

  if (!isLoggedIn || !user) {
    return <div className={styles.text}>login to gain access to favorites</div>;
  }

  const isFavorited = user.favorite.some((user) => {
    return user.login === login;
  });

  const toggleFavorite = async () => {
    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({
        login,
        action: isFavorited ? "remove" : "add",
        email: user?.email,
        avatar: avatar_url,
      }),
    });

    await refetchSession();
  };

  return (
    <button
      onClick={() => toggleFavorite()}
      className={clsx(styles.button, isFavorited ? styles.remove : styles.add)}
    >
      {isFavorited ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};
