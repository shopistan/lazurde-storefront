export type XMComponent = {
  id: string;
  params: { headerId: string };
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

export type BrandArrType = {
  url: string;
  altText: string;
  label: string;
  labelUrl: string;
  brandImg: ImageType;
};

export type HeaderProps = {
  headerId: string;
  siteNavBar: [];
  siteLogo: ImageType;
  siteLogoUrl: string;
  navLinks: NavLinks[];
  brandImage: ImageType;
  promoTitle: string;
  promoLinkText: string;
  mobilePromoLinkText: string;
  promoLink: string;
  promoBackground: string;
};

export type BrandSidebarProps = {
  mainImg: ImageType;
  mainTitle: string;
  logoArr: [{ logoImg: ImageType }];
  brandArr: BrandArrType[];
};

export type footerLinksType = {
  linkHeading: string;
  links: [];
};

export type iconsObjType = {
  link: string;
  icon: ImageType;
};
interface footerLogoProp {
  url: string;
  altText: string;
}

export type FooterProps = {
  footerLinks: footerLinksType[];
  heading: string;
  subHeading: string;
  linkLabel: string;
  linkUrl: string;
  subscriptionText: string;
  socialIconText: string;
  socialLinks: iconsObjType[];
  footerLogo: footerLogoProp;
  paymentLinks: iconsObjType[];
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
