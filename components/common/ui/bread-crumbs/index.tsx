import { useContext, useEffect, useState } from "react";
import { AppContext } from "lib/context";
import Link from "next/link";
import styles from "./style.module.scss";
import Label from "../label";

const BreadCrumbs = ({
  pageName = [{ attributeName: "explore all category" }],
}: {
  pageName?: { attributeName: string }[];
}) => {
  const { appState } = useContext(AppContext);
  const [link, setLink] = useState('');

  useEffect(() => {
    const redriectBreadCrumbs =
      appState?.brand === `Miss L'`
        ? "/missl"
        : appState?.brand === `Kenaz`
          ? "/kenaz"
          : "/";
    redriectBreadCrumbs && setLink(redriectBreadCrumbs);
  }, [appState?.brand]);
  return (
    <div className={styles["bread-crumb_wrapper"]}>
      <div className={styles["bread-crumb_item"]}>
        <Link href={link}>
          <a>{appState?.lang === "en" ? `home /` : "/ تائفلا عيمج فشتكاا"}</a>
        </Link>
        <Label>
          {appState?.lang === "en"
            ? pageName[0].attributeName
            : " ةيسيئرلا ةحفصلا"}
        </Label>
      </div>
    </div>
  );
};

export default BreadCrumbs;
