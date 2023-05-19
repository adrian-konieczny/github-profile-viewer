import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className={styles.navbar}>
      {isLoggedIn && (
        <Link href="/api/logout" className={styles.link}>
          logout
        </Link>
      )}
      <Link href="/login" className={styles.link}>
        login
      </Link>
      <Link href="/register" className={styles.link}>
        register
      </Link>
      <Link href="/" className={styles.link}>
        home
      </Link>
    </div>
  );
};
