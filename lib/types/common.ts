export type XMComponent = {
  id: string;
  params: { headerId: string };
};

export type ErrorObject = {
  code?: string | number;
  message: string;
  response?: {
    code?: string;
    status?: string | number;
    data?: any;
  };
};

export interface ImageType {
  url: string;
  altText: string;
}

export type NavLinks = {
  url: string;
  linkText: string;
};

export type BrandArrType = {
  url?: string;
  altText?: string;
  label?: string;
  labelUrl?: string;
  brandImg?: ImageType;
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
  logoArr: { logoImg: ImageType }[];
  brandArr: BrandArrType[];
};

export type FooterLinksType = {
  linkHeading: string;
  links: { url: string; text: string }[];
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
  footerLinks?: FooterLinksType[] | [];
  heading?: string;
  subHeading?: string;
  linkLabel?: string;
  linkUrl?: string;
  subscriptionText?: string;
  socialIconText?: string;
  socialLinks?: iconsObjType[];
  footerLogo?: footerLogoProp;
  footerLogoLink?: string;
  paymentLinks?: iconsObjType[];
};

export interface PageProps {
  headerProps: HeaderProps;
  headerArray: [];
  footerProps: FooterProps;
  brandSidebarProps: BrandSidebarProps;
  pageComponents?: XMComponent[];
}

export type BrandType = `L'azurde` | `Miss L'` | `Kenaz`;
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
  locationNum: Number;
};

export type AuthTokens = {
  access_token?: string;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expires_in: number;
};

export type CheckoutCustomerProps = {
  email: string;
  name: string;
  phone?: {
    number: string;
    country_code: string;
  };
  metadata?: {
    coupon_code?: string;
    partner_id?: number;
  };
};

export type TokenProps = {
  type: "card";
  number: string;
  expiry_month: number;
  expiry_year: number;
  name: string;
  cvv: string;
  billing_address?: {
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip: string;
    country: "SA" | "EG" | "AE";
  };
  phone?: {
    number: string;
    country_code: string;
  };
};

export type InstrumentProps = {
  type: "token";
  token: string;
  account_holder?: {
    billing_address?: {
      address_line1: string;
      address_line2: string;
      city: string;
      state: string;
      zip: string;
      country: "SA" | "EG" | "AE";
    };
    phone?: {
      country_code: string;
      number: string;
    };
  };
  customer: {
    id: string;
    phone?: {
      country_code: string;
      number: string;
    };
    default: boolean;
  };
};

export type UpdateInstrumentProps = {
  expiry_month: number;
  expiry_year: number;
  name: string;
  account_holder?: {
    billing_address?: {
      address_line1: string;
      address_line2: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone?: {
      country_code: string;
      number: string;
    };
  };
  customer: {
    id: string;
    default: boolean;
  };
};
