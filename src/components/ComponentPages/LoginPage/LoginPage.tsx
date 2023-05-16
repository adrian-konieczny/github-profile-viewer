import Head from "next/head";
import LoginInfo from "./LoginInfo/LoginInfo";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import Navbar from "@/components/Navbar/Navbar";
export const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Github profile viewer app login page"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Navbar />
        <LoginInfo />
        <LoginForm />
      </div>
    </>
  );
};
