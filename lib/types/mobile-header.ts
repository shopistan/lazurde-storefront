import { BrandSidebarProps, ImageType } from "lib/types/common";
export interface MobileHeaderProps {
  menuData?:
    | [
        {
          navTitle?: string;
          titleUrl?: string;
          navArr?: [{ title?: string; catArr?: [LinkPropsType] }];
        }
      ]
    | [];
  siteLogo?: ImageType;
  siteLogoUrl?: string;
  headerId?: string;
  brandSideBar?: BrandSidebarProps;
}
export interface MenuProps {
  active?: Boolean;
  closeMenu?: Function;
  menuData?:
    | [
        {
          navTitle?: string;
          titleUrl?: string;
          navArr?: [{ title?: string; catArr?: [LinkPropsType] }];
        }
      ]
    | [];
  siteLogo?: any;
  headerId?: string;
  brandSideBar?: BrandSidebarProps;
}

export type LinkPropsType = {
  title?: string;
  url?: string;
  isBold?: Boolean;
};

export interface CategoryObject {
  linkHeading?: string;
  linkTitle?: [{ title: string }];
}

export interface LinksProps {
  navTitle?: string;
  titleUrl?: string;
  navArr?: [{ title?: string; catArr?: [LinkPropsType] }];
}

export interface DropdownDataProps {
  dropdownData?: [
    {
      title?: string;
      catArr?: [LinkPropsType];
    }
  ];
  categoryLinks?: [];
}

export interface SubMenuProps {
  active?: Boolean;
  closeMenu?: Function;
  closeSubMenu?: Function;
  subMenuData?: DropdownDataProps;
  menuTitle?: string;
}

export type OptionProps = {
  label?: string;
  img?: string;
  value?: string;
  langTitle?: string;
};

export interface SelectProps {
  options?: OptionProps[];
  onChange?: Function;
  defaultValue?: string;
  iconWidth?: string | number;
}
