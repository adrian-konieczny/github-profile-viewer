import { HeaderBanner } from "@/components/HeaderBanner/HeaderBanner";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProfileStats } from "@/components/ProfileStats/ProfileStats";
import { RepoLists } from "@/components/ReposList/ReposList";
import { Return } from "@/components/Return/Return";
import { GetServerSideProps } from "next";
import Head from "next/head";

type UserPageProps = {
  data: {
    login: string;
    id: number;
    avatar_url: string;
    repos_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    message?: string;
  };
  repodata: {
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
  }[];
};

type Data = {
  login: string;
  id: number;
  avatar_url: string;
  repos_url: string;
  name: string;
  bio: string;
};

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({
  query,
}) => {
  const { id } = query;
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  return {
    props: { ...data },
  };
};

export default function UserPage({ data, repodata }: UserPageProps) {
  return (
    <>
      <Head>
        <title>{data.login ? data.login : "User not found"}</title>
      </Head>
      <Navbar />
      <div>
        {!data.message ? (
          <>
            <HeaderBanner
              login={data.login}
              avatar_url={data.avatar_url}
              bio={data.bio}
              name={data.name}
            />
            <ProfileStats
              repoCount={data.public_repos}
              followers={data.followers}
              following={data.following}
            />
            <RepoLists repodata={repodata} />
            <Return />
          </>
        ) : (
          <>
            <h1>User not found</h1>
            <Return />
          </>
        )}
      </div>
    </>
  );
}
