import React, { useContext } from "react";
import styles from "./style.module.scss";
import { Login, ArrowRight, SignOut } from "components/icons";
import Label from "components/common/ui/label";
import useTranslation from "next-translate/useTranslation";
import { accountSideBarLinks } from "lib/mock-data/data";
import Button from "components/common/ui/button";
import { useRouter } from "next/router";
import { logoutUser } from "lib/identity";
import { AppContext } from "lib/context";

interface detailsProps {
  label?: string;
}

interface LoggedInlinksProps {
  userName?: string;
  arabicUserName?: string;
  closeSideBar?: Function;
}

const LoggedInlinks = ({
  userName = "",
  arabicUserName = "",
  closeSideBar,
}: LoggedInlinksProps): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const arabicDataLinks: detailsProps = t(
    "accountSideBarData.accountSideBarLinks",
    {},
    { returnObjects: true }
  );

  return (
    <>
      <div className={styles.links_wrapper}>
        <div className={styles.name}>
          <Login width={40} height={40} fill="#000" />
          <Label testId="username">
            {appState?.lang === "en"
              ? `Hi, ${userName}`
              : `مرحبا, ${arabicUserName}`}
          </Label>
        </div>
        <div className={styles.links}>
          {accountSideBarLinks?.map((link, index) => {
            const { label, value } = link;
            return (
              <div
                className={styles.link_wrapper}
                key={index}
                onClick={() => {
                  window.localStorage.setItem("active", value);
                  router?.push("/account");
                  closeSideBar && closeSideBar();
                }}
              >
                <div className={styles.link_btn}>
                  <button>
                    {appState?.lang === "en"
                      ? label
                      : Array.isArray(arabicDataLinks) &&
                        arabicDataLinks[index]?.label}
                  </button>
                </div>
                <div className={styles.icon}>
                  <ArrowRight fill="#000000" width="6px" height="8px" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={styles.signout_btn}
        onClick={() => {
          logoutUser();
        }}
      >
        <SignOut fill="#000000" width={20} height={20} />
        <Button
          buttonStyle="underline"
          buttonSize="xsm"
          buttonText={t("signOut")}
        />
      </div>
    </>
  );
};

export default LoggedInlinks;
