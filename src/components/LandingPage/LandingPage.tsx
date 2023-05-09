import Head from "next/head";
import { Info } from "../Info/Info";

export const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Github Profile viewer</title>
        <meta name="description" content="Github profile viewer app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Info />
    </>
  );
};
