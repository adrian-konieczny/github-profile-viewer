import Image from "next/image";
import styles from "./HeaderBanner.module.scss";

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
    </div>
  );
}
