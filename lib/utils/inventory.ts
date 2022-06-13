import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { OMS_DOMAIN } from "general-config";

export const getInventoryByIds = async (authToken: any) => {
  try {
    const response = await Axios.get(`${OMS_DOMAIN}${ENDPOINTS.INVENTORY.GET_BY_IDS}`, {
      headers: { ...HEADERS.common, Authorization: authToken },
    });
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};
