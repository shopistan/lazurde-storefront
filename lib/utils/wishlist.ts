import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { WISHLIST } from "general-config";

export const getWishList = async (authToken: any) => {
  try {
    // const payload = ;
    const response = await Axios.get(
      `${WISHLIST}${ENDPOINTS.WISHLIST.GET_WISHLIST}`,
      {
        headers: { ...HEADERS.common, Authorization: authToken },
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

export const deleteWishList = async (itemID: any, authToken: any) => {
  try {
    // const payload = ;
    const response = await Axios.delete(
      `${WISHLIST}${ENDPOINTS.WISHLIST.DELETE_WISHLIST(itemID)}`,
      {
        headers: { ...HEADERS.common, Authorization: authToken },
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
