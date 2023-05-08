import styles from "./ReposList.module.scss";
type ReposListProps = {
  repodata: {
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
  }[];
};
const RepoLists = ({ repodata }: ReposListProps) => {
  return (
    <div className={styles.reposList}>
      <h1>Repositiories</h1>
      <ul>
        {repodata.map((repo) => {
          return (
            <li key={repo.name}>
              <h2>{repo.name}</h2>
              <div>{repo.description}</div>
              <div>Language: {repo.language}</div>
              <div>Stargazer count: {repo.stargazers_count}</div>
              <a href={repo.html_url}>Link to {repo.name} repo</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default RepoLists;
