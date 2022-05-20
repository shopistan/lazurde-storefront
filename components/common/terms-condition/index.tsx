import React, { FC, useState } from "react";
import ContentBlock from "../content-block";
import Image from "next/image";
import Label from "../ui/label";
import { ImageType } from "lib/types/common";
import styles from "./term-condition.module.scss";
import Accordion from "components/common/ui/accordion/Accordion";

type HyperLinksProps = {
  name: string | "";
  content: string | "";
  icon: ImageType;
  width: string | "";
  height: string | "";
};

type AccordionProps = {
  heading: string | "";
  text: string | "";
};

interface TermCondtionProps {
  hyperLinks: HyperLinksProps[];
  sideBarBgcolor: string | "";
  contentBgcolor: string | "";
  accordion: AccordionProps[];
  title: string | "";
}

const TermCondtion: FC<TermCondtionProps> = ({
  hyperLinks,
  sideBarBgcolor,
  contentBgcolor,
  accordion,
  title,
}) => {
  const [objects, setObjects] = useState({
    name: hyperLinks[0].name,
    content: hyperLinks[0].content,
    icon: { url: hyperLinks[0].icon.url, altText: hyperLinks[0].icon.altText },
  });

  return (
    <div className={styles["term-comtainer"]}>
      <Label className={styles["term-heading"]}>{title}</Label>
      <div className={styles["term-section"]}>
        <div
          className={styles["term-left"]}
          style={{ backgroundColor: sideBarBgcolor }}
        >
          {hyperLinks &&
            hyperLinks.map((object, index) => {
              const { icon, name, content, width, height } = object;
              return (
                <div
                  className={styles["term-block"]}
                  key={index}
                  onClick={() => {
                    setObjects({
                      content: content,
                      name: name,
                      icon: {
                        url: icon?.url,
                        altText: icon?.altText,
                      },
                    });
                  }}
                >
                  {icon?.url && (
                    <div className={styles["term-image"]}>
                      <Image
                        src={icon?.url}
                        alt={icon?.altText}
                        width={width || 40}
                        height={height || 40}
                      />
                    </div>
                  )}
                  <Label>{name}</Label>
                </div>
              );
            })}
        </div>
        <div
          className={styles["term-right"]}
          style={{ backgroundColor: contentBgcolor }}
        >
          <ContentBlock content={objects} />
        </div>
        {accordion && accordion.length > 0 && (
          <div>
            {accordion &&
              accordion.length > 0 &&
              accordion.map((object, index) => {
                const { heading, text } = object;
                return (
                  <Accordion
                    key={index}
                    className={"accordion-help"}
                    heading={heading}
                    children={text}
                    arrowIcon={true}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default TermCondtion;
