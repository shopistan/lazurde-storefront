import { ATCPayload } from "lib/types/cart";

export const dummyATCpayload: ATCPayload = {
  cartId: null,
  items: [
    {
      sku: "KB606165",
      itemId: 57,
      quantity: 1,
      priceListId: "100000",
      price: {
        currency: "USD",
        amount: 440,
        discount: {
          discountAmount: 0,
        },
      },
    },
  ],
};
