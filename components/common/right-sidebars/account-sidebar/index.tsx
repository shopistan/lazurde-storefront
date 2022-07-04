import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Login from "components/icons/login";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import Button from "components/common/ui/button";
import { loginUser } from "lib/identity";
import LoggedInlinks from "./login-links";

const AccountSidebar = (): JSX.Element => {
  const [userName, setUserName] = useState("San");
  const [isLoginUser, setIsLoginUser] = useState(false);

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

  return (
    <div className={styles.wrapper}>
      {!isLoginUser ? (
        <div className={styles.content}>
          <div>
            <Login width="40px" height="40px" fill="#000" />
            <Heading className={styles.heading} element="h1">
              Sign In or Create an Account
            </Heading>
            <Label className={styles.label}>
              With an account you can check out faster, view your online order
              history and access your shopping bag or saved items from any
              device.
            </Label>
          </div>
          <div className={styles.auth_btns}>
            <Button
              buttonSize={"xl"}
              buttonText={"Sign Up"}
              onClick={() => {
                loginUser();
              }}
            />
            <Button
              buttonSize={"xsm"}
              buttonStyle="underline"
              buttonText={"Sign In"}
              onClick={() => {
                loginUser();
              }}
            />
          </div>
        </div>
      ) : (
        <LoggedInlinks userName={userName} />
      )}
    </div>
  );
};
export default AccountSidebar;
