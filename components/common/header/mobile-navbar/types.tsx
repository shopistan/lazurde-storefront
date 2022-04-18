import { BrandSidebarProps } from "lib/types/common";

export interface MenuProps {
  active?: Boolean;
  closeMenu?: Function;
  menuData?: [];
  siteLogo?: any;
  headerId?: string;
  brandSideBar?: BrandSidebarProps;
}

export type LinkProps = {
  title: string;
  url: string;
  isBold: Boolean;
};

export interface DataProps {
  dropdownData: [
    {
      title: string;
      catArr: [LinkProps];
    }
  ];
  categoryLinks: CategoryObject[];
}

export interface CategoryObject {
  linkHeading: string;
  linkTitle: [{ title: string }];
}

export interface LinksProps {
  navTitle?: string;
  titleUrl?: string;
  navArr?: [{ title: string; catArr: [LinkProps] }];
}

export interface SubMenuProps {
  active?: Boolean;
  closeMenu?: Function;
  closeSubMenu?: Function;
  subMenuData?: DataProps;
  menuTitle: string;
}

export type optionProps = {
  label: string;
  img: string;
  value: string;
  langTitle: string;
};

export interface SelectProps {
  options: optionProps[];
  onChange: Function;
  defaultValue: string;
  iconWidth?: string | number;
}
