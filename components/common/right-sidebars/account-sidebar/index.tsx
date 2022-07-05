import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Login from "components/icons/login";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import Button from "components/common/ui/button";
import { loginUser } from "lib/identity";
import LoggedInlinks from "./login-links";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { translateText } from "lib/utils/reviews";

interface arabicDataProps {
  heading?: string;
  subHeading?: string;
}

const AccountSidebar = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [userName, setUserName] = useState("San");
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [arabicUserName, setArabicUserName] = useState("");

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" &&
      JSON.parse(window.localStorage.getItem("auth_tokens"));
    if (authToken?.access_token) {
      setIsLoginUser(true);
      const getUserInfo =
        typeof window !== "undefined" &&
        JSON.parse(window.localStorage.getItem("user_info"));

      if (getUserInfo) {
        setUserName(getUserInfo?.firstName);
      }
    } else {
      setIsLoginUser(false);
    }
  }, []);

  const arabicData: arabicDataProps = t(
    "accountSideBarData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    if (appState?.lang === "ar") {
      handleUserNameTranslation();
    }
  }, [appState?.lang]);

  const handleUserNameTranslation = async () => {
    if (userName) {
      const res = await translateText(userName, "ar");
      if (res.hasError === false) {
        setArabicUserName(
          res?.response?.data?.data?.translations[0]?.translatedText
        );
      } else {
        console.log("error while translate username to arabic");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {!isLoginUser ? (
        <div className={styles.content}>
          <div>
            <Login width={40} height={40} fill="#000" />
            <Heading className={styles.heading} element="h1">
              {appState?.lang === "en"
                ? "Sign In or Create an Account"
                : arabicData?.heading}
            </Heading>
            <Label className={styles.label}>
              {appState?.lang === "en"
                ? `With an account you can check out faster, view your online order
              history and access your shopping bag or saved items from any
              device.`
                : arabicData?.subHeading}
            </Label>
          </div>
          <div className={styles.auth_btns}>
            <Button
              buttonSize={"xl"}
              buttonText={t("signUp")}
              onClick={() => {
                loginUser();
              }}
            />
            <Button
              buttonSize={"xsm"}
              buttonStyle="underline"
              buttonText={t("signIn")}
              onClick={() => {
                loginUser();
              }}
            />
          </div>
        </div>
      ) : (
        <LoggedInlinks userName={userName} arabicUserName={arabicUserName} />
      )}
    </div>
  );
};
export default AccountSidebar;
