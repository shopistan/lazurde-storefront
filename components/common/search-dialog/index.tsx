import React, { FC } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import Input from "../ui/Input";
import CrossSmall from "components/icons/CrossSmall";
import { Search } from "components/icons";

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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input triggers", e.target.value);
  };
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
          <div className={styles["search-icon"]}>
            <Search width="16" height="16" color="rgba(0, 0, 0, 0.4)" />
          </div>
          <Input
            showLabel={false}
            className={styles["search-input"]}
            placeholder="Shop L'azurde"
            onChange={handleSearch}
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
        <div className={styles["popular-search-terms-div"]}>
          <h5 className={styles["popular-search-terms-heading"]}>
            Popular Search Terms
          </h5>
          <h6>Jewelry</h6>
          <h6>Rings</h6>
          <h6>Gold</h6>
          <h6>Kenaz</h6>
        </div>
        <div className={styles["popular-search-products-div"]}>
          <h4 className={styles["popular-search-products-heading"]}>
            Popular Searched Products
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
