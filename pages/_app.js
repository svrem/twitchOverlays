import "../styles/global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Twitch Overlays</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
