const ENDPOINTS = {
  XM: {
    FETCH_PAGE_BY_URL: (channel: number, url: string) =>
      `/api-xpm/v2/page/live?channel=${channel}&url=${url}`,
    FETCH_GLOBAL_COMPONENTS: "/api-xpm/global-component/live",
    FETCH_ALL_LIVE_PAGES: "/api-xpm/v2/pages/live?channel=12",
  },

  RTPE: {
    GET_PRICE_BY_ITEM_ID: "/price/get-by-sku",
    EVALUATE_PROMOTION: "/promo/evaluate-promotions",
  },

  CART: {
    ADD_ITEM_TO_CART: "/v2/carts/items",
    REMOVE_ITEM_FROM_CART: (cartId: string, lineItemId: number) =>
      `https://dev.cart.fabric.inc/v2/carts/${cartId}/items/${lineItemId}`,
    GET_CART: (cartId: string) =>
      `https://dev.cart.fabric.inc/v2/carts/${cartId}`,
  },

  COPILOT: {
    PIM: {
      FETCH_ALL_CATEGORIES:
        "/api-category/v1/category?page=1&size=10&type=PRIMARY",
      FETCH_PRODUCT_BY_SKU: (skus: string[]) =>
        `/api-product/v1/product?skus=${skus}`,
    },
  },

  OMS: {
    CREATE_ORDER: "/api-order/orders",
  },
};

export default ENDPOINTS;
