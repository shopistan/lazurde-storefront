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
      (payload = dummyATCpayload),
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
