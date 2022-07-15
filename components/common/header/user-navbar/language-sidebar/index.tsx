import styles from "./languagesidebar.module.scss";
import {langSidebarData } from "lib/mock-data/data";
import Image from "next/image";
import Label from "components/common/ui/label";

const Language = () => {
  return (
    <div className={styles["language-wraper"]}>
      {langSidebarData?.map((data, i) => {
        return (
        <>
          <div className={styles["language-icon"]} key={i}>
            <div className={styles["language-img"]}>
              <Image
                src={data.img}
                alt="img"
                width="32px"
                height="32px"
                layout={"fixed"}
              />
              <Label className={styles["county-name"]}>{data.label.toUpperCase()}</Label>
            </div>
            <div>
              <Label className={styles["county-language"]}>{data.langTitle.toUpperCase()}</Label>
            </div>
          </div>
          {i == 0 && <hr className={styles["horizontal"]} />}
          </>
        );
      })}
    </div>
  );
};
export default Language;
