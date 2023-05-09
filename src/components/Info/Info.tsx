import styles from "./Info.module.scss";
export const Info = () => {
  return (
    <div className={styles.info}>
      <h1>Github Profile Viewer</h1>
      <div>
        Authors:{" "}
        <a href="https://github.com/adrian-konieczny">adrian-konieczny</a> &{" "}
        <a href="https://github.com/datejer">datejer</a>
      </div>
      <div>
        You can preview here some basic info about github users by typing
        username after /
      </div>
    </div>
  );
};
