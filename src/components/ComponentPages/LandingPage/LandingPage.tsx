import Head from "next/head";
import { Info } from "./Info/Info";
import { FetchUser } from "./FetchUser/FetchUser";
import styles from "./LandingPage.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Favorite } from "./Favorite/Favorite";

export const LandingPage = () => {
  const { updateUser, isLoggedIn, user } = useAuth();

  return (
    <>
      <Head>
        <title>Github Profile viewer</title>
        <meta name="description" content="Github profile viewer app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home}>
        <Navbar />
        <Info />
        <div className={styles.main}>
          <FetchUser />
          <Favorite users={user?.favorite || []} />
        </div>
      </div>
    </>
  );
};
