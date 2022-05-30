import React, { FC } from "react";
import Image from "next/image";
import Label from "../ui/label";
import Person from "components/icons/Person";
import styles from "./account-information.module.scss";
import { ImageType } from "lib/types/common";

type detailsProps = {
  image: ImageType;
  text: string | "";
};

type AccountsProps = {
  details: detailsProps[] | [];
};

interface AccountInformationProps {
  accounts: AccountsProps[] | [];
}

const AccountInformation: FC<AccountInformationProps> = ({ accounts }) => {
    console.log(accounts);
    
  return (
    <>
      <div className={styles["account-container"]}>
        <div className={styles["account-main"]}>
          <Person />
          <Label>My Account</Label>
        </div>
        <div className={styles["account-detail-section"]}>
          <div className={styles["account-left"]}>
            <div>
              <div className={styles["account-profile"]}>
                <Image src={"/barcode.svg"} width={100} height={100} />
                <Label>User Name</Label>
              </div>
              <div className={styles["account-review"]}>
                <Image src={"/stop.png"} width={16.67} height={16.67} />
                <Label>
                  You have products waiting to be reviewed. Review and enter for
                  a chance to win your order payment back.
                </Label>
              </div>
              <div className={styles["account-overview"]}>
                <Person />
                <Label>Account Overview</Label>
              </div>
              <div className={styles["account-details"]}>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Orders</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Returns</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Reviews</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Wish List</Label>
                </div>
              </div>
              <div className={styles["account-details"]}>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Details</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>Address Book</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>Payment Methods</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>My Gift Cards</Label>
                </div>
              </div>
              <div className={styles["account-details"]}>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>Newsletter Subscriptions</Label>
                </div>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>Need Help?</Label>
                </div>
              </div>
              <div className={styles["account-details"]}>
                <div className={styles["account-detail"]}>
                  <Person />
                  <Label>Sign Out</Label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["account-image-section"]}>
            <div className={styles["account-image-text"]}>
              Welcome to <br /> your account
            </div>
            <Image src={"/main-image.png"} width={650} height={760} />
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountInformation;
