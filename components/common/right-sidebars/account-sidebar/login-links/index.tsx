import React from "react";
import styles from "./style.module.scss";
import { Login, ArrowRight, SignOut } from "components/icons";
import Label from "components/common/ui/label";
import { accountSideBarLinks } from "lib/mock-data/data";
import Button from "components/common/ui/button";
import { useRouter } from "next/router";
import { logoutUser } from "lib/identity";

const LoggedInlinks = ({ userName = "" }): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <div className={styles.links_wrapper}>
        <div className={styles.name}>
          <Login width="40px" height="40px" fill="#000" />
          <Label>{`Hi, ${userName}`}</Label>
        </div>
        <div className={styles.links}>
          {accountSideBarLinks?.map((link, index) => {
            const { label } = link;
            return (
              <div className={styles.link_wrapper} key={index}>
                <div className={styles.link_btn}>
                  <button
                    onClick={() => {
                      window.localStorage.setItem("active", label);
                      router?.push("/account");
                    }}
                  >
                    {label}
                  </button>
                </div>
                <div>
                  <ArrowRight fill="#000000" width="6" height="8px" />
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
        <SignOut fill="#000000" width="20px" height="20px" />
        <Button
          buttonStyle="underline"
          buttonSize="xsm"
          buttonText="sign out"
        />
      </div>
    </>
  );
};

export default LoggedInlinks;
