import client from "@/config/client";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>랜딩페이지 에디터</title>
      </Head>
      <ApolloProvider client={client}>
        <ToastContainer />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
