import Link from "next/link";
import React, { FC, useEffect } from "react";
import Layout from "../components/common/layout";
import styles from "../styles/Home.module.css";

interface LazurdeHomeProps { }

const LazurdeHome: FC<LazurdeHomeProps> = (props) => {
  console.log("HomePageProps", props);
  useEffect(() => {
    console.log("HomePage Mounted");
  }, []);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href={"/en-sa"} locale="en-sa">
            <a>Lazurde en-sa</a>
          </Link>
          <Link href={"/"} locale="ar-sa">
            <a>Lazurde ar-sa</a>
          </Link>
          <Link href={"/"} locale="en-ae">
            <a>Lazurde en-ae</a>
          </Link>
          <Link href={"/"} locale="ar-ae">
            <a>Lazurde ar-ae</a>
          </Link>
          <Link href={"/"} locale="en-eg">
            <a>Lazurde en-eg</a>
          </Link>
          <Link href={"/"} locale="ar-eg">
            <a>Lazurde ar-eg</a>
          </Link>

          <Link href={"/kenaz"}>
            <a>Kenaz HomePage</a>
          </Link>
          <Link href={"/missl"}>
            <a>Miss'L HomePage</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default LazurdeHome;

export async function getServerSideProps(context: any) {
  console.log('Lazurde HomePage Context', context)
  const { locale } = context
  // const date = await new Promise((res) =>
  //   setTimeout(() => res(new Date().getTime()), 2000)
  // );
  return {
    props: {
    }
  };
}
