import "../styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "lib/context";

/**
 * Delete Me!
 */

function LazurdeApp({ Component, pageProps }: any) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default LazurdeApp;
