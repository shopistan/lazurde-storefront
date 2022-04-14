export type XMComponent = {
  id: string;
  params: {headerId: string};
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

export type BrandProps = {
  url: string;
  altText: string;
  label: string;
  labelUrl: string;
  brandImg: ImageType;
}

export type HeaderProps = {
  headerId: string;
  siteNavBar: [];
  siteLogo: ImageType;
  navLinks: NavLinks[];
  brandImage: ImageType;
  promoTitle: string;
  promoLinkText: string;
  mobilePromoLinkText: string;
  promoLink: string;
};

export type BrandSidebarProps = {
  mainImg: ImageType;
  mainTitle: string;
  logoArr: [{logoImg: ImageType}];
  brandArr: BrandProps[];
};

interface footerLinks {
  linkHeading: string;
  links: [];
}
interface iconsObj {
  link: string;
  icon: ImageType;
}
interface footerLogoProp {
  url: string;
  altText: string;
}

export type FooterProps = {
  footerLinks: footerLinks[];
  heading: string;
  subHeading: string;
  linkLabel: string;
  linkUrl: string;
  subscriptionText: string;
  socialIconText: string;
  socialLinks: iconsObj[];
  footerLogo: footerLogoProp;
  paymentLinks: iconsObj[];
};

export type PageProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  brandSidebarProps: BrandSidebarProps;
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
