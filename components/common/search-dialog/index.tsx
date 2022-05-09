import React, { FC, useContext, useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import Input from "../ui/Input";
import CrossSmall from "components/icons/CrossSmall";
import { Search } from "components/icons";
import ProductCard from "../product-card/ProductCard";
import { popularProductCardData } from "lib/mock-data/data";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";

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
  const { appState } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState(null);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm && e.key == "Enter") {
      var splitTerm = searchTerm.split(" ");
      var joinTerm = splitTerm.join("-");
      router.push(`/s?keyword=${joinTerm}`, undefined, { shallow: true });
    }
  };

  return (
    <>
      {width > 1023 && (
        <div
          className={styles["overlay"]}
          data-opened={openSearchDialog}
          onClick={() => setOpenSearchDialog(!openSearchDialog)}
        ></div>
      )}
      <div className={styles["search-dialog"]} data-opened={openSearchDialog}>
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
              placeholder={`${appState.lang === "en" ? "Shop" : "تسوق"} ${
                appState.brand
              }`}
              onChange={handleSearch}
              handleSubmit={handleSubmit}
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
              {appState.lang === "en"
                ? "Popular Search Terms"
                : "مصطلحات البحث الشائعة"}
            </h5>
            <ul className={styles["popular-search-terms-list"]}>
              <li>{appState.lang === "en" ? "Jewelry" : "مجوهرات"}</li>
              <li>{appState.lang === "en" ? "Rings" : "خواتم"}</li>
              <li>{appState.lang === "en" ? "Gold" : "ذهب"}</li>
              <li>{appState.lang === "en" ? "Kenaz" : "كيناز"}</li>
            </ul>
          </div>
          <div className={styles["popular-search-products-div"]}>
            <h4 className={styles["popular-search-products-heading"]}>
              {appState.lang === "en"
                ? "Popular Search Products"
                : "منتجات البحث الشعبية"}
            </h4>
            <div
              className={styles["popular-products"]}
              data-testid="product-card"
            >
              {popularProductCardData &&
                popularProductCardData?.map((item, index) => {
                  const {
                    title,
                    titleArabic,
                    basePrice,
                    discount,
                    discountedPrice,
                    images = [],
                    onlineExclusiveTag,
                  } = item;
                  if (index < 5)
                    return (
                      <ProductCard
                        title={appState.lang === "en" ? title : titleArabic}
                        key={index}
                        basePrice={basePrice}
                        onlineExclusiveTag={onlineExclusiveTag}
                        productCardImages={images}
                        wrapperClassName={styles["product-card"]}
                        swipperClassName={styles["swipper-card"]}
                        data-testid="card"
                      />
                    );
                })}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SearchDialog;
