import oktaAuth from "lib/identity";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const Callback = () => {
  const [error, setError] = useState("");
  useEffect(() => {
    const getTokens = async () => {
      try {
        const tokensRes = await oktaAuth.token.parseFromUrl();
        const { tokens } = tokensRes;

        if (tokens.idToken) {
          oktaAuth.tokenManager.add("id_token", tokens.idToken);
        }
        if (tokens.accessToken) {
          oktaAuth.tokenManager.add("access_token", tokens.accessToken);
        }
        if (tokens.refreshToken) {
          oktaAuth.tokenManager.add("refresh_token", tokens.refreshToken);
        }
        Router.push("/");
      } catch (error) {
        console.log("Error fetching tokens", error);
      }
    };
    getTokens();
  }, []);
  return <div>{error ? error : "Validating..."}</div>;
};

export default Callback;

export async function getStaticProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
