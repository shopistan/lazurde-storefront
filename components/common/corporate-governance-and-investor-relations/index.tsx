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
import useWindowSize from "lib/utils/useWindowSize";
import { mobileScreenSize } from "lib/utils/common";

type CGIRPagesProps = {
  name?: string | "";
  content?: string | "";
  icon?: ImageType;
  width?: string | "";
  height?: string | "";
  moreContent?: MoreContentProps[];
};

type _CGIRProps = {
  name?: string | "";
  content?: string | "";
  icon?: ImageType;
  width?: string | "";
  height?: string | "";
  moreContent?: MoreContentProps[];
  engName?: string;
};

type MoreContentProps = {
  heading?: string | "";
  text?: string | "";
  image?: ImageType;
  imageTitle?: string;
  pdfUrl?: string;
};

interface CGIRProps {
  cgirPages?: CGIRPagesProps[];
  sideBarBgcolor?: string | "";
  contentBgcolor?: string | "";
  title?: string | "";
}

const CGIR: FC<CGIRProps> = ({
  cgirPages,
  sideBarBgcolor,
  contentBgcolor,
  title,
}) => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [showPolicies, setShowPolicies] = useState(false);
  const [width] = useWindowSize();

  console.log("cgir", cgirPages);

  const _links: _CGIRProps[] = t("cgirProps", {}, { returnObjects: true });
  const router = useRouter();
  const [currentObject, setCurrentObject] = useState({
    moreContent: cgirPages[0]?.moreContent || [],
    name: cgirPages[0]?.name || null,
    engName: cgirPages[0]?.name || null,
    content: cgirPages[0]?.content || "",
    icon: {
      url: cgirPages[0]?.icon?.url || "",
      altText: cgirPages[0]?.icon?.altText || "",
    },
  });

  useEffect(() => {
    setCurrentObject({
      moreContent:
        appState.lang == "en"
          ? cgirPages[0]?.moreContent
          : _links[0]?.moreContent,
      content:
        appState.lang == "en" ? cgirPages[0]?.content : _links[0]?.content,
      name: appState.lang == "en" ? cgirPages[0]?.name : _links[0]?.name,
      icon: cgirPages[0]?.icon,
      engName: cgirPages[0]?.name,
    });
  }, [appState.lang]);

  //   console.log("object", objects);

  return (
    <div className={styles["cgir-container"]}>
      <Label className={styles["cgir-heading"]}>
        {appState?.lang == "en" ? title : t("cgirTitle")}
      </Label>
      <div className={styles["cgir-section"]}>
        <div
          className={styles["cgir-left-sidebar"]}
          style={{ backgroundColor: sideBarBgcolor }}
          data-opened={showPolicies}
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
                    setShowPolicies(false);
                    setCurrentObject({
                      moreContent:
                        appState.lang == "en"
                          ? moreContent
                          : _links[index].moreContent,
                      content:
                        appState.lang == "en"
                          ? content
                          : _links[index]?.content,
                      name: appState.lang == "en" ? name : _links[index]?.name,
                      engName: name,
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
                    {appState?.lang === "en" ? name : _links[index]?.name}
                    {/* {appState?.lang === "en" ? name : name} */}
                  </Label>
                </div>
              );
            })}
        </div>
        <div
          className={styles["cgir-right-container"]}
          data-opened={showPolicies}
        >
          <div
            className={styles["back-button"]}
            style={{ backgroundColor: contentBgcolor }}
            onClick={() => {
              setShowPolicies(true);
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
            {currentObject && (
              <div className={styles["more-content-block"]}>
                {currentObject?.name === "Fact Sheet" ||
                currentObject?.name === "بيان حقائق" ? (
                  appState?.lang === "en" ? (
                    <iframe
                      id="euroland_frame_id"
                      title="Euroland Fact Sheet iFrame"
                      className="EurolandTool fact-sheet-iframe"
                      style={{
                        // background: "transparent",
                        // maxWidth: "650px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "2700px",
                        width: "100%",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                      }}
                      src="https://tools.euroland.com/FactSheet/sa-lazurde_2021/FactSheetHtml.asp?lang=english"
                      width="100%"
                      height="982"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  ) : (
                    <iframe
                      id="euroland_frame_id"
                      title="Euroland Fact Sheet iFrame"
                      className="EurolandTool fact-sheet-iframe"
                      style={{
                        // background: "transparent",
                        // maxWidth: "650px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "2700px",
                        width: "100%",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                      }}
                      src="https://tools.euroland.com/FactSheet/sa-lazurde_2021/FactSheetHtml.asp?lang=arabic"
                      width="100%"
                      height="982"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  )
                ) : currentObject?.name === "Announcements" ||
                  currentObject?.name === "الإعلانات" ? (
                  appState?.lang === "en" ? (
                    <iframe
                      id="euroland_frame_id"
                      className="EurolandTool"
                      style={{
                        background: "transparent",
                        minWidth: "100%",
                        width: "1px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "1500px",
                      }}
                      src="https://ksatools.eurolandir.com/tools/pressreleases/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                      width="100%"
                      height="1262"
                      frameBorder="0"
                      scrolling="no"
                    >
                      <br />
                    </iframe>
                  ) : (
                    <iframe
                      id="euroland_frame_id"
                      className="EurolandTool"
                      style={{
                        background: "transparent",
                        minWidth: "100%",
                        width: "1px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "1500px",
                      }}
                      src="https://ksatools.eurolandir.com/tools/pressreleases/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                      width="100%"
                      height="1262"
                      frameBorder="0"
                      scrolling="no"
                    >
                      <br />
                    </iframe>
                  )
                ) : currentObject?.name === "Financial Calendar" ||
                  currentObject?.name === "التقويم المالي" ? (
                  appState?.lang === "en" ? (
                    <iframe
                      id="euroland_frame_id"
                      className="EurolandTool"
                      style={{
                        background: "transparent",
                        maxWidth: "700px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "840px",
                      }}
                      src="https://ksatools.eurolandir.com/tools/fincalendar2/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                      width="100%"
                      height="807"
                      frameBorder="0"
                      scrolling="no"
                    >
                      <br />
                    </iframe>
                  ) : (
                    <iframe
                      id="euroland_frame_id"
                      className="EurolandTool"
                      style={{
                        background: "transparent",
                        maxWidth: "700px",
                        maxHeight: "none",
                        minHeight: "0px",
                        height: "840px",
                      }}
                      src="https://ksatools.eurolandir.com/tools/fincalendar2/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                      width="100%"
                      height="807"
                      frameBorder="0"
                      scrolling="no"
                    >
                      <br />
                    </iframe>
                  )
                ) : currentObject?.name === "Prospectus" ||
                  currentObject?.name === "نشرة" ? (
                  <div className={styles["images-wrapper"]}>
                    {currentObject?.moreContent?.length > 0 &&
                      currentObject?.moreContent?.map((obj, index) => {
                        const { image, imageTitle, pdfUrl } = obj;
                        return (
                          <div key={index} className={styles["image-block"]}>
                            <a href={pdfUrl} target="_blank" rel="noreferrer">
                              <Image
                                alt=""
                                src={image?.url}
                                width={213}
                                height={276}
                                // onClick={() =>}
                              />
                            </a>
                            <span>{imageTitle || "Image"}</span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  currentObject?.moreContent &&
                  currentObject?.moreContent?.length > 0 &&
                  currentObject?.moreContent?.map((obj, index) => {
                    const { heading, text } = obj;
                    return (
                      <div key={index}>
                        {heading && <span>{heading}</span>}
                        {/* {text && <p>{text}</p>} */}
                       <p key={Math.random()}
                        dangerouslySetInnerHTML={{__html: text}}></p>
                      </div>
                    );
                  })
                )}
                {currentObject?.name === "IR Home Page" ||
                currentObject?.name === "الصفحة الرئيسية لـ IR" ? (
                  appState?.lang === "en" ? (
                    <iframe
                      id="euroland_frame_id"
                      title="Euroland Homepage iFrame"
                      className="EurolandTool"
                      src="https://ksatools.eurolandir.com/tools/ticker/html/?companycode=sa-lazurde&amp;v=static2021&amp;lang=en-gb"
                      width="250"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  ) : (
                    <iframe
                      id="euroland_frame_id"
                      title="Euroland Homepage iFrame"
                      className="EurolandTool"
                      src="https://ksatools.eurolandir.com/tools/ticker/html/?companycode=sa-lazurde&amp;v=static2021&amp;lang=ar-ae"
                      width="250"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  )
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className={styles["back-block"]}>
          <button className={styles["button"]}>
            <Image src={"/question.png"} width={20} height={20} alt="" />
            <p>
              {appState.lang == "en" ? "Have a question?" : t("customerButton")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CGIR;
