/* eslint-disable react/no-children-prop */
import React, { FC, useState, useContext, useEffect } from "react";
import ContentBlock from "../content-block";
import Image from "next/image";
import Label from "../ui/label";
import { ImageType } from "lib/types/common";
import styles from "./term-condition.module.scss";
import Accordion from "components/common/ui/accordion/Accordion";
import BackArrow from "components/icons/BackArrow";
import { useRouter } from "next/router";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

type HyperLinksProps = {
  name?: string | "";
  content?: string | "";
  icon?: ImageType;
  width?: string | "";
  height?: string | "";
  accordion?: AccordionProps[];
};

type _HyperLinksProps = {
  name?: string | "";
  content?: string | "";
  accordion?: _AccordionProps[];
};

type AccordionProps = {
  heading?: string | "";
  text?: string | "";
};

type _AccordionProps = {
  heading?: string | "";
  text?: string | "";
};

interface TermCondtionProps {
  hyperLinks?: HyperLinksProps[];
  sideBarBgcolor?: string | "";
  contentBgcolor?: string | "";
  title?: string | "";
}

const TermCondtion: FC<TermCondtionProps> = ({
  hyperLinks,
  sideBarBgcolor,
  contentBgcolor,
  title,
}) => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const _accordion: _AccordionProps[] = t(
    "accordionProps",
    {},
    { returnObjects: true }
  );

  const _links: _HyperLinksProps[] = t(
    "linksProps",
    {},
    { returnObjects: true }
  );
  const router = useRouter();
  const [objects, setObjects] = useState({
    accordion: hyperLinks[0].accordion || [],
    name: hyperLinks[0]?.name || "",
    content: hyperLinks[0]?.content || "",
    icon: {
      url: hyperLinks[0]?.icon?.url || "",
      altText: hyperLinks[0]?.icon?.altText || "",
    },
  });

  useEffect(() => {
    setObjects({
      accordion: hyperLinks[0].accordion || [],
      name: appState.lang == "en" ? hyperLinks[0]?.name : _links[0].name,
      content:
        appState.lang == "en" ? hyperLinks[0]?.content : _links[0].content,
      icon: {
        url: hyperLinks[0]?.icon?.url,
        altText: hyperLinks[0]?.icon?.altText,
      },
    });
  }, [appState.lang]);

  console.log("object", objects);

  return (
    <div className={styles["term-comtainer"]}>
      <Label className={styles["term-heading"]}>
        {appState?.lang == "en" ? title : t("termTitle")}
      </Label>
      {objects?.name && (
        <div className={styles["bread-crumb_item"]}>
          <Link href={`/help-centre`}>
            <a>
              {appState?.lang === "en"
                ? `Help Centre /`
                : "/ تائفلا عيمج فشتكاا"}
            </a>
          </Link>
          <Label>
            {appState?.lang === "en" ? objects.name : " ةيسيئرلا ةحفصلا"}
          </Label>
        </div>
      )}
      <div className={styles["term-section"]}>
        <div
          className={styles["term-left"]}
          style={{ backgroundColor: sideBarBgcolor }}
        >
          {hyperLinks &&
            hyperLinks.map((object, index) => {
              const {
                icon,
                name,
                content,
                width,
                height,
                accordion = [],
              } = object;

              return (
                <div
                  className={styles["term-block"]}
                  key={index}
                  onClick={() => {
                    setObjects({
                      accordion: accordion,
                      content:
                        appState.lang == "en" ? content : _links[index].content,
                      name: appState.lang == "en" ? name : _links[index].name,
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
                  <Label>
                    {appState?.lang === "en" ? name : _links[index].name}
                  </Label>
                </div>
              );
            })}
        </div>
        <div className={styles["term-right-container"]}>
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
              {appState?.lang == "en" ? "Back To Help centre" : "ءيش لك قوست"}
            </button>
          </div>
          <div
            className={styles["term-right"]}
            style={{ backgroundColor: contentBgcolor }}
          >
            <ContentBlock key={Math.random()} content={objects} />
          </div>
          <div
            className={styles["term-right"]}
            style={{ backgroundColor: contentBgcolor }}
          >
            {objects?.accordion && objects?.accordion?.length > 0 && (
              <div className={styles["accordion-block"]}>
                {objects?.accordion &&
                  objects?.accordion.length > 0 &&
                  objects?.accordion.map((object, index) => {
                    const { heading, text } = object;
                    return (
                      <Accordion
                        key={index}
                        className={`accordion-help`}
                        heading={
                          appState.lang == "en"
                            ? object?.heading
                            : _accordion[index].heading
                        }
                        children={
                          appState.lang == "en" ? (
                            <p
                              key={Math.random()}
                              dangerouslySetInnerHTML={{
                                __html: object?.text,
                              }}
                            ></p>
                          ) : (
                            _accordion[index].text
                          )
                        }
                        arrowDown={true}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div className={styles["back-block"]}>
            <button className={styles["button"]}>
              <Image src={"/question.png"} width={20} height={20} />
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
