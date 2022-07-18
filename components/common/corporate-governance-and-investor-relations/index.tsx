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
import { desktopScreenSize } from "lib/utils/common";
import Script from "next/script";
import InfoSelector from "../info-selector";
import { dividendHistoryAR } from "lib/mock-data/data";
import Button from "components/common/ui/button";
import Tabs from "components/common/tabs";

type CGIRPagesProps = {
  name?: string | "";
  content?: string | "";
  icon?: ImageType;
  width?: string | "";
  height?: string | "";
  moreContent?: MoreContentProps[];
  dividend?: DividendProps[];
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

type DividendProps = {
  heading?: string | "";
  text?: string | "";
  dividendHistory?: DividendHistoryProps[];
  content?: string;
};

type DividendHistoryProps = {
  heading?: string | "";
  year?: string | "";
  value?: string | "";
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
  const [selectedVal, setSelectedVal] = useState("Share Overview");
  const [selectVal, setSelectVal] = useState("Quarterly Financial Statements");
  const [size] = useWindowSize();

  const _links: _CGIRProps[] = t("cgirProps", {}, { returnObjects: true });
  const router = useRouter();
  const [currentObject, setCurrentObject] = useState({
    moreContent: cgirPages[0]?.moreContent || [],
    dividend: cgirPages[0]?.dividend || [],
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
      moreContent: cgirPages[0]?.moreContent,
      dividend: cgirPages[0]?.dividend || [],
      content:
        appState.lang == "en" ? cgirPages[0]?.content : _links[0]?.content,
      name: appState.lang == "en" ? cgirPages[0]?.name : _links[0]?.name,
      icon: cgirPages[0]?.icon,
      engName: cgirPages[0]?.name,
    });

    setSelectedVal(
      appState.lang === "en" ? "Share Overview" : "نظرة عامة على حصة"
    );

    setSelectVal(
      appState.lang === "en"
        ? "Quarterly Financial Statements"
        : "البيانات المالية ربع السنوية"
    );
  }, [appState.lang]);

  const headingArr: string[] | undefined = [];
  const yearArr: string[] | undefined = [];
  let contentObj: any = {};

  return (
    <>
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
                  dividend = [],
                } = page;
                return (
                  <div
                    className={styles["page-block"]}
                    key={index}
                    onClick={() => {
                      setShowPolicies(false);
                      setCurrentObject({
                        moreContent: moreContent,
                        dividend: dividend,
                        content:
                          appState.lang == "en"
                            ? content
                            : _links[index]?.content,
                        name:
                          appState.lang == "en" ? name : _links[index]?.name,
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
                          width={width || 20}
                          height={height || 20}
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
                  ? `Back To ${appState.brand} Policies`
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
              className={styles["page-rights"]}
              style={{ backgroundColor: contentBgcolor }}
            ></div>
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
                        id="euroland_frame_id_fact_sheet"
                        className="EurolandTool fact-sheet-iframe"
                        src="https://tools.euroland.com/FactSheet/sa-lazurde_2021/FactSheetHtml.asp?lang=english"
                        style={{
                          width: "100%",
                          height: "500",
                        }}
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
                          height:
                            size > desktopScreenSize
                              ? "3850px"
                              : size > 413
                              ? "4150px"
                              : "3500px",
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
                          height:
                            size > desktopScreenSize
                              ? "1500px"
                              : size > 413
                              ? "1700"
                              : "1800px",
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
                          height:
                            size > desktopScreenSize
                              ? "1500px"
                              : size > 413
                              ? "1700"
                              : "1800px",
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
                          height:
                            size > desktopScreenSize
                              ? "900px"
                              : size > 413
                              ? "1000"
                              : "1000px",
                        }}
                        src="https://ksatools.eurolandir.com/tools/fincalendar2/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                        width="100%"
                        height={
                          size > desktopScreenSize
                            ? "840px"
                            : size > 413
                            ? "1000"
                            : "1000px"
                        }
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
                  ) : currentObject?.name === "Email Subscription Center" ||
                    currentObject?.name ===
                      "مركز الاشتراك بالبريد الإلكتروني" ? (
                    appState?.lang === "en" ? (
                      <div className={styles["subscription-iframe"]}>
                        <iframe
                          id="euroland_frame_id"
                          className="EurolandTool"
                          style={{
                            padding: 0,
                            background: "transparent",
                            maxWidth: "700px",
                            maxHeight: "none",
                            minHeight: "0px",
                            height:
                              size > desktopScreenSize
                                ? "600px"
                                : size > 413
                                ? "650"
                                : "650px",
                          }}
                          src="https://ksatools.eurolandir.com/tools/subscriptioncentre2/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                          width="100%"
                          height={
                            size > desktopScreenSize
                              ? "840px"
                              : size > 413
                              ? "1000"
                              : "1000px"
                          }
                          frameBorder="0"
                          scrolling="no"
                        >
                          <br />
                        </iframe>
                      </div>
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
                        src="https://ksatools.eurolandir.com/tools/subscriptioncentre2/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                        width="100%"
                        height="807"
                        frameBorder="0"
                        scrolling="no"
                      >
                        <br />
                      </iframe>
                    )
                  ) : currentObject?.name === "Stock Information" ||
                    currentObject?.name === "معلومات المخزون" ? (
                    appState?.lang === "en" ? (
                      <>
                        <InfoSelector
                          className={styles["info-selector-dropdown"]}
                          setSelectedVal={setSelectedVal}
                          setSelectVal={setSelectVal}
                          currentObject={currentObject}
                        />
                        {selectedVal === "Share Overview" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "900px"
                                  : size > 413
                                  ? "1000"
                                  : "1000px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/shareseries/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "900px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "Share Alerts" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1450px"
                                  : size > 413
                                  ? "1500"
                                  : "1500px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/sharealert/?cid=90735&amp;companycode=sa-lazurde&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "1450px"
                                : size > 413
                                ? "1500"
                                : "1500px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "Share Graph" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "2000px"
                                  : size > 413
                                  ? "1800"
                                  : "1800px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/sharegraph/?s=2245&amp;companycode=sa-lazurde&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "2000px"
                                : size > 413
                                ? "1800"
                                : "1800px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "Investment Calculator" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "500px"
                                  : size > 413
                                  ? "700"
                                  : "700px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/investmentcal2/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "500px"
                                : size > 413
                                ? "700"
                                : "700px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "Share Price Look-Up" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "700px"
                                  : size > 413
                                  ? "500"
                                  : "500px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/splookup/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "700px"
                                : size > 413
                                ? "500"
                                : "500px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                      </>
                    ) : (
                      <>
                        <InfoSelector
                          className={styles["info-selector-dropdown"]}
                          setSelectedVal={setSelectedVal}
                          setSelectVal={setSelectVal}
                          currentObject={currentObject}
                        />
                        {selectedVal === "نظرة عامة على حصة" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1075px"
                                  : size > 413
                                  ? "800"
                                  : "800px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/shareseries/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "تنبيهات المشاركة" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1450px"
                                  : size > 413
                                  ? "1000"
                                  : "1000px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/sharealert/?cid=90735&amp;companycode=sa-lazurde&amp;lang=ar-ae"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}

                        {selectedVal === "مشاركة الرسم البياني" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "2050px"
                                  : size > 413
                                  ? "1400"
                                  : "1400px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/sharegraph/?s=2245&amp;companycode=sa-lazurde&amp;lang=ar-ae"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}

                        {selectedVal === "حاسبة الاستثمار" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "500px"
                                  : size > 413
                                  ? "1000"
                                  : "1000px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/investmentcal2/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "700px"
                                : size > 413
                                ? "400"
                                : "400px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectedVal === "البحث عن سعر السهم" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "450px"
                                  : size > 413
                                  ? "1000"
                                  : "1000px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/splookup/?companycode=sa-lazurde&amp;v=2021&amp;lang=ar-ae"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "350"
                                : "350px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                      </>
                    )
                  ) : currentObject?.name === "Financial Information" ||
                    currentObject?.name === "معلومات مالية" ? (
                    appState?.lang === "en" ? (
                      <>
                        <InfoSelector
                          className={styles["info-selector-dropdown"]}
                          setSelectedVal={setSelectedVal}
                          setSelectVal={setSelectVal}
                          currentObject={currentObject}
                        />
                        {selectVal === "Quarterly Financial Statements" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;

                                return (
                                  <>
                                    {heading ===
                                      "Quarterly Financial Statements" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{
                                            width:
                                              size > desktopScreenSize
                                                ? "100%"
                                                : 150,
                                          }}
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 190
                                                  : 150
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 256
                                                  : 195.21
                                              }
                                              layout="responsive"
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                        {selectVal === "Annual Report" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;

                                return (
                                  <>
                                    {heading === "Annual Report" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 213
                                                  : 190
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 276
                                                  : 256
                                              }
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle || "Image"}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                        {selectVal === "Annual Key Figures" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1200px"
                                  : size > 413
                                  ? "650"
                                  : "650px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/ia/?companycode=sa-lazurde&amp;v=ad_2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal === "Quarterly Key Figures" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1150px"
                                  : size > 413
                                  ? "650"
                                  : "650px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/ia/?companycode=sa-lazurde&amp;v=qd_2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal === "Share Price Look-Up" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "700px"
                                  : size > 413
                                  ? "350"
                                  : "350px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/splookup/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal ===
                          "Minutes of General Assembly Meetings" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;

                                return (
                                  <>
                                    {heading ===
                                      "Minutes of General Assembly Meetings" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 213
                                                  : 190
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 276
                                                  : 256
                                              }
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle || "Image"}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <InfoSelector
                          className={styles["info-selector-dropdown"]}
                          setSelectedVal={setSelectedVal}
                          setSelectVal={setSelectVal}
                          currentObject={currentObject}
                        />
                        {selectVal === "البيانات المالية ربع السنوية" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;

                                return (
                                  <>
                                    {heading ===
                                      "البيانات المالية ربع السنوية" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{
                                            width:
                                              size > desktopScreenSize
                                                ? "100%"
                                                : 150,
                                          }}
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 190
                                                  : 150
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 256
                                                  : 195.21
                                              }
                                              layout="responsive"
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                        {selectVal === "تقرير سنوي" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;
                                return (
                                  <>
                                    {heading === "تقرير سنوي" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 213
                                                  : 190
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 276
                                                  : 256
                                              }
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle || "Image"}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                        {selectVal === "الأرقام السنوية الرئيسية" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1200px"
                                  : size > 413
                                  ? "650"
                                  : "650px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/ia/?companycode=sa-lazurde&amp;v=ad_2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal === "الأرقام الفصلية الرئيسية" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "1150px"
                                  : size > 413
                                  ? "650"
                                  : "650px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/ia/?companycode=sa-lazurde&amp;v=qd_2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal === "البحث عن سعر السهم" && (
                          <iframe
                            id="euroland_frame_id"
                            className="EurolandTool"
                            style={{
                              background: "transparent",
                              maxWidth: "700px",
                              maxHeight: "none",
                              minHeight: "0px",
                              height:
                                size > desktopScreenSize
                                  ? "700px"
                                  : size > 413
                                  ? "350"
                                  : "350px",
                            }}
                            src="https://ksatools.eurolandir.com/tools/splookup/?companycode=sa-lazurde&amp;v=2021&amp;lang=en-gb"
                            width="100%"
                            height={
                              size > desktopScreenSize
                                ? "840px"
                                : size > 413
                                ? "1000"
                                : "1000px"
                            }
                            frameBorder="0"
                            scrolling="no"
                          >
                            <br />
                          </iframe>
                        )}
                        {selectVal === "محاضر اجتماعات الجمعية العمومية" && (
                          <div className={styles["images-wrapper"]}>
                            {currentObject?.moreContent?.length > 0 &&
                              currentObject?.moreContent?.map((obj, index) => {
                                const { image, imageTitle, pdfUrl, heading } =
                                  obj;

                                return (
                                  <>
                                    {heading ===
                                      "محاضر اجتماعات الجمعية العمومية" && (
                                      <div
                                        key={index}
                                        className={styles["image-block"]}
                                      >
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {image?.url && (
                                            <Image
                                              alt=""
                                              src={image?.url || ""}
                                              width={
                                                size > desktopScreenSize
                                                  ? 213
                                                  : 190
                                              }
                                              height={
                                                size > desktopScreenSize
                                                  ? 276
                                                  : 256
                                              }
                                            />
                                          )}
                                        </a>
                                        <span>{imageTitle || "Image"}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        )}
                      </>
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
                                  width={size > desktopScreenSize ? 213 : 150}
                                  height={
                                    size > desktopScreenSize ? 276 : 195.21
                                  }
                                />
                              </a>
                              <span>{imageTitle || "Image"}</span>
                            </div>
                          );
                        })}
                    </div>
                  ) : currentObject?.name === "Dividends" ||
                    currentObject?.name === "أرباح" ? (
                    <div className={styles["dividend-wrapper"]}>
                      {currentObject?.dividend?.length > 0 &&
                        currentObject?.dividend.map((data) => {
                          const { heading, content, text, dividendHistory } =
                            data;
                          return (
                            <>
                              <div className={styles["dividend-main"]}>
                                {appState?.lang === "en"
                                  ? heading
                                  : dividendHistoryAR[0]?.heading}
                                {}
                              </div>
                              <div className={styles["dividend-main-block"]}>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      appState?.lang === "en"
                                        ? text
                                        : dividendHistoryAR[0]?.text,
                                  }}
                                ></p>
                              </div>
                              {size > desktopScreenSize ? (
                                <div
                                  className={styles["dividend-table"]}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${headingArr.length}, auto)`,
                                    gridTemplateRows: `repeat(${yearArr.length}, auto)`,
                                    gap: 16,
                                  }}
                                >
                                  {dividendHistory?.length > 0 &&
                                    dividendHistory.map((history, index) => {
                                      const { heading, year, value } = history;
                                      const findHeading = headingArr?.find(
                                        (val) => val === heading
                                      );
                                      if (!findHeading) {
                                        headingArr.push(heading);
                                      }
                                      const findYear = yearArr?.find(
                                        (val) => val === year
                                      );
                                      if (!findYear) {
                                        yearArr.push(year);
                                      }

                                      const divHeading = headingArr?.findIndex(
                                        (val) => val === heading
                                      );
                                      const divYear = yearArr?.findIndex(
                                        (val) => val === year
                                      );

                                      return (
                                        <>
                                          <div
                                            key={index}
                                            className={
                                              styles["dividend-table-row"]
                                            }
                                            style={{
                                              gridColumn: divHeading + 2,
                                              gridRow: divYear + 2,
                                            }}
                                          >
                                            {value}
                                          </div>
                                          {dividendHistory?.length - 1 ===
                                            index && (
                                            <div
                                              className={
                                                styles["dividend-table-col"]
                                              }
                                              style={{
                                                gridColumn: 1,
                                                gridRow: 1,
                                              }}
                                            >
                                              {appState.lang === "en"
                                                ? "Year"
                                                : "سنة"}
                                            </div>
                                          )}
                                          {headingArr?.length > 0 &&
                                            dividendHistory?.length - 1 ===
                                              index &&
                                            headingArr.map((heading, index) => {
                                              return (
                                                <div
                                                  key={index}
                                                  className={
                                                    styles["dividend-table-col"]
                                                  }
                                                  style={{
                                                    gridColumn: `${index + 2}`,
                                                    gridRow: 1,
                                                  }}
                                                >
                                                  {heading}
                                                </div>
                                              );
                                            })}
                                          {yearArr?.length > 0 &&
                                            dividendHistory?.length - 1 ===
                                              index &&
                                            yearArr.map((years, index) => {
                                              return (
                                                <>
                                                  <div
                                                    key={index}
                                                    className={
                                                      styles[
                                                        "dividend-table-col"
                                                      ]
                                                    }
                                                    style={{
                                                      gridColumn: 1,
                                                      gridRow: `${index + 2}`,
                                                    }}
                                                  >
                                                    {years}
                                                  </div>
                                                </>
                                              );
                                            })}
                                        </>
                                      );
                                    })}
                                </div>
                              ) : (
                                <>
                                  <div>
                                    {dividendHistory?.length > 0 &&
                                      dividendHistory.map((history) => {
                                        const { heading, year, value } =
                                          history;
                                        const findYear = yearArr?.find(
                                          (val) => val === year
                                        );
                                        if (!findYear) {
                                          yearArr.push(year);
                                        }
                                        const divYear = yearArr?.findIndex(
                                          (val) => val === year
                                        );
                                        const matchedYear =
                                          dividendHistory?.find(
                                            (data) =>
                                              data?.year === yearArr[divYear]
                                          );

                                        contentObj = {
                                          ...contentObj,
                                          [matchedYear?.year]: {
                                            ...contentObj[matchedYear?.year],
                                            [heading]: value,
                                          },
                                        };
                                      })}
                                    <Tabs
                                      yearArr={yearArr}
                                      content={contentObj}
                                    />
                                  </div>
                                </>
                              )}

                              <div className={styles["dividend-main-block"]}>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      appState.lang === "en"
                                        ? content
                                        : dividendHistoryAR[0]?.content,
                                  }}
                                ></p>
                              </div>
                            </>
                          );
                        })}
                      <div className={styles["dividend-btn"]}>
                        <Button
                          buttonSize={"lr"}
                          buttonText={
                            appState.lang === "en"
                              ? t("Subscribe")
                              : t("الإشتراك")
                          }
                          onClick={() => {}}
                        ></Button>
                      </div>
                    </div>
                  ) : currentObject?.name === "Contact IR" ||
                    currentObject?.name === "الاتصال بـ IR" ? (
                    <div className={styles["text-wrapper"]}>
                      {currentObject?.moreContent?.length > 0 &&
                        currentObject?.moreContent?.map((obj, index) => {
                          const { text } = obj;
                          return (
                            <div key={index} className={styles["text-block"]}>
                              <p dangerouslySetInnerHTML={{ __html: text }}></p>
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
                          <p
                            key={Math.random()}
                            dangerouslySetInnerHTML={{ __html: text }}
                          ></p>
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
              {currentObject?.name != "Dividends" &&
              currentObject?.name != "أرباح" ? (
                <div className={styles["back-block"]}>
                  <button className={styles["button"]}>
                    <Image
                      src={"/question.png"}
                      width={20}
                      height={20}
                      alt=""
                    />
                    <p>
                      {appState.lang == "en"
                        ? "Have a question?"
                        : t("customerButton")}
                    </p>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {currentObject && currentObject?.name === "Fact Sheet" && (
        <>
          <Script
            type="text/javascript"
            src="http://tools.euroland.com/tools/common/eurolandiframeautoheight/eurolandtoolsintegrationobject.js"
          ></Script>
          <Script
            id={"euroland_frame_id_fact_sheet"}
            strategy="lazyOnload"
            type="text/javascript"
          >
            {`EurolandToolIntegrationObject.set('euroland_frame_id_fact_sheet')`}
          </Script>
        </>
      )}
    </>
  );
};
export default CGIR;
