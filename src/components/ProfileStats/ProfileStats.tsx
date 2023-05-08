import styles from "./ProfileStats.module.scss";

type ProfileStatsProps = {
  repoCount: number;
  followers: number;
  following: number;
};

export default function ProfileStats({
  repoCount,
  followers,
  following,
}: ProfileStatsProps) {
  return (
    <ul className={styles.profileStats}>
      <li>
        <h1>{repoCount}</h1>
        <div>repositories</div>
      </li>
      <li>
        <h1>{followers}</h1>
        <div>followers</div>
      </li>
      <li>
        <h1>{following}</h1>
        <div>following</div>
      </li>
    </ul>
  );
}
