import Link from "next/link";
import styles from "./style.module.scss";

const BreadCrumbs = () => {
  return (
    <div className={styles["bread-crumb_wrapper"]}>
      <div className={styles["bread-crumb_item"]}>
        <Link href="/">
          <a>home / Explore All Category</a>
        </Link>
      </div>
    </div>
  );
};

export default BreadCrumbs;
