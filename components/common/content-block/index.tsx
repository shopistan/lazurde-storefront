import React, { FC, useContext } from "react";
import Image from "next/image";
import styles from "./content-block.module.scss";
import { ImageType } from "lib/types/common";
import { AppContext } from "lib/context";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

interface ContentBlockProps {
  content: {
    name: string;
    content: string;
    icon: { url: string; altText: string };
  };
  className?: string;
}

const ContentBlock: FC<ContentBlockProps> = ({
  content = {},
  className = "",
}) => {
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  return (
    <>
      <div className={`${styles["content-container"]} ${styles[className]}`}>
        {content?.icon?.url && (
          <div className={styles["image"]}>
            <Image
              src={content.icon.url}
              alt={content.icon.altText}
              width={20}
              height={20}
            />
          </div>
        )}
        <p className={styles["heading"]}>{content?.name}</p>
        {content?.name === "IR Home Page" ||
        content?.name === "Fact Sheet" ||
        content?.name === "الصفحة الرئيسية لـ IR" ||
        content?.name === "بيان حقائق" ||
        content?.name === "Prospectus" ||
        content?.name === "نشرة" ||
        content?.name === "Announcements" ||
        content?.name === "الإعلانات" ||
        content?.name === "Financial Calendar" ||
        content?.name === "التقويم المالي" ||
        content?.name === "Stock Information" ||
        content?.name === "معلومات المخزون" ||
        content?.name === "Financial Information" ||
        content?.name === "معلومات مالية" ||
        content?.name === "Email Subscription Center" ||
        content?.name === "مركز الاشتراك بالبريد الإلكتروني" ? (
          appState?.lang === "en" ? (
            <iframe
              title="Scrolling Iframe"
              src="https://ksatools.eurolandir.com/tools/ticker/scrolling/?companycode=sa-lazurde&amp;v=scrolling2021&amp;lang=en-gb"
              width="100%"
              height={width > desktopScreenSize ? "25px" : "40px"}
              scrolling="no"
              style={{
                border: 0,
                fontSize: width > desktopScreenSize ? "15px" : "13px",
              }}
            >
              <br />
            </iframe>
          ) : (
            <iframe
              title="Scrolling Iframe"
              src="https://ksatools.eurolandir.com/tools/ticker/scrolling/?companycode=sa-lazurde&amp;v=scrolling2021&amp;lang=ar-ae"
              width="100%"
              height={width > desktopScreenSize ? "25px" : "40px"}
              scrolling="no"
              style={{
                border: 0,
                fontSize: width > desktopScreenSize ? "15px" : "13px",
              }}
            >
              <br />
            </iframe>
          )
        ) : (
          <p
            className={styles["content"]}
            dangerouslySetInnerHTML={{ __html: content?.content }}
          ></p>
        )}
      </div>
    </>
  );
};
export default ContentBlock;
