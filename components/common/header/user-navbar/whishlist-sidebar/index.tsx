import styles from "./whishlistsidebar.module.scss";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import SignIn from "components/common/ui/signin";
import { Heart } from "components/icons";

const WhishListSidebar = () => {
  return (
    <div className={styles["whishlist-wrapper"]}>
      <div className={styles["whsitlist-account"]}>
        <Heart  fill="#000" width="33px" height= "29px"/>
        <Heading className={styles["whishlist-heading"]} element="h1">
        Wish List
        </Heading>
        <Label className={styles["whishlist-label"]}>
        View saved favorites, build-your-own charm jewelry designs and sent hints.
        </Label>
      </div>
      <div>
          <SignIn />
      </div>
      
    </div>
  );
};
export default WhishListSidebar;
