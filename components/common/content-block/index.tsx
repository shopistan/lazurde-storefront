import React, { FC } from "react";
import Image from "next/image";
import styles from "./content-block.module.scss";
import { ImageType } from "lib/types/common";

interface ContentBlockProps {
  content: {
    name: string;
    content: string;
    icon: { url: string; altText: string };
  };
}

const ContentBlock: FC<ContentBlockProps> = ({ content = {} }) => {
  return (
    <>
      <div className={styles["content-container"]}>
        {content.icon?.url && (
          <div className={styles["image"]}>
            <Image
              src={content.icon.url}
              alt={content.icon.altText}
              width={16}
              height={16}
            />
          </div>
        )}
        <p className={styles["heading"]}>{content?.name}</p>
        {content?.name === "IR Home Page" || content?.name === "Fact Sheet" ? (
          <iframe
            src="https://ksatools.eurolandir.com/tools/ticker/scrolling/?companycode=sa-lazurde&amp;v=scrolling2021&amp;lang=en-gb"
            width="100%"
            height="25px"
            style={{ border: 0, fontSize: "15px" }}
          >
            <br />
          </iframe>
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
