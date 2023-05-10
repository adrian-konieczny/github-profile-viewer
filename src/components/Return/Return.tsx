import Link from "next/link";
import styles from "./Return.module.scss";

export const Return = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.return}>
        Return to home page
      </Link>
    </div>
  );
};
