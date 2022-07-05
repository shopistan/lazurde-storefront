import React, { FC, useState, useContext } from "react";
import Label from "components/common/ui/label";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./customer-service.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

type ServicesProps = {
  icon?: { url: ""; altText: "" };
  iconTitle?: string | "";
  iconText?: string | "";
  url?: string | "";
  width?: string | number;
  height?: string | number;
};

type _ServiceProps = {
  iconTitle?: string | "";
  iconText?: string | "";
};

interface CustomerServiceProps {
  bannerImage?: { url: ""; altText: "" };
  heading?: string | "";
  services?: ServicesProps[] | [];
  inputIcon?: { url: ""; altText: "" };
  title?: string | "";
}

const CustomerService  = ({
  title,
  bannerImage,
  heading,
  services,
  inputIcon,
}: CustomerServiceProps): JSX.Element=> {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const _servicesProps: _ServiceProps[] = t(
    "servicesProps",
    {},
    { returnObjects: true }
  );
  const [size] = useWindowSize();
  const [filterBlock, setFilterBlock] = useState(services);
  const router = useRouter();
  const handleFilter = (event: any) => {
    const inputValue = event.target.value.toLowerCase();
    const nameFilter = services.filter(
      (val) =>
        val?.iconTitle?.toString().toLowerCase().indexOf(inputValue) === 0
    );
    setFilterBlock(nameFilter);
  };

  return (
    <div className={styles["services-container"]}>
      <div className={styles["services_search-section"]}>
        <div>
          {bannerImage?.url && (
            <Image
              className={styles["services_banner-image"]}
              src={bannerImage?.url}
              alt={bannerImage?.altText}
              width={size > desktopScreenSize ? 1280 : 375}
              height={size > desktopScreenSize ? 308 : 120}
              layout="responsive"
            />
          )}
        </div>
        <div className={styles["text-section"]}>
          {heading && (
            <Label className={styles["heading"]}>
              {appState.lang == "en" ? heading : t("customerHeading")}
            </Label>
          )}
          <div className={styles["search-bar"]}>
            <Image
              src={inputIcon.url}
              alt={inputIcon.altText}
              width={size > desktopScreenSize ? 20 : 16}
              height={size > desktopScreenSize ? 20 : 16}
            />
            <input
              placeholder={appState.lang == "en" ? "Search" : t("search")}
              onChange={(e) => {
                handleFilter(e);
              }}
            />
          </div>
        </div>
      </div>
      {title && (
        <Label className={styles["title"]}>
          {appState.lang == "en" ? title : t("customerTitle")}
        </Label>
      )}
      <div className={styles["service-section"]}>
        {filterBlock && filterBlock && filterBlock.length > 0 ? (
          filterBlock.map((object, index) => {
            const {
              icon,
              iconTitle,
              iconText,
              url = "/",
              width,
              height,
            } = object;
            return (
              <div
                onClick={() => {
                  router?.push(url && url);
                }}
                key={index}
                className={styles["service-block"]}
              >
                <div>
                  <div className={styles["icon-block"]}>
                    {icon?.url && (
                      <Image
                        src={icon.url}
                        alt={icon.altText}
                        width={width || 27.5}
                        height={height || 30.56}
                      />
                    )}
                    {iconTitle && (
                      <Label className={styles["icon-title"]}>
                        {appState.lang == "en"
                          ? iconTitle
                          : _servicesProps[index].iconTitle}
                      </Label>
                    )}
                  </div>
                  {iconText && (
                    <Label className={styles["icon-text"]}>
                      {appState.lang == "en"
                        ? iconText
                        : _servicesProps[index].iconText}
                    </Label>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <>
            <p>{appState.lang == "en" ? "No matching found" : t("notFound")}</p>
          </>
        )}
      </div>
      <button className={styles["button"]}>
        <Image alt="question" src={"/question.png"} width={20} height={20} />
        <p>
          {appState.lang == "en" ? "Have a question?" : t("customerButton")}
        </p>
      </button>
    </div>
  );
};
export default CustomerService;
