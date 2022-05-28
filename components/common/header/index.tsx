import React, { useState, useContext } from "react";
import useWindowSize from "lib/utils/useWindowSize";
import { HeaderProps, BrandSidebarProps } from "lib/types/common";
import styles from "./Header.module.css";
import PromoBar from "./promo-bar";
import UserNavBar from "./user-navbar";
import LangSelector from "./navbar-lang-selector/index";
import SiteNavBar from "./site-navbar";
import MobileNavBar from "./mobile-navbar";
import SearchDialog from "../search-dialog";
import { desktopScreenSize } from "lib/utils/common";
import { AppContext } from "lib/context";

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
  const [openSearchDailog, setOpenSearchDialog] = useState(false);
  const { appState } = useContext(AppContext);

  return (
    <div className={styles["header-container"]}>
      <PromoBar
        title={promoTitle || "Save up to 50%"}
        linkText={promoLinkText || "Shop All Our Markdowns"}
        mobileLinkText={mobilePromoLinkText || "Shop All"}
        link={promoLink || "/"}
        bgColor={promoBackground}
      />
      <SearchDialog
        siteLogo={siteLogo}
        siteLogoUrl={siteLogoUrl}
        setOpenSearchDialog={setOpenSearchDialog}
        openSearchDialog={openSearchDailog}
      />
      {width <= desktopScreenSize ? (
        <MobileNavBar
          menuData={siteNavBar}
          headerId={headerId}
          brandSideBar={brandSidebarProps}
          siteLogo={siteLogo}
          siteLogoUrl={siteLogoUrl}
          setOpenSearchDialog={setOpenSearchDialog}
        />
      ) : (
        <UserNavBar brandSideBar={brandSidebarProps} />
      )}
      <LangSelector />
      {width <= desktopScreenSize ? null : (
        <SiteNavBar
          siteNavBar={siteNavBar}
          siteLogo={siteLogo}
          siteLogoUrl={siteLogoUrl}
          headerId={headerId}
          setOpenSearchDialog={setOpenSearchDialog}
        />
      )}
    </div>
  );
};

export default Header;
