import Link from "next/link";
import styles from "./Favorite.module.scss";
type FavoriteProps = {
  names: string[];
};
export const Favorite = ({ names }: FavoriteProps) => {
  return (
    <div className={styles.favorite}>
      <h1>List of your favorite profiles</h1>
      <ul>
        {names.map((name) => {
          return (
            <li key={name}>
              <Link className={styles.link} href={`/${name}`}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Favorite;
