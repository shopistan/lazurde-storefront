import { ImageType } from "lib/types/common";
import React, { FC, useContext, useEffect, useState } from "react";
import Label from "../ui/label";
import Image from "next/image";
import styles from "./side-bar.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import { useRouter } from "next/router";
import { getUserInfo, logout } from "lib/identity";
import { desktopScreenSize } from "lib/utils/common";
import { BackArrow } from "components/icons";

type AccountsProps = {
  image: ImageType;
  text: string | "";
  width: string | number;
  height: string | number;
  link: string | "";
};

type DetailsProps = {
  accounts: AccountsProps[];
};

type _DetailsProps = {
  accounts: _AccountsProps[];
};
type _AccountsProps = {
  text: string | "";
};

interface SideBarProps {
  barCode?: ImageType;
  firstName?: string;
  lastName?: string;
  reviewImage?: ImageType;
  reviewText?: string;
  details?: DetailsProps[];
  setActiveComponent?: Function;
  activeComponent?: string | boolean;
}

const SideBar: FC<SideBarProps> = ({
  barCode,
  firstName,
  lastName,
  reviewText,
  reviewImage,
  details,
  setActiveComponent,
  activeComponent,
}) => {
  const [width] = useWindowSize();
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const _detailsProps: _DetailsProps[] = t(
    "detailsProps",
    {},
    { returnObjects: true }
  );
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      const uInfo = await getUserInfo();
      let name = 'San'
      if (uInfo) {
        name = uInfo.name;
      }
      setUserName(name);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {activeComponent !== "Account Overview" && width < desktopScreenSize ? (
        <div
          className={styles["account-button"]}
          onClick={() => {
            setActiveComponent("Account Overview");
          }}
        >
          <BackArrow />
          <span>
            {appState?.lang == "en"
              ? "Back To My Account"
              : t("Back To My Account")}
          </span>
        </div>
      ) : (
        <div className={styles["account-left"]}>
          <div>
            {width >= desktopScreenSize && (
              <div className={styles["account-profile"]}>
                {barCode?.url && (
                  <Image src={barCode?.url || "/"} width={100} height={100} />
                )}
                <Label>
                  <>
                    <span className={styles["firstName-desktop"]}>
                      {appState?.lang == "en" ? `Hi ${userName}` : t("firstname")}
                    </span>
                    {/* <span>
                      {appState?.lang == "en" ? lastName : t("lastname")}
                    </span> */}
                  </>
                </Label>
              </div>
            )}
            {width < desktopScreenSize && (
              <div className={styles["account-profile-mobile"]}>
                <div className={styles["account-image-mobile"]}>
                  <Image
                    src={"/contact.png"}
                    width={375}
                    height={120}
                    layout="responsive"
                  />
                </div>
                <div className={styles["account-banner"]}>
                  {barCode?.url && (
                    <Image src={barCode?.url || "/"} width={100} height={100} />
                  )}
                  <Label>
                    <>
                      <span>
                        {appState?.lang == "en" ? firstName : t("firstname")}
                      </span>
                      <span className={styles["lastname-mobile"]}>
                        {appState?.lang == "en" ? lastName : t("lastname")}
                      </span>
                    </>
                  </Label>
                </div>
              </div>
            )}
            <div className={styles["account-review"]}>
              <div className={styles["account-reviewsImage"]}>
                {reviewImage?.url && (
                  <Image
                    src={reviewImage?.url || "/"}
                    width={16.67}
                    height={16.67}
                    layout="fixed"
                  />
                )}
              </div>
              {reviewText && (
                <Label>
                  {appState?.lang == "en" ? reviewText : t("reviewText")}
                </Label>
              )}
            </div>
            {details &&
              details?.map((object, i) => {
                const { accounts } = object;
                return (
                  <div className={styles["account-details"]}>
                    {accounts &&
                      accounts?.map((account, index) => {
                        const { text, image, width, height, link } = account;
                        return (
                          <div
                            className={`${styles["account-detail"]} ${
                              activeComponent == text && styles["active-block"]
                            }`}
                            key={index}
                            onClick={() => {
                              setActiveComponent(text);
                            }}
                          >
                            <div className={styles["account-image"]}>
                              <Image
                                src={image.url || "/"}
                                alt={image.altText}
                                width={width}
                                height={height}
                                layout="fixed"
                              />
                            </div>
                            <Label
                              className={
                                text == activeComponent &&
                                styles["active-state"]
                              }
                            >
                              {appState?.lang === "ar"
                                ? _detailsProps[i]?.accounts?.[index]?.text
                                : text}
                            </Label>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
export default SideBar;
