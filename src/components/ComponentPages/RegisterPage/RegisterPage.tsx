import Head from "next/head";
import RegisterInfo from "./RegisterInfo/RegisterInfo";
import RegisterForm from "./RegisterForm/RegisterForm";
import styles from "./RegisterPage.module.scss";
import { Return } from "@/components/Return/Return";

export const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Github profile viewer app register page"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <RegisterInfo />
        <RegisterForm />
        <Return />
      </div>
    </>
  );
};
export default RegisterPage;
