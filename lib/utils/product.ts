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

export const fetchProductsByItemId = async (itemIds: []) => {
  try {
    const response = await Axios.get(
      `${ENDPOINTS.RTPE.GET_PRODUCTS_BY_ITEM_IDS(itemIds)}`,
      {
        headers: {
          ...HEADERS.common,
          Authorization:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MjM0MzEzLCJleHAiOjE2NTQyMzYxMTN9.rNteIxD1Ayd3FB7whWILHMPZ1g0vMKmDeKjfy9oWPZb7S4MW1_en2dj6-idQzHBl7RfYW0-WZMvgpu1A1WzcnKx8t2tsbGdz62auaU63yBWQ-ELqHEXHPmYOeSN1DQqOODx58jEvKkaB7Q71B33Wm55-yol-ynfIB76p6XRLyCM",
        },
      }
    );
    return (response as any) || null;
  } catch (error) {
    console.log(`Error fetching items!`, (error as ErrorObject).message);
  }
  return null;
};
