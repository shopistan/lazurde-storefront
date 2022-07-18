import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import {
  CHECKOUT_DOMAIN,
  CHECKOUT_SECRET_KEY,
  CHECKOUT_PUBLIC_KEY,
} from "general-config";
import {
  InstrumentProps,
  TokenProps,
  UpdateInstrumentProps,
  CheckoutCustomerProps,
} from "lib/types/common";

export const createNewCheckoutCustomer = async (
  payload: CheckoutCustomerProps
) => {
  
  try {
    const response = await Axios.post(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.CREATE_CUSTOMER}`,
      {
        ...payload,
      },
      {
        headers: { Authorization: `${CHECKOUT_SECRET_KEY}` },
      }
    );
    return response;
  } catch (error) {
    console.log("ERRORCHECK", error);
  }
};

export const getCheckoutCustomerDetails = async (email: string) => {
  try {
    const response = await Axios.get(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.GET_CUSTOMER(email)}`,
      {
        headers: { Authorization: `${CHECKOUT_SECRET_KEY}` },
      }
    );
    return response;
  } catch (error) {
    console.log("ERRORCHECK", error);
  }
};

export const getCheckoutPaymentToken = async (payload: TokenProps) => {
  try {
    const response = await Axios.post(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.GET_PAYMENT_TOKEN}`,
      {
        ...payload,
      },
      {
        headers: { Authorization: `${CHECKOUT_PUBLIC_KEY}` },
      }
    );
    return response;
  } catch (error: unknown) {}
};

export const createCheckoutPaymentInstrument = async (
  payload: InstrumentProps
) => {
  try {
    const response = await Axios.post(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.CREATE_PAYMENT_INSTRUMENT}`,
      {
        ...payload,
      },
      {
        headers: { Authorization: CHECKOUT_SECRET_KEY },
      }
    );
    return response;
  } catch (error: unknown) {}
};

export const updateCheckoutPaymentInstrument = async (
  instrumentId: string,
  payload: UpdateInstrumentProps
) => {
  try {
    const response = await Axios.patch(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.UPDATE_PAYMENT_INSTRUMENT(
        instrumentId
      )}`,
      {
        ...payload,
      },
      {
        headers: { Authorization: CHECKOUT_SECRET_KEY },
      }
    );
    return response;
  } catch (error: unknown) {}
};

export const removeCheckoutPaymentInstrument = async (instrumentId: string) => {
  try {
    const response = await Axios.delete(
      `${CHECKOUT_DOMAIN}${ENDPOINTS.CHECKOUT.DELETE_PAYMENT_INSTRUMENT(
        instrumentId
      )}`,
      {
        headers: { Authorization: CHECKOUT_SECRET_KEY },
      }
    );
    return response;
  } catch (error: unknown) {}
};
