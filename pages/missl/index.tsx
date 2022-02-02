import Link from "next/link";
import React, { FC } from "react";
import Layout from "../../components/common/layout";
import styles from "../../styles/Home.module.css";

interface MissLHomeProps {}

const MissLHome: FC<MissLHomeProps> = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>This is Miss'L HomePage</h1>
        <div className={styles.links}>
          <Link href={"/missl"} locale="en-sa">
            <a>Miss'L en-sa</a>
          </Link>
          <Link href={"/missl"} locale="ar-sa">
            <a>Miss'L ar-sa</a>
          </Link>
          <Link href={"/missl"} locale="en-ae">
            <a>Miss'L en-ae</a>
          </Link>
          <Link href={"/missl"} locale="ar-ae">
            <a>Miss'L ar-ae</a>
          </Link>
          <Link href={"/missl"} locale="en-eg">
            <a>Miss'L en-eg</a>
          </Link>
          <Link href={"/missl"} locale="ar-eg">
            <a>Miss'L ar-eg</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default MissLHome;

export async function getStaticProps() {
  return { props: {} };
}
