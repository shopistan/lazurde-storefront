import { Product } from "lib/types/product";

export const getAttributeValue = (product: Product, attributeName: string) => {
  const { attributes = [] } = product;
  const matchingAttribute = attributes.find(
    (attribute) => attribute.name.toLowerCase() === attributeName.toLowerCase()
  );

  if (matchingAttribute) {
    return matchingAttribute.value;
  }
  return matchingAttribute;
};
