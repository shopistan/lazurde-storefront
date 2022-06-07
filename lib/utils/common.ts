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

export const desktopScreenSize = 1023;
export const mobileScreenSize = 767;

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
    brand: brandVal ? brandVal : "L'azurde",
  });
};

const dateOptions: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export const formateDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", dateOptions);

export const reviewStarAvg = (arr: any) => {
  const sum = arr?.reduce((acc: never, cur: never) => acc + cur);
  const average = sum / arr.length;
  return average;
};

export const slashFormatDate = (date: any) => {
  const _date = new Date(date);
  const year = _date?.getFullYear();
  let month: any = _date?.getMonth() + 1;
  let day: any = _date?.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${month}/${day}`;
};

export const ordeFormatDate = (date: any) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const _date = new Date(date);
  const month = monthNames[_date.getMonth()];
  const year = _date.getFullYear();
  var day = _date.getDay();
  var _day = days[_date.getDay()];
  var dayString = "";

  if (day == 1) {
    dayString = `${day}st`;
  } else if (day == 2) {
    dayString = `${day}nd`;
  } else if (day == 3) {
    dayString = `${day}rd`;
  } else {
    dayString = `${day}th`;
  }

  return `${_day} ${month} ${dayString} ${year}`;
};

export const checkMediaType = (media: string) => {
  // const mediaSrc = media.url;
  if(!media) return null
  const types = new Map([
    ["jpg", "img"],
    ["png", "img"],
    ["webp", "img"],
    ["gif", "img"],
    ["mp4", "video"],
    ["3gp", "video"],
  ]);
  const url = new URL(media || "/", 'https://cdn.lazurde.com/');
  const extension = url.pathname.split(".")[1];
  // const element = document.createElement(types.get(extension))
  return types.get(extension);
};
