import React, { FC, useState, useContext, useEffect } from "react";
import Label from "../ui/label";
import Button from "../ui/button";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./help-category.module.scss";
import Whatsapp from "components/icons/Whatsapp";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import FeedbackPopUp from "../feedback-popup";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";

type CategoryProps = {
  bgColor?: string | "";
  mobileBgColor?: string | "";
  title?: string | "";
  text?: string | "";
  details?: boolean;
  link?: string | "";
  button?: string | "";
  tNumber?: string | "";
  vNumber?: string | "";
  crNumber?: string | "";
  image?: ImageType;
  imageText?: string | "";
  email?: string | "";
};

type _CategoryProps = {
  title?: string | "";
  text?: string | "";
  link?: string | "";
  button?: string | "";
  tNumber?: string | "";
  vNumber?: string | "";
  crNumber?: string | "";
};

interface HelpCategoryProps {
  mainImage: ImageType;
  heading: string | "";
  categories: CategoryProps[];
  whatsappSa?: string | "";
  whatsappEg?: string | "";
  whatsappAe?: string | "";
}

const HelpCategory: FC<HelpCategoryProps> = ({
  mainImage = {},
  heading = "",
  categories = [],
  whatsappAe = "+966553561501",
  whatsappEg = "+201212777724",
  whatsappSa = "+966553561501",
}) => {
  const [width] = useWindowSize();
  const router = useRouter();
  const [regionDetails, setRegionDetails] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const handleClick = () => {
    setModalOpen(true);
  };

  const onclose = () => {
    setModalOpen(false);
  };

  const _categories: _CategoryProps[] = t(
    "categories",
    {},
    { returnObjects: true }
  );

  const handleLinks = () => {
    if (appState?.region == "sa") {
      router.push(
        `https://web.whatsapp.com/send?phone=${whatsappSa}&text=Hello!%20I%20am%20interested%20in%20your%20product`
      );
    } else if (appState?.region == "ae") {
      router.push(
        `https://web.whatsapp.com/send?phone=${whatsappAe}&text=Hello!%20I%20am%20interested%20in%20your%20product`
      );
    } else {
      router.push(
        `https://web.whatsapp.com/send?phone=${whatsappEg}&text=Hello!%20I%20am%20interested%20in%20your%20product`
      );
    }
  };

  useEffect(() => {
    if (appState?.region == "sa") {
      setRegionDetails(whatsappSa);
    } else if (appState?.region == "ae") {
      setRegionDetails(whatsappAe);
    } else {
      setRegionDetails(whatsappEg);
    }
  }, [appState?.region]);

  return (
    <>
      <div className={styles["category-container"]}>
        {mainImage.url && (
          <Image
            className={styles["category-mainImage"]}
            src={mainImage?.url || ""}
            alt={mainImage.altText || ""}
            layout="responsive"
            width={width > desktopScreenSize ? 1280 : 375}
            height={width > desktopScreenSize ? 308 : 131}
          />
        )}
        {heading && (
          <Label className={styles["contact-heading"]}>
            {appState?.lang === "en" ? heading : t("helpHeading")}
          </Label>
        )}
        <div className={styles["category-block"]}>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => {
              const {
                title,
                text,
                details,
                imageText,
                button,
                tNumber,
                vNumber,
                crNumber,
                bgColor,
                mobileBgColor,
                email,
              } = category;
              return (
                <div
                  key={index}
                  className={styles["category-section"]}
                  style={{
                    backgroundColor:
                      width > desktopScreenSize ? bgColor : mobileBgColor,
                  }}
                >
                  <Label className={styles["category-title"]}>
                    {appState?.lang == "en" ? title : _categories[index].title}
                  </Label>
                  <Label className={styles["category-text"]}>
                    {appState?.lang == "en" ? text : _categories[index].text}
                  </Label>
                  {email && (
                    <Label className={styles["category-details"]}>
                      {email}
                    </Label>
                  )}
                  {details && (
                    <Label className={styles["category-details"]}>
                      {regionDetails}
                    </Label>
                  )}
                  {imageText && (
                    <div
                      className={styles["category-imageBlock"]}
                      onClick={() => {
                        handleLinks();
                      }}
                    >
                      <Whatsapp />
                      <Label className={styles["category-imageText"]}>
                        {imageText}
                      </Label>
                    </div>
                  )}
                  {button && (
                    <Button
                      onClick={handleClick}
                      className={styles["category-button"]}
                    >
                      {appState?.lang == "en"
                        ? button
                        : _categories[index].button}
                    </Button>
                  )}
                  {tNumber && vNumber && crNumber && (
                    <div className={styles["category-number"]}>
                      <Label className={styles["category-number"]}>
                        {appState?.lang == "en"
                          ? tNumber
                          : _categories[index].tNumber}
                      </Label>
                      <Label className={styles["category-number"]}>
                        {appState?.lang == "en"
                          ? vNumber
                          : _categories[index].vNumber}
                      </Label>
                      <Label className={styles["category-number"]}>
                        {appState?.lang == "en"
                          ? crNumber
                          : _categories[index].crNumber}
                      </Label>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <FeedbackPopUp
        heading="Send Feedback"
        open={modalOpen}
        onClose={onclose}
      />
    </>
  );
};
export default HelpCategory;
