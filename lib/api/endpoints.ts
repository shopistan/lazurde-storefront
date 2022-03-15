export const ENDPOINTS = {
  XM: {
    FETCH_PAGE_BY_URL: "/api-xpm/page/live",
    FETCH_GLOBAL_COMPONENTS: "/api-xpm/global-component/live",
  },

  RTPE: {
    GET_PRICE_BY_ITEM_ID: "/price/get-by-sku",
  },

  CART: {
    ADD_ITEM_TO_CART: "/v2/carts/items"
  },

  COPILOT: {
    PIM: {
      FETCH_ALL_CATEGORIES: "/api-category/v1/category?page=1&size=10&type=PRIMARY",
      FETCH_PRODUCT_BY_SKU: "/api-product/v1/product"
    }
  }
};
