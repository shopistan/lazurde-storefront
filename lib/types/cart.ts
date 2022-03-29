import { type } from "os";
import { Price } from "./rtpe";

export type CartItem = {
  sku: string;
  itemId: string | number;
  quantity: number;
  priceListId: string | number;
  price: Price;
};

export type ATCPayload = {
  cartId: string | null;
  items: CartItem[];
};
