import Axios from "axios";
import { CART_DOMAIN, CART_V2_X_API_KEY } from "general-config";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { AppContext } from "lib/context";
import { dummyATCpayload } from "lib/dummy-payloads";
import { ATCPayload } from "lib/types/cart";
import { ErrorObject } from "lib/types/common";
import { useContext } from "react";

const useCart = () => {
  const { cartId, setCartId, setCartItemCounter } = useContext(AppContext);
  const addProductToCart = async (payload?: ATCPayload) => {
    try {
      const atcResponse = await Axios.post(
        `${CART_DOMAIN}${ENDPOINTS.CART.ADD_ITEM_TO_CART}`,
        payload,
        {
          headers: { ...HEADERS.common, "x-api-key": CART_V2_X_API_KEY },
        }
      );
      if (cartId === null) {
        setCartId(atcResponse?.data?.cartId);
        sessionStorage.setItem("cartId", atcResponse?.data?.cartId);
      }

      return {
        hasError: false,
        response: atcResponse,
      };
    } catch (error: any) {
      return {
        hasError: true,
        code: error?.response?.data?.code,
      };
    }
  };

  const getCartByCartId = async (cartId: string) => {
    try {
      const response = await Axios.get(
        `${CART_DOMAIN}${ENDPOINTS.CART.GET_CART(cartId)}`,
        {
          headers: {
            ...HEADERS.common,
            "x-api-key": CART_V2_X_API_KEY,
          },
        }
      );
      if (response?.status === 200) {
        setCartItemCounter(response?.data?.totalItems);
        window.sessionStorage.setItem(
          "cartItem_counter",
          response?.data?.totalItems
        );
      }

      return response;
    } catch (error: unknown) {
      console.log(
        "Error while fecthing products",
        (error as ErrorObject)?.message
      );
    }
  };

  const updateItemOfCart = async (cartId: string, payload: {}) => {
    try {
      // const payload = ;
      const response = await Axios.patch(
        `${CART_DOMAIN}${ENDPOINTS.CART.UPDATE_ITEM_OF_CART(cartId)}`,
        payload,
        {
          headers: {
            ...HEADERS.common,
            "x-api-key": CART_V2_X_API_KEY,
          },
        }
      );
      if (response?.status === 200) {
        setCartItemCounter(response?.data?.totalItems);
        window.sessionStorage.setItem(
          "cartItem_counter",
          response?.data?.totalItems
        );
      }
      return response;
    } catch (error: unknown) {
      console.log(
        "Error while updating product",
        (error as ErrorObject)?.message
      );
    }
  };

  const removeItemFromCart = async (cartId: string, lineItemId: number) => {
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
            "x-api-key": CART_V2_X_API_KEY,
          },
        }
      );
      if (response?.status === 200) {
        setCartItemCounter(response?.data?.totalItems);
        window.sessionStorage.setItem(
          "cartItem_counter",
          response?.data?.totalItems
        );
      }
      return response;
    } catch (error: unknown) {
      console.log(
        "Error while removing product",
        (error as ErrorObject)?.message
      );
    }
  };

  return {
    addProductToCart,
    getCartByCartId,
    updateItemOfCart,
    removeItemFromCart,
  };
};
export default useCart;
