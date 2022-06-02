import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { GET_ORDER } from "general-config";

export const getOrders = async () => {
  try {
    // const payload = ;
    const response = await Axios.get(`${GET_ORDER}${ENDPOINTS.OMS.GET_ORDER}`, {
      headers: HEADERS.common,
    });
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};
