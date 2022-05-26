import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ContextProvider from "lib/context";

function LazurdeApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default LazurdeApp;
