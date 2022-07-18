import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Label from "components/common/ui/label";
import styles from "./account-information.module.scss";
import { ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import { useRouter } from "next/router";
import SideBar from "components/common/side-bar/index";
import AccountOverView from "components/common/account-information/account-overview";
import OrderDetails from "components/common/order-details/index";
import NewsSubscriptions from "components/common/newsletter-subscriptions/index";
import OrderHistory from "../order-history";
import { desktopScreenSize } from "lib/utils/common";
import UserReviews from "./account-reviews";
import AddressBook from "./account-addresses";
import MyWishList from "../wishlist/my-wish-list/index";
import {
  fetchCustomerProfile,
  getUserInfo,
  isAccessTokenExpired,
  refreshAuthToken,
  updateIndividualUserProfile,
  updateOktaUser,
} from "lib/identity";
import { OktaUser } from "lib/types/identity";

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
  const { appState, activeAccountPageTab } = useContext(AppContext);
  const [activeComponent, setActiveComponent] = useState(
    activeAccountPageTab || "Account Overview"
  );
  const [renderCom, setRenderCom] = useState(false);
  const [oktaUserInfo, setOktaUserInfo] = useState<OktaUser>(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setRenderCom(true);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAccessTokenExpired()) {
        await refreshAuthToken();
      }
      let userInfo = (await getUserInfo()) || null;
      if (userInfo) {
        setOktaUserInfo(userInfo);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (oktaUserInfo) {
      fetchCustomerProfile(oktaUserInfo.id)
        .then((profile) => {
          /**
           * NOTE: Use this profile information to maintain/update/display any
           * additinal profile info
           */
          setUserProfile(profile);
          console.log("User Profile: ", profile);
        })
        .catch((err) => {
          console.log("Could not fetch user profile: ", err);
        });
    }
  }, [oktaUserInfo]);

  useEffect(() => {
    setActiveComponent(activeAccountPageTab);
  }, [activeAccountPageTab]);

  return (
    <>
      {renderCom && (
        <div className={styles["account-container"]}>
          <div
            className={styles["account-main"]}
            onClick={() => {
              router.push("/account");
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
              oktaUserInfo={oktaUserInfo}
            />
            <div className={styles["account-right-side"]}>
              {activeComponent == "Account Overview" && <AccountOverView />}
              {activeComponent == "My Orders" && <OrderDetails />}
              {activeComponent == "My Reviews" && <UserReviews />}
              {activeComponent == "Address Book" && <AddressBook />}
              {activeComponent == "My Wish List" && <MyWishList />}
              {activeComponent == "Newsletter Subscriptions" && (
                <NewsSubscriptions />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AccountInformation;
