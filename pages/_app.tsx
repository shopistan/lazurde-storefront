import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ContextProvider from "lib/context";
import { ErrorObject } from "lib/types/common";
import ErrorComponent from "components/common/error-component";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Delete Me!
 */

 const logError = (error: ErrorObject) => {
  console.log('Error!', error)
}

function LazurdeApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <ErrorBoundary FallbackComponent={ErrorComponent} onError={logError}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ContextProvider>
    
  );
}

export default LazurdeApp;
