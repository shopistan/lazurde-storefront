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
  promoTitle: string;
  promoLinkText: string;
  promoLink: string;
};

export type FooterProps = {
  footerLinks: NavLinks[];
};

export type PageProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  pageComponents?: XMComponent[];
};

export type BrandType = "lazurde" | "missl" | "kenaz";
export type LangType = "en" | "ar";
export type RegionType = "sa" | "ae" | "eg";
export type LocaleType =
  | "en"
  | "en-sa"
  | "en-ae"
  | "en-eg"
  | "ar"
  | "ar-sa"
  | "ar-ae"
  | "ar-eg";

export type ChannelType = 12 | 13 | 14 | 0;

export type AppStateType = {
  channel: ChannelType;
  brand: BrandType;
  locale: LocaleType;
  lang: LangType;
  region: RegionType;
};
