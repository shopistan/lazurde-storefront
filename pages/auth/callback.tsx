import axios from "axios";
import { OKTA_CLIENT_ID, OKTA_DOMAIN } from "general-config";
import { codeVerifier, fetchTokens } from "lib/identity";
import { AuthTokens } from "lib/types/common";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Callback = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getTokens = async () => {
      const { code = "" } = router.query;
      await fetchTokens(code as string);
      router.push("/");
    };
    if (!router.isReady) {
      return;
    }
    getTokens();
  }, [router.isReady]);

  return <div>{error ? error : "Validating..."}</div>;
};

export default Callback;

export async function getStaticProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
