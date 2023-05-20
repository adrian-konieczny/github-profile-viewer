import styles from "./LoginInfo.module.scss";

export const LoginInfo = () => {
  return (
    <div className={styles.info}>
      <h1>Github Profile Viewer</h1>
      <div>Login into account to get access to many features</div>
    </div>
  );
};
