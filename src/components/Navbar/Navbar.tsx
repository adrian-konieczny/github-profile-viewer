import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
export const Navbar = () => {
  const router = useRouter();
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
export default Navbar;
