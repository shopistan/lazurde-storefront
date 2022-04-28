import { useContext } from "react";
import { AppContext } from "lib/context";
import Link from "next/link";
import styles from "./style.module.scss";

const BreadCrumbs = () => {
  const { appState } = useContext(AppContext);
  return (
    <div className={styles["bread-crumb_wrapper"]}>
      <div className={styles["bread-crumb_item"]}>
        <Link href="/">
          <a>
            {appState?.lang === "en"
              ? "home / Explore All Category"
              : "تائفلا عيمج فشتكا / ةيسيئرلا ةحفصلا"}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BreadCrumbs;
