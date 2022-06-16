import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Label from "../ui/label";
import styles from "./account-information.module.scss";
import { ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import { useRouter } from "next/router";
import SideBar from "components/common/side-bar/index";
import AccountSection from "../account-section";
import OrderDetails from "components/common/order-details/index";
import OrderHistory from "../order-history";
import { desktopScreenSize } from "lib/utils/common";

interface AccountInformationProps {
  title?: string | "";
  titleImage?: ImageType | { url: ""; altText: "" };
  barCode?: ImageType | { url: ""; altText: "" };
  firstName?: string | "";
  lastName?: string | "";
  reviewImage?: ImageType;
  reviewText?: string | "";
  orderId?: string | "";
  details?: DetailsProps[];
  order?: any;
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

const AccountInformation: FC<AccountInformationProps> = ({
  title,
  titleImage,
  barCode,
  firstName,
  lastName,
  reviewImage,
  reviewText,
  details,
  order,
}) => {
  const { t } = useTranslation("common");
  const [width] = useWindowSize();
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const [activeComponent, setActiveComponent] = useState("Account Overview");
  const [orderDetails, setOrderDetails] = useState("");

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
        <div className={styles["details-section"]}>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewImage={reviewImage}
            reviewText={reviewText}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
          {activeComponent == "Account Overview" && <AccountSection />}

          {activeComponent === "My Orders" && <OrderDetails />}
        </div>
      </div>
    </>
  );
};
export default AccountInformation;
