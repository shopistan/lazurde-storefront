import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { STAMPED_STORE_HASH_ID } from "general-config";

export const getReviews = async () => {
  try {
    const payload = STAMPED_STORE_HASH_ID;
    const response = await Axios.get(`${ENDPOINTS.GET.REVIEWS(payload)}`, {
      headers: HEADERS.reviews,
    });
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};
