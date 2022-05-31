import Axios from "axios";
import {
  COPILOT_DOMAIN,
  RTPE_DOMAIN,
  RTPE_X_API_KEY,
  TENANT_KEY,
} from "general-config";
import { ProductType } from "lib/types/product";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";

//@ts-ignore
import * as qs from "qs";

export const fetchAllProducts = async (page: Number, size: Number) => {
  try {
    const allProductsResponse = await Axios.get(
      `${COPILOT_DOMAIN}${ENDPOINTS.COPILOT.PIM.FETCH_ALL_PRODUCTS(
        page,
        size
      )}`,
      {
        headers: HEADERS.common,
      }
    );
    return (allProductsResponse as any)?.data?.products || [];
  } catch (error) {
    console.log("Error fetching all products", (error as ErrorObject).message);
  }
  return null;
};

export const fetchProductBySku = async (sku: string) => {
  try {
    const productResponse = await Axios.get(
      `${COPILOT_DOMAIN}${ENDPOINTS.COPILOT.PIM.FETCH_PRODUCT_BY_SKU(sku)}`,
      {
        headers: HEADERS.common,
      }
    );
    return (productResponse as any)?.data?.products[0] || null;
  } catch (error) {
    console.log("Error fetching product", (error as ErrorObject).message);
  }
  return null;
};

/**
 * NOTE: itemId is to be passed in requestBody, {priceList: [priceListId], itemId: [itemId]}
 */

export const fetchProductPriceByItemId = async (requestBody: any) => {
  try {
    const priceResponse = await Axios.post(
      `${RTPE_DOMAIN}${ENDPOINTS.RTPE.GET_PRICE_BY_ITEM_ID}`,
      requestBody,
      {
        headers: {
          ...HEADERS.common,
          "x-api-key": RTPE_X_API_KEY,
          "tenant-key": TENANT_KEY,
        },
      }
    );
    return (priceResponse as any) || null;
  } catch (error) {
    console.log(
      `Error fetching price for itemId: ${requestBody.itemId}`,
      (error as ErrorObject).message
    );
  }
  return null;
};

export const getAttributeValue = (
  product: ProductType,
  attributeName: string
) => {
  const { attributes = [] } = product;
  const matchingAttribute = attributes.find(
    (attribute) => attribute.name.toLowerCase() === attributeName.toLowerCase()
  );

  if (matchingAttribute) {
    return matchingAttribute.value;
  }
  return matchingAttribute;
};
