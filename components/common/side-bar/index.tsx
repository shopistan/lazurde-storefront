import React, { FC, useContext, useEffect, useState } from "react";
import { ImageType } from "lib/types/common";
import Label from "../ui/label";
import Image from "next/image";
import styles from "./side-bar.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import Router, { useRouter } from "next/router";
import { desktopScreenSize } from "lib/utils/common";
import { BackArrow } from "components/icons";
// import { OKTA_CLIENT_ID, OKTA_DOMAIN } from "general-config";
import {
  getUserInfo,
  logoutUser,
  refreshAuthToken,
  resetUserPassword,
} from "lib/identity";

type AccountsProps = {
  image?: ImageType;
  text?: string | "";
  width?: string | number;
  height?: string | number;
  link?: string | "";
};

type DetailsProps = {
  accounts: AccountsProps[];
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
  const _detailsProps: DetailsProps[] = t(
    "detailsProps",
    {},
    { returnObjects: true }
  );

  const [userName, setUserName] = useState("San");
  useEffect(() => {
    const fetchUserInfo = async () => {
      let userInfo = (await getUserInfo()) || null;
      if (!userInfo) {
        await refreshAuthToken();
        userInfo = (await getUserInfo()) || {};
      }
      if (userInfo.firstName) {
        setUserName(userInfo.firstName);
      }
    };
    fetchUserInfo();
  }, []);

  const signOut = async () => {
    logoutUser();
  };

  const [renderCom, setRenderCom] = useState(false);
  useEffect(() => {
    setRenderCom(true);
  }, []);

  return (
    <>
      {renderCom &&
      activeComponent !== "Account Overview" &&
      width < desktopScreenSize ? (
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
                  <Image
                    alt="icon"
                    src={barCode?.url || "/"}
                    width={100}
                    height={100}
                  />
                )}
                <Label>
                  <>
                    <span className={styles["firstName-desktop"]}>
                      {appState?.lang == "en"
                        ? `Hi ${userName}`
                        : t("firstname")}
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
                    alt="icon"
                    src={"/contact.png"}
                    width={375}
                    height={120}
                    layout="responsive"
                  />
                </div>
                <div className={styles["account-banner"]}>
                  {barCode?.url && (
                    <Image
                      alt="icon"
                      src={barCode?.url || "/"}
                      width={100}
                      height={100}
                    />
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
                    alt="icon"
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
                  <div key={i} className={styles["account-details"]}>
                    {accounts &&
                      accounts?.map((account, index) => {
                        const { text, image, width, height, link } = account;
                        return (
                          <div
                            className={`${styles["account-detail"]} ${
                              text == activeComponent && activeComponent
                                ? styles["active-block"]
                                : ""
                            }`}
                            key={index}
                            onClick={() => {
                              if (text.toLowerCase().includes("sign out")) {
                                signOut();
                              } else {
                                window.localStorage.setItem("active", text);
                                setActiveComponent(text);
                              }
                            }}
                          >
                            <div className={styles["account-image"]}>
                              {image?.url ? (
                                <Image
                                  src={image?.url || "/"}
                                  alt={image?.altText}
                                  width={width}
                                  height={height}
                                  layout="fixed"
                                />
                              ) : null}
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
