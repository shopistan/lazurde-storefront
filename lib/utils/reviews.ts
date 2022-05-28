import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { STAMPED_STORE_HASH_ID, STAMPED_USERNAME } from "general-config";

export const getReviews = async (productId: number | string) => {
  try {
    const payload = STAMPED_STORE_HASH_ID;
    const response = await Axios.get(
      `${ENDPOINTS.GET.REVIEWS(payload, productId)}`,
      {
        headers: HEADERS.reviews,
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

export const writeReview = async (payload?: any) => {
  try {
    const apiKey = STAMPED_USERNAME;
    const storeHash = STAMPED_STORE_HASH_ID;

    const writeReview = await Axios.post(
      `${ENDPOINTS.POST.CREATE_REVIEW(apiKey, storeHash)}`,
      payload,
      {
        headers: HEADERS.reviews,
      }
    );
    return writeReview;
  } catch (error: unknown) {
    console.log(
      "Error while adding a review: ",
      (error as ErrorObject).message
    );
  }
};
