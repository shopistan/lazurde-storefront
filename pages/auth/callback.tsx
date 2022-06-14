import { callback } from "lib/identity";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const Callback = () => {
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTokens = () => {
      const callbackRes = callback()  || {};
      if (!!(callbackRes as any).errorMessage) {
        setError((callbackRes as any).errorMessage);
      } else {
        console.log("Tokens on callback", (callbackRes as any).tokens);
        Router.push("/");
      }
    };
    fetchTokens();
  }, []);
  return <div>{error ? error : "Validating..."}</div>;
};

export default Callback;

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
