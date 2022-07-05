import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import {
  STAMPED_STORE_HASH_ID,
  STAMPED_USERNAME,
  GOOGLE_TRANSLATE_API_KEY,
} from "general-config";

export const getReviews = async (productId: number | string) => {
  try {
    const payload = STAMPED_STORE_HASH_ID;
    const response = await Axios.get(
      `${ENDPOINTS.REVIEWS.GET_REVIEWS(payload, productId)}`,
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
      `${ENDPOINTS.REVIEWS.CREATE_REVIEW(apiKey, storeHash)}`,
      payload,
      {
        headers: HEADERS.reviews,
      }
    );
    return {
      hasError: false,
      response: writeReview,
    };
  } catch (error: unknown) {
    return {
      hasError: true,
    };
  }
};

export const translateReviews = async (payload?: any, targetLang?: string) => {
  try {
    const translateReview = await Axios.post(
      `${ENDPOINTS.REVIEWS.TRANSLATE_REVIEWS}`,
      {},
      {
        params: {
          q: payload,
          target: targetLang || "en",
          key: GOOGLE_TRANSLATE_API_KEY,
        },
      }
    );
    return {
      hasError: false,
      response: translateReview,
    };
  } catch (error: unknown) {
    return {
      hasError: true,
    };
  }
};
