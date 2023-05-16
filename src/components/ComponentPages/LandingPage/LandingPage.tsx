import Head from "next/head";
import { Info } from "./Info/Info";
import { FetchUser } from "./FetchUser/FetchUser";
import styles from "./LandingPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export const LandingPage = () => {
  const { updateUser } = useAuth();
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();
      console.log(data);
      updateUser(data);
    };
    fetchSession();
  }, []);
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
        <FetchUser />
      </div>
    </>
  );
};
