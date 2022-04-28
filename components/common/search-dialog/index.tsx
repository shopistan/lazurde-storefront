import React, { FC } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import Input from "../ui/Input";
import CrossSmall from "components/icons/CrossSmall";
import { Search } from "components/icons";
import ProductCard from "../product-card/ProductCard";
import { productCardData } from "lib/mock-data/data";
import useWindowSize from "lib/utils/useWindowSize";

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
  const [width] = useWindowSize();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input triggers", e.target.value);
  };

  return (
    <div className={styles["search-dialog"]} data-opened={openSearchDialog}>
      {/* {width > 1023 && (
        <div
          className={styles["overlay"]}
          data-opened={openSearchDialog}
          onClick={() => setOpenSearchDialog(!openSearchDialog)}
        ></div>
      )} */}
      <div className={styles["search-bar"]}>
        <div className={styles["brand-icon"]}>
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
          <ul className={styles["popular-search-terms-list"]}>
            <li>Jewelry</li>
            <li>Rings</li>
            <li>Gold</li>
            <li>Kenaz</li>
          </ul>
        </div>
        <div className={styles["popular-search-products-div"]}>
          <h4 className={styles["popular-search-products-heading"]}>
            Popular Searched Products
          </h4>
          <div className={styles["popular-products"]}>
            {productCardData &&
              productCardData?.map((item, index) => {
                const {
                  title,
                  basePrice,
                  discount,
                  discountedPrice,
                  images = [],
                  onlineExclusiveTag,
                } = item;
                if (index < 4)
                  return (
                    <ProductCard
                      title={title}
                      key={index}
                      basePrice={basePrice}
                      onlineExclusiveTag={onlineExclusiveTag}
                      productCardImages={images}
                    />
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
