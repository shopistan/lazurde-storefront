import React, { useContext } from "react";
import styles from "./style.module.scss";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface ProductDetailProps {
  productDetail?: string;
  productData?: any;
}

const ProductDetail = ({
  productDetail,
  productData = {},
}: ProductDetailProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  return (
    <>
      <div className={styles["detail-wrapper"]}>
        <div className={`${styles["column"]} ${styles["left-side"]}`}>
          <Heading element="h3" className={styles["heading"]}>
            {appState?.lang == "en"
              ? `Designer’s Notes`
              : t("Designer’s Notes")}
          </Heading>
          <p className={styles["detail"]}>
            {appState?.lang == "en" ? productDetail : t("productDetails")}
          </p>
        </div>
        <div className={`${styles["column"]} ${styles["right-side"]}`}>
          <Heading element="h3" className={styles["heading"]}>
            {appState?.lang == "en" ? `Product Details` : t("Product Details")}
          </Heading>
          <div className={styles["detail-features"]}>
            {productData && productData?.Metal && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "metal" : t("metal")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData?.Metal
                    : t("metalDetails-arabic")}
                </Label>
              </div>
            )}

            {productData &&
            productData?.hasOwnProperty("Diamond Carat") &&
            productData["Diamond Carat"] ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en"
                    ? "Diamond"
                    : t("diamondDetails-arabic")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? `${
                        productData && productData?.hasOwnProperty("Diamond")
                          ? productData["Diamond"]
                          : ""
                      } ${
                        productData &&
                        productData?.hasOwnProperty("Diamond Carat") &&
                        productData["Diamond Carat"]
                          ? `${
                              productData && productData["Diamond Carat"]
                            } Carat`
                          : ""
                      } ${
                        productData &&
                        productData?.hasOwnProperty("Diamond Carat") &&
                        productData["Diamond Cut"]
                      }`
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Stone") &&
            productData["Stone"] ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "stone" : t("stone")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? `${
                        productData && productData?.hasOwnProperty("Stone")
                          ? productData["Stone"]
                          : ""
                      } ${
                        productData &&
                        productData?.hasOwnProperty("Stone Carat") &&
                        productData["Stone Carat"]
                          ? `${productData && productData["Stone Carat"]} Carat`
                          : ""
                      } ${
                        productData &&
                        productData?.hasOwnProperty("Stone Carat") &&
                        productData["Stone Cut"]
                      }`
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Pendant Size") &&
            productData["Pendant Size"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Pendant Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Pendant Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Charm Size") &&
            productData["Charm Size"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "charm Size" : t("charm Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Charm Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Chain Length") &&
            productData["Chain Length"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Chain Length" : t("Chain Length")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Chain Length"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}

            {productData &&
            productData?.hasOwnProperty("Ring Size") &&
            productData["Ring Size"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Ring Size" : t("Ring Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Ring Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Earring Size") &&
            productData["Earring Size"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Earring Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Earring Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Bracelet Size") &&
            productData["Bracelet Size"] > 0 ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Bracelet Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Bracelet Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Anklet Size") &&
            productData["Anklet Size"] !== "None" ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Anklet Size" : t("Pendant Size")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Anklet Size"]
                    : t("stoneDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Collection") &&
            productData["Collection"] ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Collection" : t("pdpTag-arabic")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData?.Collection
                    : t("collection")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Brand") &&
            productData["Brand"] ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Brand" : t("Brand")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang
                    ? productData && productData?.Brand
                    : t("brandDetails-arabic")}
                </Label>
              </div>
            ) : null}
            {productData &&
            productData?.hasOwnProperty("Style Number") &&
            productData["Style Number"] ? (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>
                  {appState?.lang == "en" ? "Style Number" : t("Brand")}
                </Label>
                <Label className={styles["description"]}>
                  {appState?.lang == "en"
                    ? productData && productData["Style Number"]
                    : t("brandDetails-arabic")}
                </Label>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
