/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import Label from "components/common/ui/label";
import styles from "./style.module.scss";
import { Heart } from "components/icons";
import Image from "next/image";
import { Bag, CrossSmall } from "components/icons";
import Spinner from "components/common/ui/spinner";
import { getWishList, deleteWishList, addWishList } from "lib/utils/wishlist";
import { getInventoryByIds, getInventoryAuth } from "lib/utils/inventory";
import { addProductToCart } from "lib/utils/cart";
import Button from "components/common/ui/button";
import {
  fetchProductsByItemId,
  fetchProductPriceByItemId,
} from "lib/utils/product";
import { ProductType } from "lib/types/product";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface arabicDataProps {
  myReviewHeading?: string;
  myPastReviews?: string;
}

interface WishListItemsProps {
  item?: any;
  appState: any;
  removeWishListItem: Function;
  handleAddToBag: Function;
  token: string;
  renderCom: boolean;
}

const MyWishList = (): JSX.Element => {
  const [width] = useWindowSize();
  const { t } = useTranslation("common");
  const [wishListItem, setWishListItem] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [inventoryToken, setInventoryToken] = useState("");
  const { priceListId, appState, allWishListProducts, setAllWishListProducts } =
    useContext(AppContext);

  const arabicData: arabicDataProps = t(
    "accountReviewData",
    {},
    { returnObjects: true }
  );

  const [renderCom, setRenderCom] = useState(false);
  useEffect(() => {
    setRenderCom(true);
  }, []);

  useEffect(() => {
    fetchWishList(allWishListProducts);
    if (allWishListProducts?.length === 0) {
      setAddingItems(false);
    }
  }, []);

  useEffect(() => {
    if (!renderCom) {
      authInventory();
    }
  });
  const authInventory = async () => {
    const auth = await getInventoryAuth();
    const inventoryAuth = auth?.data?.accessToken;
    setInventoryToken(inventoryAuth);
  };

  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";
  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  const fetchWishList = async (wishList: [] = []) => {
    const wishListData =
      wishList && wishList?.length > 0 ? wishList : allWishListProducts;
    if (wishListData && wishListData.length > 0) {
      const getItemsbyItemIds = await fetchProductsByItemId(wishListData || []);
      const payload = {
        priceList: [priceListId],
        itemId: wishListData || [],
      };
      const response = await fetchProductPriceByItemId(payload);
      const wishListArray: ProductType[] = [];
      getItemsbyItemIds?.data?.products.filter(
        (product: { itemId: number }) => {
          let wishListObj: any = {};
          const matchedProduct = response?.data.find(
            (item: { itemId: number }) => product.itemId === item.itemId
          );
          if (matchedProduct) {
            wishListObj = {
              ...product,
              priceList: matchedProduct,
              totalPrice: {
                sale: matchedProduct?.offers?.price?.totalPrice,
                amount: matchedProduct?.offers?.price?.finalPrice,
                currency: matchedProduct?.offers?.price?.currency,
              },
            };
          } else {
            wishListObj = { ...product };
          }
          wishListArray.push(wishListObj);
        }
      );

      if (getItemsbyItemIds?.status === 200) {
        wishListArray?.map((product: ProductType, index) => {
          const modifiedProduct = destructureAttributes(product);
          wishListArray[index] = modifiedProduct;
        });
        wishListArray.length > 0 && setWishListItem(wishListArray);
      }
    }
  };

  const removeWishListItem = async (item: any) => {
    try {
      const response = await deleteWishList(item?.itemId, authToken);
      if (response?.status === 200) {
        const wishListData = response?.data?.items;
        await fetchWishList(wishListData);
        setAllWishListProducts(wishListData);
        typeof window !== "undefined" &&
          window.sessionStorage.setItem(
            "wishListArray",
            JSON.stringify(wishListData)
          );
      }
    } catch (err) {
      console.log("Error!");
    }
  };

  const addAllToBag = async (data: any) => {
    let items: any = [];
    data.map((item: any) => {
      const selectedProduct: {
        sku?: string;
        itemId?: string;
        Size?: number;
        Color?: string;
      } = item;

      const productPricing = {
        currency: "0",
        base: 0,
        finalPrice: 0,
      };
      const obj = {
        sku: selectedProduct && selectedProduct?.sku,
        itemId: selectedProduct && selectedProduct?.itemId,
        quantity: 1,
        priceListId: "100000",
        price: {
          currency: productPricing?.currency,
          amount: productPricing?.base,
          discount: {
            discountAmount: productPricing?.finalPrice,
          },
        },
      };
      items.push(obj);
    });

    const payLoadData = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items,
    };
    const response = addProductToCart(payLoadData);
    items.map(async (item: any) => {
      const array = [];
      const ids = {
        ...item,
      };
      array.push(ids);
      if (response) {
        const res = await deleteWishList(item?.itemId, authToken);
        items = res?.data?.items;
      }
    });
    setAllWishListProducts();
    typeof window !== "undefined" &&
      window.sessionStorage.removeItem("wishListArray");
    fetchWishList();
  };

  const handleAddToBag = async (item: any) => {
    const selectedProduct: {
      sku?: string;
      itemId?: string;
      Size?: number;
      Color?: string;
    } = item;

    const productPricing = {
      currency: "0",
      base: 0,
      finalPrice: 0,
    };

    const payload = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items: [
        {
          sku: selectedProduct && selectedProduct?.sku,
          itemId: selectedProduct && selectedProduct?.itemId,
          quantity: 1,
          priceListId: "100000",
          price: {
            currency: productPricing?.currency,
            amount: productPricing?.base,
            discount: {
              discountAmount: productPricing?.finalPrice,
            },
          },
        },
      ],
    };

    const response = addProductToCart(payload);
    if (response) {
      removeWishListItem(item);
    }
  };

  return (
    <>
      {renderCom && (
        <>
          <div className={styles["account-wishlist-wrapper"]}>
            <div
              className={`${styles["wishlist-heading"]} ${
                allWishListProducts?.length > 0 ? "" : styles["pb-sixteen"]
              }`}
            >
              <Heart fill={"black"} />
              <Label className={styles["label"]}>
                {appState?.lang === "en"
                  ? "my wish list"
                  : arabicData?.myReviewHeading}
              </Label>

              <div className={styles["wishlist-main"]}>
                <div className={styles["wishlist-items-numbers"]}>
                  {allWishListProducts?.length > 0 ? (
                    <p className={styles["wishlist-notice"]}>
                      {appState?.lang === "en"
                        ? `Displaying ${allWishListProducts?.length} Items`
                        : ` العرض ${allWishListProducts?.length} العناصر`}
                    </p>
                  ) : null}
                </div>
                {allWishListProducts?.length > 0 && (
                  <div className={styles["add-to-bag-btn"]}>
                    {addingItems ? (
                      <Spinner width={12} height={12} stroke={2} />
                    ) : (
                      <Bag
                        fill="#000000"
                        stroke="#000000"
                        width="16px"
                        height="16px"
                      />
                    )}
                    <button
                      onClick={() => {
                        setAddingItems(true);
                        addAllToBag(wishListItem);
                      }}
                      disabled={addingItems}
                    >
                      {appState?.lang === "en"
                        ? addingItems
                          ? "Adding..."
                          : "Add All to Bag"
                        : addingItems
                        ? "جارٍ الإضافة ..."
                        : "أضف الكل إلى الحقيبة"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {allWishListProducts?.length > 0 ? null : (
              <>
                <div className={styles["wishlist-notices"]}>
                  <p>
                    {appState?.lang === "en"
                      ? ` You currently don’t have any items on the wish list.`
                      : `ليس لديك حاليا أي عناصر في قائمة الرغبات.`}
                  </p>

                  <div className={styles["shopping-btn"]}>
                    <Button
                      buttonSize="sm"
                      onClick={() => {
                        // setModalOpen(true);
                      }}
                    >
                      {appState?.lang === "en"
                        ? "Start Shopping"
                        : "ابدأ التسوق"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          {allWishListProducts?.length > 0 && wishListItem && (
            <div className={styles["account-wishlist-wrapper"]}>
              {wishListItem.length > 0 &&
                wishListItem.map((item, index) => {
                  return (
                    <WishListItems
                      key={item.itemId}
                      item={item}
                      appState={appState}
                      removeWishListItem={removeWishListItem}
                      handleAddToBag={handleAddToBag}
                      token={inventoryToken}
                      renderCom={renderCom}
                    />
                  );
                })}
            </div>
          )}
          {allWishListProducts?.length > 0 && wishListItem && (
            <div className={styles["display-item-number"]}>
              <p>
                {appState?.lang === "en"
                  ? `Displaying ${allWishListProducts?.length} Items`
                  : ` العرض ${allWishListProducts?.length} العناصر`}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

const WishListItems = ({
  item,
  appState,
  removeWishListItem,
  handleAddToBag,
  token,
  renderCom,
}: WishListItemsProps) => {
  const [removingItem, setRemovingItem] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [checkNumber, setCheckNumber] = useState<boolean>(false);
  const imageSrc = item?.["Image URL"];

  const handleInventory = async () => {
    const res = await getInventoryByIds(token, item?.itemId);
    const num = res?.data?.inventory?.find(
      (loc: any) => loc?.locationNum == appState?.locationNum
    );
    if (!num) {
      setCheckNumber(true);
    } else {
      setCheckNumber(false);
    }
  };

  useEffect(() => {
    setCheckNumber(false);
    renderCom && handleInventory();
  }, [appState.locationNum]);

  return (
    <>
      <div className={styles["account-wishlist-main"]}>
        <div className={styles["cart-item-wrapper"]}>
          <div className={styles["cart-image"]}>
            <Image
              width={100}
              height={100}
              src={imageSrc || "/blue-ring.png"}
              alt=""
              layout="fixed"
            />
          </div>
          <div className={styles["item-details"]}>
            <div className={styles["item-title"]}>
              <span>
                {appState?.lang === "en"
                  ? item?.["Product Title"] || "No Title"
                  : "مجوهرات الماس تتصدر"}
              </span>
              <span>{`$${
                item?.totalPrice?.sale?.toLocaleString() ||
                item?.totalPrice?.amount?.toLocaleString() ||
                "0.00"?.toLocaleString()
              }`}</span>
            </div>
            <div className={styles["item-buttons"]}>
              {!checkNumber && (
                <div className={styles["add-to-bag-btn"]}>
                  {addingItem ? (
                    <Spinner width={12} height={12} stroke={2} />
                  ) : (
                    <Bag
                      fill="#000000"
                      stroke="#000000"
                      width="16px"
                      height="16px"
                    />
                  )}
                  <button
                    onClick={() => {
                      setAddingItem(true);
                      handleAddToBag(item);
                    }}
                    disabled={addingItem}
                  >
                    {appState?.lang === "en"
                      ? addingItem
                        ? "Adding..."
                        : "Add to Bag"
                      : addingItem
                      ? "جارٍ الإضافة ..."
                      : "أضف الى الحقيبة"}
                  </button>
                </div>
              )}

              <div className={styles["remove-btn"]}>
                {removingItem ? (
                  <Spinner width={12} height={12} stroke={2} />
                ) : (
                  <CrossSmall width={12} height={12} />
                )}
                <button
                  onClick={() => {
                    setRemovingItem(true);
                    removeWishListItem(item);
                  }}
                  disabled={removingItem}
                >
                  {appState?.lang === "en"
                    ? removingItem
                      ? "Removing..."
                      : "Remove"
                    : removingItem
                    ? "جارٍ الإزالة…"
                    : "إزالة"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {checkNumber && (
          <div className={styles["error-notice"]}>
            <Image width={20} height={20} src={"/help.png"} alt="" />
            <p>
              {appState?.lang === "en"
                ? `This product is not available in your region`
                : `هذا المنتج غير متوفر في منطقتك`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyWishList;
