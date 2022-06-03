import Axios from "axios";
import { CART_DOMAIN, CART_V2_X_API_KEY } from "general-config";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { dummyATCpayload } from "lib/dummy-payloads";
import { ATCPayload } from "lib/types/cart";
import { ErrorObject } from "lib/types/common";

export const addProductToCart = async (payload?: ATCPayload) => {
  try {
    const atcResponse = await Axios.post(
      `${CART_DOMAIN}${ENDPOINTS.CART.ADD_ITEM_TO_CART}`,
      payload,
      {
        headers: { ...HEADERS.common, "x-api-key": CART_V2_X_API_KEY },
      }
    );
  } catch (error: unknown) {
    console.log(
      "Error while adding product to cart: ",
      (error as ErrorObject).message
    );
  }
};

export const getCartByCartId = async (cartId: string) => {
  try {
    const response = await Axios.get(
      `${CART_DOMAIN}${ENDPOINTS.CART.GET_CART(cartId)}`,
      {
        headers: {
          ...HEADERS.common,
          "x-api-key": "vil3wWGlGw97CVv5WeIqM9ZQJyX1WZx65i6gBg0i",
        },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing wishlist",
      (error as ErrorObject)?.message
    );
  }
};

export const updateItemOfCart = async (cartId: string, payload: {}) => {
  try {
    // const payload = ;
    const response = await Axios.patch(
      `${CART_DOMAIN}${ENDPOINTS.CART.UPDATE_ITEM_OF_CART(cartId)}`,
      payload,
      {
        headers: {
          ...HEADERS.common,
          "x-api-key": "vil3wWGlGw97CVv5WeIqM9ZQJyX1WZx65i6gBg0i",
        },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing wishlist",
      (error as ErrorObject)?.message
    );
  }
};

export const removeItemFromCart = async (
  cartId: string,
  lineItemId: number
) => {
  try {
    // const payload = ;
    const response = await Axios.delete(
      `${CART_DOMAIN}${ENDPOINTS.CART.REMOVE_ITEM_FROM_CART(
        cartId,
        lineItemId
      )}`,
      {
        headers: {
          ...HEADERS.common,
          "x-api-key": "vil3wWGlGw97CVv5WeIqM9ZQJyX1WZx65i6gBg0i",
        },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing wishlist",
      (error as ErrorObject)?.message
    );
  }
};
