export type XMComponent = {
  id: string;
  params: object;
};

export type ErrorObject = {
  code?: string | number;
  message: string;
};

export type ImageObject = {
  imageUrl: string;
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
  pageComponents: XMComponent[];
};
