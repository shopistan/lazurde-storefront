import AuthModule from "components/common/auth/auth-module";
import { PageProps } from "lib/types/common";
import React, { FC } from "react";

const LoginPage: FC<PageProps> = (props: PageProps) => {
  return (
    <div>
      <h1>LoginPage</h1>
      <AuthModule></AuthModule>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context: any) {
  return {
    props: {},
  };
}
