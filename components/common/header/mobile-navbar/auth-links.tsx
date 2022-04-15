import React, { useState } from "react";
import styles from "./style.module.scss";
import { SignOut } from "components/icons";
import Button from "components/common/ui/button";

const AuthLinks = (): JSX.Element => {
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
              buttonStyle="black"
              buttonText={"sign up"}
              buttonSize={"xxl"}
              onClick={() => {}}
              type={"button"}
            />
            <Button
              buttonStyle="white"
              buttonText={"sign in"}
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
            <span>sign out</span>
            <SignOut fill="#000000" width="20px" height="20px" />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthLinks;
