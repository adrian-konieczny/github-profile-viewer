import HeaderBanner from "@/components/HeaderBanner/HeaderBanner";
import ProfileStats from "@/components/ProfileStats/ProfileStats";
import RepoLists from "@/components/ReposList/ReposList";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { FunctionComponent } from "react";
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
  // console.log(params);
  const res = await fetch(`https://api.github.com/users/${query.id}`);
  const data: Data = await res.json();
  const repores = await fetch(`https://api.github.com/users/${query.id}/repos`);
  const repodata = await repores.json();
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
    </>
  );
}
