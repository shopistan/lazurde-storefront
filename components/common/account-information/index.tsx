import React, { FC } from "react";
import Image from "next/image";
import Label from "../ui/label";
import styles from "./account-information.module.scss";
import { ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import { accountInformationData } from "lib/mock-data/data";

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
};

type DetailsProps = {
  accounts: AccountsProps[];
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
  const [width] = useWindowSize();
  return (
    <>
      <div className={styles["account-container"]}>
        <div className={styles["account-main"]}>
          <div className={styles["account-mainImage"]}>
            <Image
              src={accountInformationData.titleImage?.url || "/"}
              alt={accountInformationData.titleImage?.altText}
              width={28.5}
              height={30}
            />
          </div>
          <Label>{accountInformationData.title}</Label>
        </div>
        <div className={styles["account-detail-section"]}>
          <div className={styles["account-left"]}>
            <div>
              {width >= 1024 && (
                <div className={styles["account-profile"]}>
                  {accountInformationData.barCode?.url && (
                    <Image
                      src={accountInformationData.barCode?.url || "/"}
                      width={100}
                      height={100}
                    />
                  )}
                  <Label>
                    <>
                      {accountInformationData.firstName}
                      <br />
                      {accountInformationData.lastName}
                    </>
                  </Label>
                </div>
              )}
              {width < 1024 && (
                <div className={styles["account-profile-mobile"]}>
                  <Image src={"/contact.png"} width={375} height={120} />
                  <div className={styles["account-banner"]}>
                    {accountInformationData.barCode?.url && (
                      <Image
                        src={accountInformationData.barCode?.url || "/"}
                        width={100}
                        height={100}
                      />
                    )}
                    <Label>
                      <>
                        {accountInformationData.firstName}
                        <br />
                        {accountInformationData.lastName}
                      </>
                    </Label>
                  </div>
                </div>
              )}
              <div className={styles["account-review"]}>
                <div className={styles["account-reviewsImage"]}>
                  {accountInformationData.reviewImage?.url && (
                    <Image
                      src={accountInformationData.reviewImage.url || "/"}
                      width={16.67}
                      height={16.67}
                      layout="fixed"
                    />
                  )}
                </div>
                <Label>{accountInformationData.reviewText}</Label>
              </div>
              {accountInformationData.details &&
                accountInformationData.details?.map((object, index) => {
                  const { accounts } = object;
                  return (
                    <div className={styles["account-details"]}>
                      {accounts &&
                        accounts?.map((account, index) => {
                          const { text, image, width, height } = account;
                          return (
                            <div
                              className={styles["account-detail"]}
                              key={index}
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
                              <Label>{text}</Label>
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
              Welcome to <br /> your account
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
