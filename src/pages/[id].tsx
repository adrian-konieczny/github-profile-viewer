import { HeaderBanner } from "@/components/HeaderBanner/HeaderBanner";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProfileStats } from "@/components/ProfileStats/ProfileStats";
import { RepoLists } from "@/components/ReposList/ReposList";
import { Return } from "@/components/Return/Return";
import { fetchUserData } from "@/lib/utils/githubActions";
import axios from "axios";
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
  if (typeof id != "string") {
    return { props: { data: {}, repodata: {} } };
  }

  const { data, repodata } = await fetchUserData(id);
  return {
    props: { data, repodata },
  };
};

export default function UserPage({ data, repodata }: UserPageProps) {
  console.log(data);
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
