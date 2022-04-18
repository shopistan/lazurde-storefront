import React, { useContext } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { CustomerCare, Calendar, Account, Location } from "components/icons";
import AuthLinks from "./auth-links";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import MobileLanguageSelector from "./lang-selector";

const UserLinks = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  return (
    <div className={styles["mobile-header__user-links"]}>
      <ul>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <CustomerCare width="16.67px" height="15.42px" fill="#000" />
              <span>
                {appState.lang === "en"
                  ? "Customer Care"
                  : t("customerCareText")}
              </span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Calendar width="20px" height="20px" fill="#000" />
              <span>
                {appState.lang === "en"
                  ? "Book an Appointment"
                  : t("bookAnAppointmentText")}
              </span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Account width="20px" height="20px" fill="#000" />
              <span>
                {appState.lang === "en" ? "My Account" : t("myAccountText")}
              </span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Location width="20px" height="20px" fill="#000" />
              <span>
                {appState.lang === "en"
                  ? "Store Locator"
                  : t("storeLocatorText")}
              </span>
            </a>
          </Link>
        </li>
      </ul>
      <MobileLanguageSelector />
      <AuthLinks />
    </div>
  );
};
export default UserLinks;
