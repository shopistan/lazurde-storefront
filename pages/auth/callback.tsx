import { callback, validateAccess } from "lib/identity";
import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    callback()
  }, [])
  return <div>Validating...</div>;
};

export default Callback;

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
