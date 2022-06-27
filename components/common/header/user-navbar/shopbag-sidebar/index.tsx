import styles from "./shopbagsidebar.module.scss";
import Login from "components/icons/login";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import SignIn from "components/common/ui/signin";
import { Bag } from "components/icons";

const ShopBag = () => {
  return (
    <div className={styles["shopbagsidebar-wrapper"]}>
      <div className={styles["shopabag-count"]}>
        <Bag width="31px" height="33px" fill="#000" />
        <Heading className={styles["shopbag-heading"]} element="h1">
        Shopping Bag
        </Heading>
        <Label className={styles["shopbag-label"]}>
        Your shopping bag is empty
        </Label>
      </div>
      <div>
          <SignIn />
      </div>
      
    </div>
  );
};
export default ShopBag;
