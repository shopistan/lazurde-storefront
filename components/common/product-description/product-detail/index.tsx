import React, { useContext } from "react";
import styles from "./style.module.scss";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface ProductDetailProps {
  productDetail?: string;
  metal?: string;
  diamond?: string;
  stone?: string;
  pendantSize?: string;
  charmSize?: string;
  chainLength?: string;
  rignSize?: string;
  earringSize?: string;
  ankletSize?: string;
  braceletSize?: string;
  styleNumber?: string;
  brand?: string;
  collection?: string;
}

const ProductDetail = ({
  productDetail,
  metal = "18K White Gold",
  diamond = "18K White Gold",
  stone = "18K White Gold",
  pendantSize = "18K White Gold",
  charmSize = "18K White Gold",
  chainLength = "",
  rignSize = "",
  earringSize = "",
  ankletSize = "",
  braceletSize = "",
  styleNumber = "KP701276SB",
  brand = `L'azurde`,
  collection = "lorem ipsum",
}: ProductDetailProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  return (
    <>
      <div className={styles["detail-wrapper"]}>
        <div className={`${styles["column"]} ${styles["left-side"]}`}>
          <Heading element="h3" className={styles["heading"]}>
            {appState.lang == "en" ? `Designer’s Notes` : t("Designer’s Notes")}
          </Heading>
          <p className={styles["detail"]}>
            {appState.lang == "en" ? productDetail : t("productDetails")}
          </p>
        </div>
        <div className={`${styles["column"]} ${styles["right-side"]}`}>
          <Heading element="h3" className={styles["heading"]}>
            {appState.lang == "en" ? `Product Details` : t("Product Details")}
          </Heading>
          <div className={styles["detail-features"]}>
            {metal && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "metal" : t("metal")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? metal : t("metalDetails-arabic")}
                </Label>
              </div>
            )}
            {diamond && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "diamond" : t("diamond")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? diamond : t("diamondDetails-arabic")}
                </Label>
              </div>
            )}
            {stone && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "stone" : t("stone")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? stone : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {pendantSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en"
                    ? pendantSize
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {charmSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "charm Size" : t("charm Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? charmSize : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {chainLength && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Chain Length" : t("Chain Length")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en"
                    ? chainLength
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {rignSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? rignSize : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {earringSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label testId="earing" className={styles["description"]}>
                  {appState.lang == "en"
                    ? earringSize
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {braceletSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en"
                    ? braceletSize
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {ankletSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en"
                    ? ankletSize
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            )}
            {collection && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Collection" : t("pdpTag-arabic")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang == "en" ? collection : t("collection")}
                </Label>
              </div>
            )}
            {brand && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Brand" : t("Brand")}
                </Label>
                <Label className={styles["description"]}>
                  {appState.lang ? brand : t("brandDetails-arabic")}
                </Label>
              </div>
            )}
            {styleNumber && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState.lang == "en" ? "Style Number" : t("Style Number")}
                </Label>
                <Label className={styles["description"]}>{styleNumber}</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
