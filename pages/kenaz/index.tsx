import Link from "next/link";
import React, { FC } from "react";
import Layout from "../../components/common/layout";
import styles from "../../styles/Home.module.css";

interface KenazHomeProps { }

const KenazHome: FC<KenazHomeProps> = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>This is Kenaz HomePage</h1>
        <div className={styles.links}>
          <Link href={"/kenaz"} locale="en-sa">
            <a>Kenaz sa-en</a>
          </Link>
          <Link href={"/kenaz"} locale="ar-sa">
            <a>Kenaz sa-ar</a>
          </Link>
          <Link href={"/kenaz"} locale="en-ae">
            <a>Kenaz ae-en</a>
          </Link>
          <Link href={"/kenaz"} locale="ar-ae">
            <a>Kenaz ae-ar</a>
          </Link>
          <Link href={"/kenaz"} locale="en-eg">
            <a>Kenaz eg-en</a>
          </Link>
          <Link href={"/kenaz"} locale="ar-eg">
            <a>Kenaz eg-ar</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default KenazHome;

export async function getStaticProps() {
  return { props: {} };
}
