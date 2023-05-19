import { useAuth } from "@/contexts/AuthContext";
import styles from "./FavoriteButton.module.scss";

type FavoriteButtonProps = {
  login: string;
  avatar_url: string;
};

export const FavoriteButton = ({ login, avatar_url }: FavoriteButtonProps) => {
  const { isLoggedIn, user, refetchSession } = useAuth();

  const handleUpdate = async (action: "add" | "remove") => {
    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({
        login,
        action,
        email: user?.email,
        avatar: avatar_url,
      }),
    });

    await refetchSession();
  };

  if (!isLoggedIn || !user) {
    return <div className={styles.text}>login to gain access to favorites</div>;
  }

  const isFavorited = user.favorite.some((user) => {
    return user.login === login;
  });

  if (isFavorited) {
    return (
      <button onClick={() => handleUpdate("add")} className={styles.remove}>
        Remove from favorites
      </button>
    );
  }

  return (
    <button onClick={() => handleUpdate("add")} className={styles.add}>
      Add to favorites
    </button>
  );
};
