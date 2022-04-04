export type XMComponent = {
  id: string;
  params: object;
};

export type ErrorObject = {
  code?: string | number;
  message: string;
};

export type ImageType = {
  url: string;
  altText: string;
};

export type NavLinks = {
  url: string;
  linkText: string;
};

export type HeaderProps = {
  navLinks: NavLinks[];
  brandImage: ImageType;
};

export type FooterProps = {
  footerLinks: NavLinks[];
};

export type PageProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  pageComponents?: XMComponent[];
};

export type Brand = "lazurde" | "missl" | "kenaz";
