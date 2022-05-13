export type FetchCategoryProductsArgs = {
  categoryName: string;
  page?: number;
  filterParents?: boolean;
};

export type FilteredSearchArgs = {
  query: string;
  filters: string[];
};

export type KeywordSearchArgs = {
  query: string;
  pageSize?: number;
  page?: number;
  filterParents?: boolean;
  facetFilters?: string[];
};

export type AlgoliaProductType = {
  "Product Title": string;
  "Image URL": string;
  Type: string;
  "Last Chance": boolean;
  "Online Exclusive": boolean;
  "New In": boolean;
  "Best Seller": boolean;
  Collection: string;
  Brand: string;
  Description: string;
  Category: string;
  "Image 1 URL"?: string;
  itemId: number;
  "Base Price": number;
  "Order Price": number;
  sku: number | string;
  title?: string;
};
