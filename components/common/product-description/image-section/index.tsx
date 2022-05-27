import React, { useContext, useEffect } from "react";
import styles from "./image-section.module.scss";
import PopupImageView from "./popup-image-view";

const ImageSection = () => {
  return (
    <div className={styles["main-image-section"]}>
      <PopupImageView></PopupImageView>
      {/* <div>
        <img src="/dummy-image1.png" alt="" />
      </div>
      <div>
        <img src="/dummy-image2.png" alt="" />
      </div>
      <div>
        <img src="/dummy-image3.png" alt="" />
      </div>
      <div>
        <img src="/dummy-image4.png" alt="" />
      </div> */}
    </div>
  );
};

export default ImageSection;
