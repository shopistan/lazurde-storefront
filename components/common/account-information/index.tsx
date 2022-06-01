import React, { FC, useContext } from "react";
import Image from "next/image";
import Label from "../ui/label";
import styles from "./account-information.module.scss";
import { ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import { useRouter } from "next/router";

interface AccountInformationProps {
  title: string | "";
  titleImage: ImageType | { url: ""; altText: "" };
  barCode: ImageType | { url: ""; altText: "" };
  firstName: string | "";
  lastName: string | "";
  reviewImage: ImageType;
  reviewText: string | "";
  details: DetailsProps[];
}

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

const AccountInformation: FC<AccountInformationProps> = ({
  title,
  titleImage,
  barCode,
  firstName,
  lastName,
  reviewImage,
  reviewText,
  details,
}) => {
  const { t } = useTranslation("common");
  const [width] = useWindowSize();
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const _detailsProps: _DetailsProps[] = t(
    "detailsProps",
    {},
    { returnObjects: true }
  );
  return (
    <>
      <div className={styles["account-container"]}>
        <div
          className={styles["account-main"]}
          onClick={() => {
            router.push("/account-page");
          }}
        >
          <div className={styles["account-mainImage"]}>
            <Image
              src={titleImage?.url || "/"}
              alt={titleImage?.altText}
              width={28.5}
              height={30}
            />
          </div>
          <Label>{appState?.lang == "en" ? title : t("accountTitle")}</Label>
        </div>
        <div className={styles["account-detail-section"]}>
          <div className={styles["account-left"]}>
            <div>
              {width >= 1024 && (
                <div className={styles["account-profile"]}>
                  {barCode?.url && (
                    <Image src={barCode?.url || "/"} width={100} height={100} />
                  )}
                  <Label>
                    <>
                      <span>
                        {appState?.lang == "en" ? firstName : t("firstname")}
                      </span>
                      <span>
                        {appState?.lang == "en" ? lastName : t("lastname")}
                      </span>
                    </>
                  </Label>
                </div>
              )}
              {width < 1024 && (
                <div className={styles["account-profile-mobile"]}>
                  <Image src={"/contact.png"} width={375} height={120} />
                  <div className={styles["account-banner"]}>
                    {barCode?.url && (
                      <Image
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
                        <span>
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
                              className={styles["account-detail"]}
                              key={index}
                              onClick={() => {
                                router.push(`/${link || ""}`);
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
                              <Label>
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
          <div className={styles["account-image-section"]}>
            <div className={styles["account-image-text"]}>
              {appState?.lang == "en"
                ? `Welcome to your account`
                : t("welcome")}
            </div>
            <div className={styles["account-right"]}>
              <Image src={"/main-image.png"} width={650} height={760} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountInformation;
