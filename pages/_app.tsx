import "../styles/globals.css";
import type { AppProps } from "next/app";
import mongoose from "mongoose";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}



export default MyApp;
