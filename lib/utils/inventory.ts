import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { OMS_DOMAIN, WISHLIST } from "general-config";

export const getInventoryByIds = async (authToken: string, itemId: any) => {
  try {
    const response = await Axios.get(
      `${OMS_DOMAIN}${ENDPOINTS.INVENTORY.GET_BY_IDS(itemId)}`,
      {
        headers: { ...HEADERS.common, Authorization: authToken },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};

export const getInventoryAuth = async () => {
  try {
    const response = await Axios.post(
      `${WISHLIST}${ENDPOINTS.INVENTORY.GET_AUTH}`,
      {
        username: "test@fabric.inc",
        password: "test1234",
      },
      {
        headers: { ...HEADERS.common },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};
