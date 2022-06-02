import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import { SignOut } from "components/icons";
import Button from "components/common/ui/button";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

const AuthLinks = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <div className={styles["mobile-header__auth-btns"]}>
        {!isLoggedIn ? (
          <>
            <Button
              className={styles["signup-btn"]}
              buttonStyle="black"
              buttonText={
                appState.lang === "en" ? "sign up" : t("signUpBtnText")
              }
              buttonSize={"xxl"}
              onClick={() => {}}
              type={"button"}
            />
            <Button
              className={styles["signin-btn"]}
              buttonStyle="white"
              buttonText={
                appState.lang === "en" ? "sign in" : t("signInBtnText")
              }
              buttonSize={"sm"}
              onClick={() => {
                handleSignIn();
              }}
              type={"button"}
            />
          </>
        ) : (
          <div
            className={styles["mobile-header__signout-btn"]}
            onClick={() => setIsLoggedIn(false)}
          >
            <span>
              {appState.lang === "en" ? "sign out" : t("signOutBtnText")}
            </span>
            <SignOut fill="#000000" width="20px" height="20px" />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthLinks;
