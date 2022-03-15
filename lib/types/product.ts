export type ProductAttribute = {
  _id: string;
  name: string;
  description: string;
  mapping: string;
  type: string;
  value: string;
};

export type ProductCategoryBreadcrumb = {
  id: string;
  name: string;
  attributes: any[];
};

export type ProductCategory = {
  id: string;
  name: string;
  breadcrumbs: ProductCategoryBreadcrumb[];
};

export type Product = {
  _id: string;
  sku: string;
  itemId: number;
  children: any[];
  type: string;
  status: boolean;
  bundleItems: any[];
  categories: ProductCategory[];
  attributes: ProductAttribute[];
  variants: any[];
  dependants: any[];
};
