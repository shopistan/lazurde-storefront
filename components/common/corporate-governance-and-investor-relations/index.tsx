/* eslint-disable react/no-children-prop */
import React, { FC, useState, useContext, useEffect } from "react";
import ContentBlock from "../content-block";
import Image from "next/image";
import Label from "../ui/label";
import { ImageType } from "lib/types/common";
import styles from "./cgir.module.scss";
import Accordion from "components/common/ui/accordion/Accordion";
import BackArrow from "components/icons/BackArrow";
import { useRouter } from "next/router";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

type CGIRPagesProps = {
  name?: string | "";
  content?: string | "";
  icon?: ImageType;
  width?: string | "";
  height?: string | "";
  moreContent?: MoreContentProps[];
};

// type _HyperLinksProps = {
//   name?: string | "";
//   content?: string | "";
//   accordion?: _AccordionProps[];
// };

type MoreContentProps = {
  heading?: string | "";
  text?: string | "";
};

// type _AccordionProps = {
//   heading?: string | "";
//   text?: string | "";
// };

interface TermCondtionProps {
  cgirPages?: CGIRPagesProps[];
  sideBarBgcolor?: string | "";
  contentBgcolor?: string | "";
  title?: string | "";
}

const TermCondtion: FC<TermCondtionProps> = ({
  cgirPages,
  sideBarBgcolor,
  contentBgcolor,
  title,
}) => {
  console.log("cgirPages", title, cgirPages);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  //   const _accordion: _AccordionProps[] = t(
  //     "accordionProps",
  //     {},
  //     { returnObjects: true }
  //   );

  //   const _links: _HyperLinksProps[] = t(
  //     "linksProps",
  //     {},
  //     { returnObjects: true }
  //   );
  const router = useRouter();
  const [currentObject, setCurrentObject] = useState({
    moreContent: cgirPages[0]?.moreContent || [],
    name: cgirPages[0]?.name || "",
    content: cgirPages[0]?.content || "",
    icon: {
      url: cgirPages[0]?.icon?.url || "",
      altText: cgirPages[0]?.icon?.altText || "",
    },
  });

  //   useEffect(() => {
  //     setObjects({
  //       accordion: hyperLinks[0].accordion || [],
  //       name: appState.lang == "en" ? hyperLinks[0]?.name : _links[0].name,
  //       content:
  //         appState.lang == "en" ? hyperLinks[0]?.content : _links[0].content,
  //       icon: {
  //         url: hyperLinks[0]?.icon?.url,
  //         altText: hyperLinks[0]?.icon?.altText,
  //       },
  //     });
  //   }, [appState.lang]);

  //   console.log("object", objects);

  return (
    <div className={styles["cgir-container"]}>
      <Label className={styles["cgir-heading"]}>
        {appState?.lang == "en" ? title : t("termTitle")}
      </Label>
      <div className={styles["cgir-section"]}>
        <div
          className={styles["cgir-left-sidebar"]}
          style={{ backgroundColor: sideBarBgcolor }}
        >
          {cgirPages &&
            cgirPages?.map((page, index) => {
              const {
                icon,
                name,
                content,
                width,
                height,
                // pageUrl,
                moreContent = [],
              } = page;

              return (
                <div
                  className={styles["page-block"]}
                  key={index}
                  onClick={() => {
                    setCurrentObject({
                      moreContent: moreContent,
                      //   content:
                      //     appState.lang == "en" ? content : _links[index].content,
                      //   name: appState.lang == "en" ? name : _links[index].name,
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
                    <div className={styles["page-image"]}>
                      <Image
                        src={icon?.url}
                        alt={icon?.altText}
                        width={width || 40}
                        height={height || 40}
                      />
                    </div>
                  )}
                  <Label>
                    {/* {appState?.lang === "en" ? name : _links[index].name} */}
                    {appState?.lang === "en" ? name : name}
                  </Label>
                </div>
              );
            })}
        </div>
        <div className={styles["cgir-right-container"]}>
          <div
            className={styles["back-button"]}
            style={{ backgroundColor: contentBgcolor }}
            onClick={() => {
              router.push("/help-centre");
            }}
          >
            <div>
              <BackArrow />
            </div>
            <button className={styles["back-content"]}>
              {appState?.lang == "en"
                ? "Back To L'azurde Policies"
                : "ءيش لك قوست"}
            </button>
          </div>
          <div
            className={styles["page-right"]}
            style={{ backgroundColor: contentBgcolor }}
          >
            <ContentBlock key={Math.random()} content={currentObject} />
          </div>
          <div
            className={styles["page-right-second"]}
            style={{ backgroundColor: contentBgcolor }}
          >
            {currentObject?.moreContent &&
              currentObject?.moreContent?.length > 0 && (
                <div className={styles["more-content-block"]}>
                  {currentObject?.moreContent &&
                    currentObject?.moreContent?.length > 0 &&
                    currentObject?.moreContent?.map((obj, index) => {
                      const { heading, text } = obj;
                      return (
                        <div key={index}>
                          {heading && <span>{heading}</span>}
                          {text && <p>{text}</p>}
                        </div>
                      );
                    })}
                  {currentObject?.name === "IR Home Page" ? (
                    <iframe
                      id="euroland_frame_id"
                      className="EurolandTool"
                      src="https://ksatools.eurolandir.com/tools/ticker/html/?companycode=sa-lazurde&amp;v=static2021&amp;lang=en-gb"
                      width="250"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  ) : null}
                </div>
              )}
          </div>
          <div className={styles["back-block"]}>
            <button className={styles["button"]}>
              <Image src={"/question.png"} width={20} height={20} alt="" />
              <p>
                {appState.lang == "en"
                  ? "Have a question?"
                  : t("customerButton")}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TermCondtion;
