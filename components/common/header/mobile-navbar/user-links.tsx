import Link from "next/link";
import styles from "./style.module.scss";
import { CustomerCare, Calendar, Account, Location } from "components/icons";
import Button from "components/common/ui/button";

const UserLinks = () => {
  return (
    <div className={styles["mobile-header__user-links"]}>
      <ul>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <CustomerCare width="16.67px" height="15.42px" fill="#000" />
              <span>Customer Care</span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Calendar width="20px" height="20px" fill="#000" />
              <span>Book an Appointment</span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Account width="20px" height="20px" fill="#000" />
              <span>My Account</span>
            </a>
          </Link>
        </li>
        <li className={styles["mobile-header__user-links-item"]}>
          <Link href={"/"}>
            <a>
              <Location width="20px" height="20px" fill="#000" />
              <span>Store Locator</span>
            </a>
          </Link>
        </li>
      </ul>

      <div className={styles["mobile-header__auth-btns"]}>
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
          onClick={() => {}}
          type={"button"}
        />
      </div>
    </div>
  );
};
export default UserLinks;
