/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import Label from "components/common/ui/label";
import styles from "./style.module.scss";
import { Heart } from "components/icons";
import Image from "next/image";
import { Bag, CrossSmall } from "components/icons";
import Spinner from "components/common/ui/spinner";
import { getWishList, deleteWishList, addWishList } from "lib/utils/wishlist";
import { getInventoryByIds, getInventoryAuth } from "lib/api/inventory";
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
import WishListItems from "./wishlist-Item";
import useCart from "lib/utils/cart";

interface arabicDataProps {
  myReviewHeading?: string;
  myPastReviews?: string;
}

interface WishListItemsProps {
  item?: any;
  appState: any;
  removeWishListItem: Function;
  handleAddToBag: Function;
  renderSpinner: Function;
  adding: Boolean;
}

const MyWishList = (): JSX.Element => {
  const { addProductToCart } = useCart();
  const [width] = useWindowSize();
  const { t } = useTranslation("common");
  const [wishListItem, setWishListItem] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [checkNumber, setCheckNumber] = useState(true);
  const [compRender, setCompRender] = useState(false);
  const [adding, setAdding] = useState(false);
  const {
    cartId,
    priceListId,
    appState,
    allWishListProducts,
    setAllWishListProducts,
  } = useContext(AppContext);

  const arabicData: arabicDataProps = t(
    "accountReviewData",
    {},
    { returnObjects: true }
  );

  const [renderCom, setRenderCom] = useState(false);
  useEffect(() => {
    setRenderCom(true);
  }, []);

  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";
  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  useEffect(() => {
    fetchWishList(allWishListProducts);
    if (allWishListProducts?.length === 0) {
      setAddingItems(false);
    }
  }, []);

  const fetchWishList = async (wishList: [] = []) => {
    setCheckNumber(false);
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
      const auth = await getInventoryAuth();
      const inventoryAuth = auth?.data?.accessToken;
      if (getItemsbyItemIds?.status === 200) {
        const newArray = await Promise.all(
          wishListArray.map(async (product, index) => {
            const locationNumber = await handleInventory(
              inventoryAuth,
              product?.itemId
            );
            let newObj = {
              ...product,
              isLocation: locationNumber,
            };
            const modifiedProduct = destructureAttributes(newObj);
            wishListArray[index] = modifiedProduct;
            const checkLoc = wishListArray?.find(
              (arr: any) => arr?.isLocation === "true"
            );
            if (checkLoc?.isLocation) {
              setCheckNumber(true);
            }
            return modifiedProduct;
          })
        );
        newArray.length > 0 && setWishListItem(newArray);
        setCompRender(true);
      }
      setAdding(false);
    }
  };

  const handleInventory = async (token: string, itemId: Number) => {
    let locationNumber = "";
    const resInventory = await getInventoryByIds(token, itemId);
    const locationCheck = resInventory?.data?.inventory?.find(
      (loc: any) => loc?.locationNum == appState?.locationNum
    );
    if (locationCheck) {
      locationNumber = "true";
    } else {
      locationNumber = "false";
    }

    return locationNumber;
  };

  useEffect(() => {
    setCompRender(false);
    setCheckNumber(false);

    renderCom && fetchWishList();
  }, [appState.locationNum]);

  useEffect(() => {
    setCheckNumber(false);
  }, [appState.region]);

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
    setAdding(true);
    const filterData = data?.filter((item: any) => item?.isLocation === "true");
    let items: any = [];

    filterData.map((filter: any) => {
      const selectedProduct: {
        sku?: string;
        itemId?: string;
        Size?: number;
        Color?: string;
      } = filter;

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
      cartId: cartId,
      items,
    };
    const response = addProductToCart(payLoadData);
    let newItems = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (response) {
        const res = await deleteWishList(item?.itemId, authToken);

        newItems = res?.data?.items;
      }
    }

    await fetchWishList(newItems);
    typeof window !== "undefined" &&
      window.sessionStorage.setItem("wishListArray", JSON.stringify(newItems));
    setAddingItems(false);
    setAllWishListProducts(newItems);
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
      cartId: cartId,
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

  const renderSpinner = () => {
    return <Spinner width={12} height={12} stroke={2} />;
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
              <Label role="mywishlist" className={styles["label"]}>
                {appState?.lang === "en"
                  ? "my wish list"
                  : arabicData?.myReviewHeading}
              </Label>

              <div className={styles["wishlist-main"]}>
                <div className={styles["wishlist-items-numbers"]}>
                  {allWishListProducts?.length > 0 ? (
                    <p
                      role="wishlist-notice"
                      className={styles["wishlist-notice"]}
                    >
                      {appState?.lang === "en"
                        ? `Displaying ${allWishListProducts?.length} Items`
                        : ` العرض ${allWishListProducts?.length} العناصر`}
                    </p>
                  ) : null}
                </div>
                {allWishListProducts?.length > 0 && (
                  <div className={styles["add-to-bag-btn"]}>
                    {addingItems ? (
                      renderSpinner()
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
                      role="button"
                      disabled={!checkNumber}
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
                      testId="shoppingbtn"
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
            <div role="items" className={styles["account-wishlist-wrapper"]}>
              {wishListItem.length > 0 &&
                wishListItem.map((item) => {
                  return (
                    compRender && (
                      <WishListItems
                        key={item.itemId}
                        item={item}
                        appState={appState}
                        removeWishListItem={removeWishListItem}
                        handleAddToBag={handleAddToBag}
                        renderSpinner={renderSpinner}
                        adding={adding}
                      />
                    )
                  );
                })}
            </div>
          )}
          {allWishListProducts?.length > 0 && wishListItem && (
            <div className={styles["display-item-number"]}>
              <p role="para">
                {appState?.lang === "en"
                  ? `Displaying ${allWishListProducts?.length} Items`
                  : ` العرض ${allWishListProducts?.length} العناصر`}
              </p>
              {!compRender && <>{renderSpinner()} ...</>}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyWishList;
