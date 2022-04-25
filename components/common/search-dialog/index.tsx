import React, { FC } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import Input from "../ui/Input";
import CrossSmall from "components/icons/CrossSmall";

interface SearchDialogProps {
  siteLogo: ImageType;
  siteLogoUrl: string;
  setOpenSearchDialog: (val: boolean) => void;
  openSearchDialog: boolean;
}

const SearchDialog: FC<SearchDialogProps> = ({
  siteLogo,
  siteLogoUrl,
  setOpenSearchDialog,
  openSearchDialog,
}): JSX.Element => {
  return (
    <div className={styles["search-dialog"]} data-opened={openSearchDialog}>
      <div className={styles["search-bar"]}>
        <div className={styles["lazurde-icon"]}>
          <Link href={siteLogoUrl || ""}>
            <a>
              <Image
                src={siteLogo?.url}
                width={152}
                height={20}
                alt={siteLogo?.altText}
              />
            </a>
          </Link>
        </div>
        <div className={styles["search-input-div"]}>
          <Input
            showLabel={false}
            className={styles["search-input"]}
            placeholder="Shop L'azurde"
          ></Input>
        </div>
        <div
          className={styles["cross-icon"]}
          onClick={() => setOpenSearchDialog(false)}
        >
          <CrossSmall width="12" height="12" />
        </div>
      </div>
      <div className={styles["category-section"]}>
        <div>
          <h5>Popular Search Terms</h5>
          <h6>Jewelry</h6>
          <h6>Rings</h6>
          <h6>Gold</h6>
          <h6>Kenaz</h6>
        </div>
        <div>
          <h4>Popular Searched Products</h4>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
