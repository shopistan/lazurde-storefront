import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ContextProvider from "lib/context";
/**
 * Delete Me!
 */

function LazurdeApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default LazurdeApp;
