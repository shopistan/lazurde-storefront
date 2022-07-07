export type ProductAttributeType = {
  _id?: string;
  name: string;
  description: string;
  mapping: string;
  type: string;
  value: string;
};

export type ProductCategoryBreadcrumbType = {
  id: string;
  name: string;
  attributes: any[];
};

export type ProductCategoryType = {
  id: string;
  name: string;
  breadcrumbs: ProductCategoryBreadcrumbType[];
};

export type ProductType = {
  _id?: string;
  sku: string;
  itemId: number;
  children: any[];
  type: string;
  status: boolean;
  bundleItems: any[];
  categories?: ProductCategoryType[];
  attributes: ProductAttributeType[];
  variants: any[];
  dependants: any[];
  priceList?: any;
  totalPrice?: any;
  isLocation?: string;
  hasStock?: Boolean;
};
