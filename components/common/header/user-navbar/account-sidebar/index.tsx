import styles from "./accountsidebar.module.scss";
import Login from "components/icons/login";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import SignIn from "components/common/ui/signin";

const AccountSidebar = () => {
  return (
    <div className={styles["accountsidebar-wrapper"]}>
      <div className={styles["login-account"]}>
        <Login width="31px" height="33px" fill="#000" />
        <Heading className={styles["login-heading"]} element="h1">
          Sign In or Create an Account
        </Heading>
        <Label className={styles["login-label"]}>
          With an account you can check out faster, view your online order
          history and access your shopping bag or saved items from any device.
        </Label>
      </div>
      <div>
          <SignIn />
      </div>
      
    </div>
  );
};
export default AccountSidebar;
