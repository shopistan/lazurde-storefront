import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import { SignOut } from "components/icons";
import Button from "components/common/ui/button";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { logoutUser, loginUser } from "lib/identity";

const AuthLinks = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isLoginUser, setIsLoginUser] = useState(false);

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" &&
      JSON.parse(window.localStorage.getItem("auth_tokens"));
    if (authToken?.access_token) {
      setIsLoginUser(true);
    } else {
      setIsLoginUser(false);
    }
  }, []);

  return (
    <>
      <div className={styles["mobile-header__auth-btns"]}>
        {!isLoginUser ? (
          <>
            <Button
              className={styles["signup-btn"]}
              buttonStyle="black"
              buttonText={
                appState.lang === "en" ? "sign up" : t("signUpBtnText")
              }
              buttonSize={"xxl"}
              onClick={() => {
                loginUser();
              }}
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
                loginUser();
              }}
              type={"button"}
            />
          </>
        ) : (
          <div
            className={styles["mobile-header__signout-btn"]}
            onClick={() => {
              logoutUser();
            }}
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
