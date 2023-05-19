import Link from "next/link";
import Image from "next/image";
import styles from "./Favorite.module.scss";

type FavoriteProps = {
  users: {
    login: string;
    avatar: string;
  }[];
};

export const Favorite = ({ users }: FavoriteProps) => {
  return (
    <div className={styles.favorite}>
      <h1>List of your favorite profiles</h1>
      <ul>
        {users.map((user) => {
          return (
            <Link
              className={styles.link}
              href={`/${user.login}`}
              key={user.login}
            >
              <li>
                <Image
                  alt="user avatar"
                  src={user.avatar}
                  height={72}
                  width={72}
                  className={styles.avatar}
                />
                <h2>{user.login}</h2>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
export default Favorite;
