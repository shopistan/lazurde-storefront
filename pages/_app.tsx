import "../styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "lib/context";

function LazurdeApp({ Component, pageProps }: any) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default LazurdeApp;
