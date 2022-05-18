import { useContext } from "react";
import { AppContext } from "lib/context";
import Link from "next/link";
import styles from "./style.module.scss";
import Label from "../label";

const BreadCrumbs = ({pageName = 'Explore All Categories'}) => {
  const { appState } = useContext(AppContext);
  return (
    <div className={styles["bread-crumb_wrapper"]}>
      <div className={styles["bread-crumb_item"]}>
        <Link href="/">
          <a>{appState?.lang === "en" ? `home /` : "/ تائفلا عيمج فشتكاا"}</a>
        </Link>
        <Label>
          {appState?.lang === "en"
            ? pageName
            : " ةيسيئرلا ةحفصلا"}
        </Label>
      </div>
    </div>
  );
};

export default BreadCrumbs;
