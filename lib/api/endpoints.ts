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
    GET_PRODUCTS_BY_ITEM_IDS: (itemIds: []) =>
      `https://sandbox.copilot.fabric.inc/api-product/v1/product?itemIds=[${itemIds}]`,
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

  INVENTORY: {
    GET_BY_IDS: (itemId: number) =>
      `/api-inventory/inventory?itemIds=${itemId}`,
    GET_AUTH: `/api-commerceIdentity/auth/local/login`,
  },

  WISHLIST: {
    GET_WISHLIST: "/api-cart/wishlist/user",
    DELETE_WISHLIST: (itemID: string | number) =>
      `/api-cart/wishlist/user/item/${itemID}`,
  },

  IDENTITY: {
    GET_USER_INFO: "/ums/v2/users/self",
    RESET_PASSWORD: "/ums/v2/auth/self/password",
    GET_FABRIC_CUSTOMER: (fabricUserId: string) =>
      `/data-customer/v1/users/${fabricUserId}`,
    GET_CUSTOMER_PROFILE: (fabricCustomerId: string) =>
      `/data-customer/v1/user-party/user/${fabricCustomerId}?offset=0&limit=10`,
    CREATE_CUSTOMER_PROFILE: "/data-customer/v1/individuals",
    LINK_USER_TO_INDIVIDUAL: "/data-customer/v1/user-party",
    UPDATE_OKTA_USER: "/ums/v2/users/self",
    UPDATE_CUSTOMER_PROFILE: (individualId: string) =>
      `/data-customer/v1/individuals/${individualId}`,
  },

  REVIEWS: {
    GET_REVIEWS: (storeHash: string | number, productId: string | number) =>
      `https://stamped.io/api/v2/${storeHash}/dashboard/reviews?search=${productId}`,

    CREATE_REVIEW: (apikey: string | number, storeHash: string | number) =>
      `https://stamped.io/api/reviews3?apiKey=${apikey}&sId=${storeHash}`,

    TRANSLATE_REVIEWS:
      "https://translation.googleapis.com/language/translate/v2",
  },

  CHECKOUT: {
    CREATE_CUSTOMER: `/customers`,
    GET_CUSTOMER: (email: string) => `/customers/${email}`,
    GET_PAYMENT_TOKEN: `/tokens`,
    CREATE_PAYMENT_INSTRUMENT: `/instruments`,
    UPDATE_PAYMENT_INSTRUMENT: (id: string) => `/instruments/${id}`,
    DELETE_PAYMENT_INSTRUMENT: (id: string) => `/instruments/${id}`,
  },
};

export default ENDPOINTS;
