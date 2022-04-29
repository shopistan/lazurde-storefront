import React from "react";
import useWindowSize from "lib/utils/useWindowSize";
import { HeaderProps, BrandSidebarProps } from "lib/types/common";
import styles from "./Header.module.css";
import PromoBar from "./promo-bar";
import UserNavBar from "./user-navbar";
import LangSelector from "./navbar-lang-selector/index";
import SiteNavBar from "./site-navbar";
import MobileNavBar from "./mobile-navbar";

type AllHeaderProps = HeaderProps & {
  brandSidebarProps: BrandSidebarProps;
};

const Header = ({
  headerId,
  siteNavBar,
  siteLogo,
  siteLogoUrl,
  promoTitle,
  promoLinkText,
  promoLink,
  promoBackground,
  mobilePromoLinkText,
  brandSidebarProps,
}: AllHeaderProps): JSX.Element => {
  const [width] = useWindowSize();
  return (
    <div className={styles["header-container"]}>
      <PromoBar
        title={promoTitle || "Save up to 50%"}
        linkText={promoLinkText || "Shop All Our Markdowns"}
        mobileLinkText={mobilePromoLinkText || "Shop All"}
        link={promoLink || "/"}
        bgColor={promoBackground}
      />
      {width < 1024 ? (
        <MobileNavBar
          menuData={siteNavBar}
          headerId={headerId}
          brandSideBar={brandSidebarProps}
          siteLogo={siteLogo}
          siteLogoUrl={siteLogoUrl}
        />
      ) : (
        <UserNavBar brandSideBar={brandSidebarProps} />
      )}
      <LangSelector />
      {width < 1024 ? null : (
        <SiteNavBar
          siteNavBar={siteNavBar}
          siteLogo={siteLogo}
          siteLogoUrl={siteLogoUrl}
          headerId={headerId}
        />
      )}
    </div>
  );
};

export default Header;
