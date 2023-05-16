import Link from "next/link";
import styles from "./Navbar.module.scss";
export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/login" className={styles.login}>
        login
      </Link>
      <Link href="/register" className={styles.login}>
        register
      </Link>
      <Link href="/" className={styles.login}>
        home
      </Link>
    </div>
  );
};
export default Navbar;
