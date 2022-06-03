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
      `/v2/carts/${cartId}/items/${lineItemId}`,
    UPDATE_ITEM_OF_CART: (cartId: string) => `/v2/carts/${cartId}/items`,
    GET_CART: (cartId: string) => `/v2/carts/${cartId}`,
  },
  COPILOT: {
    PIM: {
      FETCH_ALL_CATEGORIES:
        "/api-category/v1/category?page=1&size=10&type=PRIMARY",
      FETCH_PRODUCT_BY_SKU: (skus: string) =>
        `/api-product/v1/product?skus=${JSON.stringify([skus])}`,
      FETCH_ALL_PRODUCTS: (page: Number, size: Number) =>
        `/api-product/v1/product?page=${page}&size=${size}`,
    },
  },

  OMS: {
    CREATE_ORDER: "/api-order/orders",
    GET_ORDER: "/api-order/orders/user",
  },

  WISHLIST: {
    GET_WISHLIST: "/api-cart/wishlist/user",
    DELETE_WISHLIST: (itemID: string | number) =>
      `/api-cart/wishlist/user/item/${itemID}`,
  },

  GET: {
    REVIEWS: (storeHash: string | number, productId: string | number) =>
      `https://stamped.io/api/v2/${storeHash}/dashboard/reviews?search=${productId}`,
  },

  POST: {
    CREATE_REVIEW: (apikey: string | number, storeHash: string | number) =>
      `https://stamped.io/api/reviews3?apiKey=${apikey}&sId=${storeHash}`,
  },
};

export default ENDPOINTS;
