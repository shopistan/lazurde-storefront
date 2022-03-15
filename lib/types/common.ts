export type XMComponent = {
  id: string;
  params: object;
};

export type ErrorObject = {
  code?: string | number;
  message: string;
};

export type ImageObject = {
  url: string;
  altText: string;
};

export type NavLinks = {
  url: string;
  linkText: string;
};

export type HeaderProps = {
  navLinks: NavLinks[];
  brandImage: ImageObject;
};

export type FooterProps = {
  footerLinks: NavLinks[];
};

export type PageProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  pageComponents?: XMComponent[];
};

export type ProductAttribute = {
  id: string
  name: string,
  description: string,
  mapping: string,
  type: string,
  value: string
}

export type Product = {
  sku: string;
  itemId: number,
  categories: any[],
  attributes: ProductAttribute[],
  variants: any[]
}
