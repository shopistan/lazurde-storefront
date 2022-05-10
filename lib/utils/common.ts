import {
  NEXT_PUBLIC_CHANNEL_EG,
  NEXT_PUBLIC_CHANNEL_SA,
  NEXT_PUBLIC_CHANNEL_UAE,
} from "general-config";
import {
  BrandType,
  ChannelType,
  LangType,
  LocaleType,
  RegionType,
} from "lib/types/common";

export const getAppStateFromLocalStorage = () => {
  const appState =
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("app-state"));
  return appState;
};

export const saveAppStateToLocalStorage = (
  lang: LangType,
  region: RegionType,
  channel: ChannelType,
  locale: LocaleType,
  brand: BrandType
) => {
  window.localStorage.setItem(
    "app-state",
    JSON.stringify({ lang, region, channel, locale, brand })
  );
};

export const getChannelFromLocale = (locale: LocaleType) => {
  const processedLocale = locale.toLowerCase().trim();
  if (processedLocale.includes("sa") || processedLocale.includes("en"))
    return NEXT_PUBLIC_CHANNEL_SA;
  else if (processedLocale.includes("ae")) return NEXT_PUBLIC_CHANNEL_UAE;
  else if (processedLocale.includes("eg")) return NEXT_PUBLIC_CHANNEL_EG;
  else return 0;
};

export const updateBrand = (
  brandVal: string,
  saveAppState: any,
  appState: object
) => {
  saveAppState({
    ...appState,
    brand: brandVal ? brandVal : `L'azurde`,
  });
};
